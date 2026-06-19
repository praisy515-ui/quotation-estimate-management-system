import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'qaems.db');

export async function getDbConnection() {
  return open({
    filename: dbPath,
    driver: sqlite3.Database
  });
}

export async function initDb() {
  const db = await getDbConnection();

  // Create tables
  await db.exec(`
    CREATE TABLE IF NOT EXISTS customers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      address TEXT,
      projectType TEXT,
      budget TEXT,
      status TEXT
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id TEXT PRIMARY KEY,
      customerName TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      projectType TEXT,
      roomType TEXT,
      status TEXT,
      date TEXT
    );

    CREATE TABLE IF NOT EXISTS site_visits (
      id TEXT PRIMARY KEY,
      customerName TEXT NOT NULL,
      address TEXT,
      scheduledDate TEXT,
      scheduledTime TEXT,
      assignedDesigner TEXT,
      status TEXT
    );

    CREATE TABLE IF NOT EXISTS quotations (
      id TEXT PRIMARY KEY,
      customerName TEXT NOT NULL,
      projectType TEXT,
      date TEXT,
      roomsCount INTEGER,
      subtotal REAL,
      tax REAL,
      discount REAL,
      grandTotal REAL,
      status TEXT
    );

    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      customer TEXT,
      type TEXT,
      progress INTEGER,
      startDate TEXT,
      endDate TEXT,
      status TEXT
    );

    CREATE TABLE IF NOT EXISTS materials (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT,
      quality TEXT,
      unitPrice TEXT,
      stockStatus TEXT
    );

    CREATE TABLE IF NOT EXISTS vendors (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      contactPerson TEXT,
      phone TEXT,
      category TEXT,
      rating REAL,
      status TEXT
    );

    CREATE TABLE IF NOT EXISTS payments (
      id TEXT PRIMARY KEY,
      customerName TEXT NOT NULL,
      amount TEXT,
      date TEXT,
      status TEXT,
      method TEXT
    );

    CREATE TABLE IF NOT EXISTS approvals (
      id TEXT PRIMARY KEY,
      customerName TEXT NOT NULL,
      designName TEXT,
      submittedDate TEXT,
      status TEXT,
      comments TEXT
    );

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      role TEXT,
      status TEXT
    );
  `);

  // Seed data if empty
  const customerCount = await db.get('SELECT COUNT(*) as count FROM customers');
  if (customerCount.count === 0) {
    // Customers
    await db.run("INSERT INTO customers VALUES ('CUST-001', 'Sophia Loren', 'sophia.loren@example.com', '+1 (555) 019-2834', '742 Evergreen Terrace, Springfield', 'Residential', '$45,000', 'Active')");
    await db.run("INSERT INTO customers VALUES ('CUST-002', 'Marcus Aurelius', 'marcus@philosophy.org', '+1 (555) 021-9876', '12 Imperial Way, Rome', 'Commercial', '$120,000', 'Active')");
    await db.run("INSERT INTO customers VALUES ('CUST-003', 'Serena Williams', 'serena@tennisqueen.com', '+1 (555) 045-6712', '98 Court Side Dr, Palm Beach', 'Residential', '$85,000', 'Pending Approval')");
    await db.run("INSERT INTO customers VALUES ('CUST-004', 'Elon Musk', 'elon@spacex.com', '+1 (555) 420-6969', '1 Rocket Rd, Hawthorne', 'Commercial', '$250,000', 'Active')");
    await db.run("INSERT INTO customers VALUES ('CUST-005', 'Emma Watson', 'emma@books.co.uk', '+1 (555) 077-3312', '42 Library Lane, Oxford', 'Residential', '$35,000', 'Completed')");

    // Enquiries
    await db.run("INSERT INTO enquiries VALUES ('ENQ-201', 'Alexander Hamilton', 'alex@treasury.gov', '+1 (555) 177-1789', 'Residential', 'Home Office & Library', 'New', '2026-06-10')");
    await db.run("INSERT INTO enquiries VALUES ('ENQ-202', 'Clara Oswald', 'clara.oswald@tardis.net', '+1 (555) 909-1111', 'Residential', 'Living Room', 'Contacted', '2026-06-08')");
    await db.run("INSERT INTO enquiries VALUES ('ENQ-203', 'Bruce Wayne', 'bruce@wayneent.com', '+1 (555) 911-0007', 'Commercial', 'Executive Office Suite', 'Proposal Sent', '2026-06-05')");
    
    // Site Visits
    await db.run("INSERT INTO site_visits VALUES ('SV-301', 'Sophia Loren', '742 Evergreen Terrace', '2026-06-15', '10:00 AM', 'Elena Vance', 'Scheduled')");
    await db.run("INSERT INTO site_visits VALUES ('SV-302', 'Marcus Aurelius', '12 Imperial Way', '2026-06-18', '02:30 PM', 'Marcus Aurelius (Lead)', 'Scheduled')");
    await db.run("INSERT INTO site_visits VALUES ('SV-303', 'Serena Williams', '98 Court Side Dr', '2026-06-09', '11:00 AM', 'Elena Vance', 'Completed')");

    // Quotations
    await db.run("INSERT INTO quotations VALUES ('QT-401', 'Sophia Loren', 'Residential', '2026-06-02', 2, 35000, 6300, 2000, 39300, 'Approved')");
    await db.run("INSERT INTO quotations VALUES ('QT-402', 'Elon Musk', 'Commercial', '2026-06-09', 4, 180000, 32400, 10000, 202400, 'Sent')");

    // Projects
    await db.run("INSERT INTO projects VALUES ('PRJ-501', 'Sophia Loren - Cozy Residence', 'Sophia Loren', 'Residential', 75, '2026-05-01', '2026-07-15', 'In Progress')");
    await db.run("INSERT INTO projects VALUES ('PRJ-502', 'Marcus Aurelius - Office Sanctuary', 'Marcus Aurelius', 'Commercial', 30, '2026-05-20', '2026-09-30', 'In Progress')");
    await db.run("INSERT INTO projects VALUES ('PRJ-503', 'Emma Watson - Reading Corner', 'Emma Watson', 'Residential', 100, '2026-04-10', '2026-05-30', 'Completed')");

    // Materials
    await db.run("INSERT INTO materials VALUES ('MAT-601', 'Calacatta Gold Marble', 'Flooring / Countertops', 'Luxury', '$85 / Sq.ft', 'In Stock')");
    await db.run("INSERT INTO materials VALUES ('MAT-602', 'Walnut Hardwood', 'Flooring', 'Premium', '$28 / Sq.ft', 'In Stock')");
    await db.run("INSERT INTO materials VALUES ('MAT-603', 'Brushed Brass Trims', 'Hardware', 'Premium', '$12 / piece', 'Low Stock')");

    // Vendors
    await db.run("INSERT INTO vendors VALUES ('VND-701', 'Elite Stone & Marble Imports', 'Giuseppe Rossi', '+1 (555) 987-1234', 'Stone & Masonry', 4.9, 'Active')");
    await db.run("INSERT INTO vendors VALUES ('VND-702', 'Noble Lumber Mills', 'Sarah Jenkins', '+1 (555) 234-5678', 'Wood & Millwork', 4.7, 'Active')");

    // Payments
    await db.run("INSERT INTO payments VALUES ('INV-801', 'Sophia Loren', '$15,000', '2026-05-15', 'Paid', 'Wire Transfer')");
    await db.run("INSERT INTO payments VALUES ('INV-802', 'Marcus Aurelius', '$36,000', '2026-06-01', 'Pending', 'Net 30')");

    // Approvals
    await db.run("INSERT INTO approvals VALUES ('APP-901', 'Sophia Loren', 'Living Room Concept Layout', '2026-06-01', 'Approved', 'Beautiful wood finishes selected.')");
    await db.run("INSERT INTO approvals VALUES ('APP-902', 'Marcus Aurelius', 'Executive Office 3D Renderings', '2026-06-08', 'Pending', 'Needs more lighting in the reading corner.')");

    // Users
    await db.run("INSERT INTO users VALUES ('USR-01', 'Glory Simon', 'glory@glorysimoninteriors.com', 'Studio Director', 'Active')");
    await db.run("INSERT INTO users VALUES ('USR-02', 'Elena Vance', 'elena@glorysimoninteriors.com', 'Senior Designer', 'Active')");
    await db.run("INSERT INTO users VALUES ('USR-03', 'Dorian Gray', 'dorian@glorysimoninteriors.com', 'Project Manager', 'Active')");
  }

  console.log('SQLite database initialised and seeded.');
  return db;
}
