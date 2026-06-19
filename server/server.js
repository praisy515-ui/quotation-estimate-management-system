import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { initDb, getDbConnection } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Initialize DB on server start
initDb().catch(err => {
  console.error('Failed to initialise database:', err);
});

// Authentication Mock endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  if (email && password) {
    return res.json({ success: true, email, role, token: 'mock-jwt-token-xyz' });
  }
  return res.status(400).json({ success: false, error: 'Email and password required' });
});

// ----------------- CUSTOMERS ROUTES -----------------
app.get('/api/customers', async (req, res) => {
  try {
    const db = await getDbConnection();
    const rows = await db.all('SELECT * FROM customers ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/customers', async (req, res) => {
  const { id, name, email, phone, address, projectType, budget, status } = req.body;
  try {
    const db = await getDbConnection();
    await db.run(
      'INSERT INTO customers VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, name, email, phone, address, projectType, budget, status]
    );
    res.status(201).json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/customers/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, projectType, budget, status } = req.body;
  try {
    const db = await getDbConnection();
    await db.run(
      'UPDATE customers SET name = ?, email = ?, phone = ?, address = ?, projectType = ?, budget = ?, status = ? WHERE id = ?',
      [name, email, phone, address, projectType, budget, status, id]
    );
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/customers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const db = await getDbConnection();
    await db.run('DELETE FROM customers WHERE id = ?', [id]);
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------- ENQUIRIES ROUTES -----------------
app.get('/api/enquiries', async (req, res) => {
  try {
    const db = await getDbConnection();
    const rows = await db.all('SELECT * FROM enquiries ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/enquiries', async (req, res) => {
  const { id, customerName, email, phone, projectType, roomType, status, date } = req.body;
  try {
    const db = await getDbConnection();
    await db.run(
      'INSERT INTO enquiries VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, customerName, email, phone, projectType, roomType, status, date]
    );
    res.status(201).json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------- SITE VISITS ROUTES -----------------
app.get('/api/site-visits', async (req, res) => {
  try {
    const db = await getDbConnection();
    const rows = await db.all('SELECT * FROM site_visits ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/site-visits', async (req, res) => {
  const { id, customerName, address, scheduledDate, scheduledTime, assignedDesigner, status } = req.body;
  try {
    const db = await getDbConnection();
    await db.run(
      'INSERT INTO site_visits VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, customerName, address, scheduledDate, scheduledTime, assignedDesigner, status]
    );
    res.status(201).json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------- QUOTATIONS ROUTES -----------------
app.get('/api/quotations', async (req, res) => {
  try {
    const db = await getDbConnection();
    const rows = await db.all('SELECT * FROM quotations ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/quotations', async (req, res) => {
  const { id, customerName, projectType, date, roomsCount, subtotal, tax, discount, grandTotal, status } = req.body;
  try {
    const db = await getDbConnection();
    await db.run(
      'INSERT INTO quotations VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, customerName, projectType, date, roomsCount, subtotal, tax, discount, grandTotal, status]
    );
    res.status(201).json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------- PROJECTS ROUTES -----------------
app.get('/api/projects', async (req, res) => {
  try {
    const db = await getDbConnection();
    const rows = await db.all('SELECT * FROM projects ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/projects', async (req, res) => {
  const { id, name, customer, type, progress, startDate, endDate, status } = req.body;
  try {
    const db = await getDbConnection();
    await db.run(
      'INSERT INTO projects VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, name, customer, type, progress, startDate, endDate, status]
    );
    res.status(201).json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------- MATERIALS ROUTES -----------------
app.get('/api/materials', async (req, res) => {
  try {
    const db = await getDbConnection();
    const rows = await db.all('SELECT * FROM materials ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/materials', async (req, res) => {
  const { id, name, category, quality, unitPrice, stockStatus } = req.body;
  try {
    const db = await getDbConnection();
    await db.run(
      'INSERT INTO materials VALUES (?, ?, ?, ?, ?, ?)',
      [id, name, category, quality, unitPrice, stockStatus]
    );
    res.status(201).json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------- VENDORS ROUTES -----------------
app.get('/api/vendors', async (req, res) => {
  try {
    const db = await getDbConnection();
    const rows = await db.all('SELECT * FROM vendors ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/vendors', async (req, res) => {
  const { id, name, contactPerson, phone, category, rating, status } = req.body;
  try {
    const db = await getDbConnection();
    await db.run(
      'INSERT INTO vendors VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, name, contactPerson, phone, category, rating, status]
    );
    res.status(201).json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------- PAYMENTS ROUTES -----------------
app.get('/api/payments', async (req, res) => {
  try {
    const db = await getDbConnection();
    const rows = await db.all('SELECT * FROM payments ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/payments', async (req, res) => {
  const { id, customerName, amount, date, status, method } = req.body;
  try {
    const db = await getDbConnection();
    await db.run(
      'INSERT INTO payments VALUES (?, ?, ?, ?, ?, ?)',
      [id, customerName, amount, date, status, method]
    );
    res.status(201).json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------- APPROVALS ROUTES -----------------
app.get('/api/approvals', async (req, res) => {
  try {
    const db = await getDbConnection();
    const rows = await db.all('SELECT * FROM approvals ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/approvals', async (req, res) => {
  const { id, customerName, designName, submittedDate, status, comments } = req.body;
  try {
    const db = await getDbConnection();
    await db.run(
      'INSERT INTO approvals VALUES (?, ?, ?, ?, ?, ?)',
      [id, customerName, designName, submittedDate, status, comments]
    );
    res.status(201).json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/approvals/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const db = await getDbConnection();
    await db.run('UPDATE approvals SET status = ? WHERE id = ?', [status, id]);
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------- USERS ROUTES -----------------
app.get('/api/users', async (req, res) => {
  try {
    const db = await getDbConnection();
    const rows = await db.all('SELECT * FROM users ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  const { id, name, email, role, status } = req.body;
  try {
    const db = await getDbConnection();
    await db.run(
      'INSERT INTO users VALUES (?, ?, ?, ?, ?)',
      [id, name, email, role, status]
    );
    res.status(201).json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const db = await getDbConnection();
    await db.run('UPDATE users SET role = ? WHERE id = ?', [role, id]);
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
