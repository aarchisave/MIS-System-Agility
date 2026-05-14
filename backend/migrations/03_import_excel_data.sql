-- 1. CLEANUP (Optional: Remove dummy data to avoid confusion)
TRUNCATE packaging_logs, production_batches, premix_batches, raw_materials, system_alerts RESTART IDENTITY CASCADE;

-- 2. IMPORT INVENTORY (Products & Raw Materials from Spreadsheet)
INSERT INTO raw_materials (name, stock_kg, min_stock_level_kg, supplier, location)
VALUES 
('Khara Boondi', 450.00, 4093.00, 'Haldiram PO Plan', 'Warehouse A'), -- Low Stock Alert
('Onion Kodubale', 200.00, 3496.00, 'Haldiram PO Plan', 'Warehouse A'), -- Low Stock Alert
('Butter Murukku', 150.00, 2539.00, 'Haldiram PO Plan', 'Warehouse B'), -- Low Stock Alert
('Masala Khara Boondi', 0.00, 500.00, 'Swiggy PO Plan', 'Warehouse B'), -- Critical Alert
('Homestyle Madras Mixture', 0.00, 500.00, 'Swiggy PO Plan', 'Warehouse B'); -- Critical Alert

-- 3. IMPORT PLANNED PRODUCTION BATCHES (Haldiram April-May 2026)
-- We'll create initial batches for the planned quantities
INSERT INTO premix_batches (batch_number, weight_kg) VALUES ('PREMIX-HB-APRIL', 1000.00);
INSERT INTO premix_batches (batch_number, weight_kg) VALUES ('PREMIX-OK-APRIL', 1000.00);

-- Continuous Fryer Batches (Planned)
INSERT INTO production_batches (batch_number, premix_batch_id, fryer_type, temperature_c, oil_ppm, status)
SELECT 
    'PLANNED-HB-' || gen_id, 
    (SELECT id FROM premix_batches WHERE batch_number = 'PREMIX-HB-APRIL'),
    'BATCH_FRYER', 
    180.0, 
    15.0, 
    'PRE-PRODUCTION'
FROM generate_series(1, 5) AS gen_id;

INSERT INTO production_batches (batch_number, premix_batch_id, fryer_type, temperature_c, oil_ppm, status)
SELECT 
    'PLANNED-OK-' || gen_id, 
    (SELECT id FROM premix_batches WHERE batch_number = 'PREMIX-OK-APRIL'),
    'CONTINUOUS_FRYER', 
    185.0, 
    12.0, 
    'PRE-PRODUCTION'
FROM generate_series(1, 5) AS gen_id;

-- 4. LOG PACKING PROGRESS (Based on SKC PO April 24-26 peaks)
-- We'll mark some batches as completed to show historical data
UPDATE production_batches SET status = 'PACKED' WHERE batch_number LIKE 'PLANNED-HB-1';
UPDATE production_batches SET status = 'PACKED' WHERE batch_number LIKE 'PLANNED-OK-1';

INSERT INTO packaging_logs (production_batch_id, weight_g)
SELECT id, 100.5 FROM production_batches WHERE status = 'PACKED';
