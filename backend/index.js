import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;
import planningRoutes from './routes/planning.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// PostgreSQL Connection Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Supabase in many environments
  }
});

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'success', message: 'Agility MIS API (PostgreSQL) is running' });
});

/**
 * GET /api/inventory
 * Returns all raw materials and stock levels
 */
app.get('/api/inventory', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM raw_materials ORDER BY name ASC');
    res.json({ status: 'success', data: rows });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

/**
 * GET /api/clients
 * Returns a list of unique clients
 */
app.get('/api/clients', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT DISTINCT client_name FROM production_batches WHERE client_name IS NOT NULL');
    res.json({ status: 'success', data: rows.map(r => r.client_name) });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

/**
 * GET /api/production/analytics
 * Aggregates yield stats and overfilled packages (Supports ?client=...)
 */
app.get('/api/production/analytics', async (req, res) => {
  const { client } = req.query;
  try {
    let query = `
      SELECT 
        COUNT(DISTINCT pb.id) as total_batches,
        AVG(pl.weight_g) as avg_package_weight,
        COUNT(pl.id) FILTER (WHERE pl.weight_g > 100.8) as overfilled_count,
        pb.fryer_type,
        pb.client_name,
        AVG(pb.temperature_c) as avg_temp
      FROM production_batches pb
      LEFT JOIN packaging_logs pl ON pb.id = pl.production_batch_id
    `;
    
    const values = [];
    if (client) {
      query += ` WHERE pb.client_name = $1 `;
      values.push(client);
    }
    
    query += ` GROUP BY pb.fryer_type, pb.client_name `;
    
    const { rows } = await pool.query(query, values);
    res.json({ status: 'success', data: rows });
  } catch (error) {
    console.error('Analytics Error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

/**
 * GET /api/production/alerts
 * Returns active system alerts and contamination risks
 */
app.get('/api/production/alerts', async (req, res) => {
  try {
    const alertsPromise = pool.query('SELECT * FROM system_alerts WHERE is_resolved = FALSE ORDER BY created_at DESC');
    const risksPromise = pool.query('SELECT * FROM contamination_risks');
    
    const [alertsRes, risksRes] = await Promise.all([alertsPromise, risksPromise]);
    
    res.json({ 
      status: 'success', 
      data: {
        system_alerts: alertsRes.rows,
        contamination_risks: risksRes.rows
      }
    });
  } catch (error) {
    console.error('Alerts Error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

/**
 * POST /api/batches/new
 * Creates a new production batch record
 */
app.post('/api/batches/new', async (req, res) => {
  const { batch_number, premix_batch_id, fryer_type, temperature_c, oil_ppm } = req.body;
  
  if (!batch_number || !fryer_type) {
    return res.status(400).json({ status: 'error', message: 'Missing required fields' });
  }

  try {
    const query = `
      INSERT INTO production_batches (batch_number, premix_batch_id, fryer_type, temperature_c, oil_ppm)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [batch_number, premix_batch_id, fryer_type, temperature_c, oil_ppm];
    
    const { rows } = await pool.query(query, values);
    res.status(201).json({ status: 'success', data: rows[0] });
  } catch (error) {
    console.error('Batch Creation Error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.use('/api/planning', planningRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Connected to Supabase PostgreSQL Pool');
});
