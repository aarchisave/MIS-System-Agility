import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'agility_mis',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Basic route
app.get('/api/health', (req, res) => {
  res.json({ status: 'success', message: 'Agility MIS API is running' });
});

// Mock endpoint for dashboard stats
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    // In a real app, this would query the DB. We're mocking it for now.
    const stats = {
      revenue: '$1.2M',
      production: '45,200 kg',
      orders: 124,
      dispatchPending: 18
    };
    res.json({ status: 'success', data: stats });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Mock endpoint for inventory
app.get('/api/inventory', async (req, res) => {
  try {
    // In a real app, this would be: const [rows] = await pool.query('SELECT * FROM inventory');
    const inventory = [
      { id: 'RM-001', name: 'Premium Wheat Flour', stock: '2,500 kg', min: '1,000 kg', supplier: 'AgriCorp Inc', expiry: '2026-12-01', status: 'Healthy', location: 'Warehouse A' },
      { id: 'RM-002', name: 'Citric Acid', stock: '45 kg', min: '50 kg', supplier: 'ChemSupply', expiry: '2027-05-15', status: 'Low Stock', location: 'Warehouse B' }
    ];
    res.json({ status: 'success', data: inventory });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Database connected to ${process.env.DB_HOST || 'localhost'}`);
});
