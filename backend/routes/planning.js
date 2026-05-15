import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Capacity Mapping from Spreadsheet
const CAPACITIES = {
  'Kodubale': { machine: 'Continuous Fryer', cap: 90, crew: 4 },
  'Millet Murukku': { machine: 'Continuous Fryer', cap: 160, crew: 5 },
  'Butter Murukku': { machine: 'Continuous Fryer', cap: 160, crew: 5 },
  'Sev': { machine: 'Continuous Fryer', cap: 160, crew: 5 },
  'Ribbon Pakoda': { machine: 'Continuous Fryer', cap: 160, crew: 5 },
  'Chips': { machine: 'Continuous Fryer', cap: 160, crew: 5 },
  'Bhujia': { machine: 'Continuous Fryer', cap: 160, crew: 5 },
  'Peanuts Coated': { machine: 'Batch Fryer', cap: 80, crew: 3 },
  'Peanuts Masala': { machine: 'Batch Fryer', cap: 80, crew: 3 },
  'Boondi': { machine: 'Batch Fryer', cap: 70, crew: 3 },
  'Millet Nipattu': { machine: 'R&D Fryer', cap: 20, crew: 2 },
  'Madras Mixture': { machine: 'Seasoning Drum', cap: 150, crew: 4 },
  'Murmura Mixture': { machine: 'Seasoning Drum', cap: 150, crew: 4 },
  'Bombay Mixture': { machine: 'Seasoning Drum', cap: 150, crew: 4 }
};

/**
 * POST /api/planning/upload-ocr
 * Uses AI to parse PO documents and return structured order data
 */
router.post('/upload-ocr', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  if (!process.env.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY === 'undefined') {
    return res.status(500).json({ status: 'error', message: 'GOOGLE_API_KEY is missing on the server. Please add it to Render environment variables.' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
      Analyze this Purchase Order document. 
      Extract the Product Name and the Quantity in KG.
      
      RULES:
      1. Product Name MUST exactly match one of these: ${Object.keys(CAPACITIES).join(', ')}.
      2. If a product is similar (e.g., 'Spicy Boondi' -> 'Boondi'), use the closest match from our list.
      3. Quantity MUST be a number in kilograms. If the PO says 'Grams', convert to KG.
      
      RETURN ONLY JSON format like this:
      {"product_name": "Kodubale", "order_qty_kg": 500}
    `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: req.file.buffer.toString("base64"),
          mimeType: req.file.mimetype
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();
    console.log('AI Response:', text);

    const jsonMatch = text.match(/\{.*\}/s);
    if (!jsonMatch) throw new Error('No JSON found in AI response');
    
    const data = JSON.parse(jsonMatch[0]);
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('OCR Error Details:', error);
    res.status(500).json({ status: 'error', message: `AI Processing failed: ${error.message}` });
  }
});

/**
 * POST /api/planning/predict
 * Calculates resource requirements for a given order
 */
router.post('/predict', async (req, res) => {
  const { product_name, order_qty_kg, shifts_per_day = 1 } = req.body;

  const product = CAPACITIES[product_name];
  if (!product) {
    return res.status(400).json({ status: 'error', message: 'Product configuration not found' });
  }

  // Calculations
  const hoursRequired = (order_qty_kg / product.cap).toFixed(2);
  const totalShifts = (hoursRequired / 8).toFixed(2);
  const daysScheduled = Math.ceil(totalShifts / shifts_per_day);
  const manpowerMandays = (totalShifts * product.crew).toFixed(1);

  try {
    const query = `
      INSERT INTO production_planning 
      (product_name, order_qty_kg, assigned_machine, hours_required, total_shifts, days_scheduled, manpower_mandays)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [
      product_name, 
      order_qty_kg, 
      product.machine, 
      hoursRequired, 
      totalShifts, 
      daysScheduled, 
      manpowerMandays
    ];

    const result = await pool.query(query, values);
    res.json({ 
      status: 'success', 
      data: result.rows[0],
      meta: {
        machine_capacity: `${product.cap} kg/hr`,
        crew_size: product.crew
      }
    });
  } catch (error) {
    console.error('Planning Prediction Error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

/**
 * GET /api/planning/history
 * Returns previous calculations
 */
router.get('/history', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM production_planning ORDER BY created_at DESC LIMIT 10');
    res.json({ status: 'success', data: rows });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
