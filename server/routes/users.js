import express from 'express';
import bcryptjs from 'bcryptjs';
import { pool } from '../config/database.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Get all users (admin/editor only)
router.get('/', authenticateToken, requireRole(['admin', 'editor']), async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', role = '', status = '' } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT id, name, email, role, status, avatar, last_login, created_at FROM users WHERE 1=1';
    let countQuery = 'SELECT COUNT(*) as total FROM users WHERE 1=1';
    const params = [];
    const countParams = [];

    // Add search filter
    if (search) {
      query += ' AND (name LIKE ? OR email LIKE ?)';
      countQuery += ' AND (name LIKE ? OR email LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
      countParams.push(`%${search}%`, `%${search}%`);
    }

    // Add role filter
    if (role) {
      query += ' AND role = ?';
      countQuery += ' AND role = ?';
      params.push(role);
      countParams.push(role);
    }

    // Add status filter
    if (status) {
      query += ' AND status = ?';
      countQuery += ' AND status = ?';
      params.push(status);
      countParams.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [users] = await pool.execute(query, params);
    const [countResult] = await pool.execute(countQuery, countParams);

    res.json({
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: countResult[0].total,
        pages: Math.ceil(countResult[0].total / limit)
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create user (admin only)
router.post('/', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    const { name, email, password, role = 'user', status = 'active' } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    // Check if user already exists
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, role, status]
    );

    // Get created user
    const [newUser] = await pool.execute(
      'SELECT id, name, email, role, status, created_at FROM users WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      message: 'User created successfully',
      user: newUser[0]
    });

  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, status } = req.body;

    // Check if user can update this user
    if (req.user.role !== 'admin' && req.user.id !== parseInt(id)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    // Non-admin users can only update their own basic info
    if (req.user.role !== 'admin' && (role || status)) {
      return res.status(403).json({ error: 'Cannot update role or status' });
    }

    const updates = [];
    const params = [];

    if (name) {
      updates.push('name = ?');
      params.push(name);
    }

    if (email) {
      updates.push('email = ?');
      params.push(email);
    }

    if (role && req.user.role === 'admin') {
      updates.push('role = ?');
      params.push(role);
    }

    if (status && req.user.role === 'admin') {
      updates.push('status = ?');
      params.push(status);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    params.push(id);

    await pool.execute(
      `UPDATE users SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      params
    );

    // Get updated user
    const [updatedUser] = await pool.execute(
      'SELECT id, name, email, role, status, updated_at FROM users WHERE id = ?',
      [id]
    );

    res.json({
      message: 'User updated successfully',
      user: updatedUser[0]
    });

  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user (admin only)
router.delete('/:id', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent deleting self
    if (req.user.id === parseInt(id)) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;