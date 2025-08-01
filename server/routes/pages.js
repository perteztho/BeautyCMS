import express from 'express';
import { pool } from '../config/database.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Get all pages
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = '' } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT p.*, u.name as author_name 
      FROM pages p 
      LEFT JOIN users u ON p.author_id = u.id 
      WHERE 1=1
    `;
    let countQuery = 'SELECT COUNT(*) as total FROM pages WHERE 1=1';
    const params = [];
    const countParams = [];

    // Add search filter
    if (search) {
      query += ' AND (p.title LIKE ? OR p.content LIKE ?)';
      countQuery += ' AND (title LIKE ? OR content LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
      countParams.push(`%${search}%`, `%${search}%`);
    }

    // Add status filter
    if (status) {
      query += ' AND p.status = ?';
      countQuery += ' AND status = ?';
      params.push(status);
      countParams.push(status);
    }

    query += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [pages] = await pool.execute(query, params);
    const [countResult] = await pool.execute(countQuery, countParams);

    res.json({
      pages,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: countResult[0].total,
        pages: Math.ceil(countResult[0].total / limit)
      }
    });

  } catch (error) {
    console.error('Get pages error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create page
router.post('/', authenticateToken, requireRole(['admin', 'editor']), async (req, res) => {
  try {
    const { title, slug, content, meta_description, meta_keywords, status = 'draft', featured_image } = req.body;

    if (!title || !slug) {
      return res.status(400).json({ error: 'Title and slug are required' });
    }

    // Check if slug already exists
    const [existingPages] = await pool.execute('SELECT id FROM pages WHERE slug = ?', [slug]);
    if (existingPages.length > 0) {
      return res.status(400).json({ error: 'Slug already exists' });
    }

    const [result] = await pool.execute(
      `INSERT INTO pages (title, slug, content, meta_description, meta_keywords, status, author_id, featured_image) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, slug, content, meta_description, meta_keywords, status, req.user.id, featured_image]
    );

    const [newPage] = await pool.execute(
      'SELECT p.*, u.name as author_name FROM pages p LEFT JOIN users u ON p.author_id = u.id WHERE p.id = ?',
      [result.insertId]
    );

    res.status(201).json({
      message: 'Page created successfully',
      page: newPage[0]
    });

  } catch (error) {
    console.error('Create page error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update page
router.put('/:id', authenticateToken, requireRole(['admin', 'editor']), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, content, meta_description, meta_keywords, status, featured_image } = req.body;

    const updates = [];
    const params = [];

    if (title) {
      updates.push('title = ?');
      params.push(title);
    }

    if (slug) {
      // Check if slug already exists (excluding current page)
      const [existingPages] = await pool.execute('SELECT id FROM pages WHERE slug = ? AND id != ?', [slug, id]);
      if (existingPages.length > 0) {
        return res.status(400).json({ error: 'Slug already exists' });
      }
      updates.push('slug = ?');
      params.push(slug);
    }

    if (content !== undefined) {
      updates.push('content = ?');
      params.push(content);
    }

    if (meta_description !== undefined) {
      updates.push('meta_description = ?');
      params.push(meta_description);
    }

    if (meta_keywords !== undefined) {
      updates.push('meta_keywords = ?');
      params.push(meta_keywords);
    }

    if (status) {
      updates.push('status = ?');
      params.push(status);
    }

    if (featured_image !== undefined) {
      updates.push('featured_image = ?');
      params.push(featured_image);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    params.push(id);

    await pool.execute(
      `UPDATE pages SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      params
    );

    const [updatedPage] = await pool.execute(
      'SELECT p.*, u.name as author_name FROM pages p LEFT JOIN users u ON p.author_id = u.id WHERE p.id = ?',
      [id]
    );

    res.json({
      message: 'Page updated successfully',
      page: updatedPage[0]
    });

  } catch (error) {
    console.error('Update page error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete page
router.delete('/:id', authenticateToken, requireRole(['admin', 'editor']), async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute('DELETE FROM pages WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Page not found' });
    }

    res.json({ message: 'Page deleted successfully' });

  } catch (error) {
    console.error('Delete page error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;