-- Seed Raw Materials
INSERT INTO raw_materials (name, stock_kg, min_stock_level_kg, supplier, expiry_date, location)
VALUES 
('Premium Wheat Flour', 500.00, 1000.00, 'AgriCorp Inc', '2026-12-01', 'Warehouse A'), -- Should trigger alert
('Salt (Iodized)', 50.00, 20.00, 'Saline Ltd', '2027-01-01', 'Warehouse B'),
('Palm Oil', 2000.00, 500.00, 'OilWorks', '2026-06-15', 'Tank 1');

-- Seed a Premix Batch
INSERT INTO premix_batches (batch_number, raw_material_id, weight_kg)
SELECT 'PREMIX-20260514-01', id, 250.00 FROM raw_materials WHERE name = 'Premium Wheat Flour' LIMIT 1;

-- Seed Production Batches
INSERT INTO production_batches (batch_number, premix_batch_id, fryer_type, temperature_c, oil_ppm, status, produced_at)
SELECT 
    'BATCH-CONT-01', 
    id, 
    'CONTINUOUS_FRYER', 
    185.5, 
    12.4, 
    'PRODUCED-UNPACKED',
    NOW() - INTERVAL '50 hours' -- Should appear in contamination_risks view
FROM premix_batches LIMIT 1;

INSERT INTO production_batches (batch_number, premix_batch_id, fryer_type, temperature_c, oil_ppm, status, produced_at)
SELECT 
    'BATCH-BATCH-02', 
    id, 
    'BATCH_FRYER', 
    178.0, 
    15.2, 
    'PRODUCING',
    NOW()
FROM premix_batches LIMIT 1;

-- Seed Packaging Logs (Successful)
INSERT INTO packaging_logs (production_batch_id, weight_g)
SELECT id, 100.5 FROM production_batches WHERE batch_number = 'BATCH-CONT-01' LIMIT 1;
