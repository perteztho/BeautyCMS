import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'admin_cms',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

// Initialize database tables
const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    
    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'editor', 'user') DEFAULT 'user',
        status ENUM('active', 'inactive', 'pending') DEFAULT 'active',
        avatar VARCHAR(255),
        last_login TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create pages table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS pages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content LONGTEXT,
        meta_description TEXT,
        meta_keywords TEXT,
        status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
        author_id INT,
        featured_image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `);

    // Create plugins table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS plugins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        version VARCHAR(50) NOT NULL,
        description TEXT,
        author VARCHAR(255),
        category VARCHAR(100),
        is_active BOOLEAN DEFAULT FALSE,
        settings JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create media table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS media (
        id INT AUTO_INCREMENT PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        original_name VARCHAR(255) NOT NULL,
        mime_type VARCHAR(100) NOT NULL,
        file_size INT NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        alt_text VARCHAR(255),
        uploaded_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
      )
    `);

    // Create notifications table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
        category VARCHAR(100),
        priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
        user_id INT,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Create analytics table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS analytics (
        id INT AUTO_INCREMENT PRIMARY KEY,
        page_id INT,
        visits INT DEFAULT 0,
        unique_visitors INT DEFAULT 0,
        bounce_rate DECIMAL(5,2) DEFAULT 0,
        avg_session_duration INT DEFAULT 0,
        date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE,
        UNIQUE KEY unique_page_date (page_id, date)
      )
    `);

    // Create settings table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(255) UNIQUE NOT NULL,
        setting_value LONGTEXT,
        setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
        category VARCHAR(100) DEFAULT 'general',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Insert default admin user if not exists
    const [existingUsers] = await connection.execute('SELECT COUNT(*) as count FROM users WHERE role = "admin"');
    if (existingUsers[0].count === 0) {
      const hashedPassword = await bcryptjs.hash('admin123', 10);
      
      await connection.execute(`
        INSERT INTO users (name, email, password, role, status) 
        VALUES (?, ?, ?, ?, ?)
      `, ['Admin User', 'admin@cms.com', hashedPassword, 'admin', 'active']);
      
      console.log('✅ Default admin user created (email: admin@cms.com, password: admin123)');
    }

    // Insert default settings
    const defaultSettings = [
      ['site_title', 'AdminCMS', 'string', 'general'],
      ['site_description', 'A powerful content management system', 'string', 'general'],
      ['admin_email', 'admin@cms.com', 'string', 'general'],
      ['timezone', 'UTC', 'string', 'general'],
      ['maintenance_mode', 'false', 'boolean', 'general'],
      ['theme', 'default', 'string', 'appearance'],
      ['primary_color', '#3B82F6', 'string', 'appearance'],
      ['language', 'en', 'string', 'localization']
    ];

    for (const [key, value, type, category] of defaultSettings) {
      await connection.execute(`
        INSERT IGNORE INTO settings (setting_key, setting_value, setting_type, category) 
        VALUES (?, ?, ?, ?)
      `, [key, value, type, category]);
    }

    connection.release();
    console.log('✅ Database tables initialized successfully');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    throw error;
  }
};

export {
  pool,
  testConnection,
  initializeDatabase
};