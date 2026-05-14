-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUMS
CREATE TYPE machine_type AS ENUM ('CONTINUOUS_FRYER', 'BATCH_FRYER');
CREATE TYPE batch_status AS ENUM ('PRE-PRODUCTION', 'PRODUCING', 'PRODUCED-UNPACKED', 'PACKED', 'SHIPPED');
CREATE TYPE alert_type AS ENUM ('LOW_STOCK', 'QUALITY_ISSUE', 'DELAY');

-- 2. TABLES
-- Raw Materials
CREATE TABLE raw_materials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    stock_kg DECIMAL(10, 2) NOT NULL DEFAULT 0,
    min_stock_level_kg DECIMAL(10, 2) NOT NULL DEFAULT 100,
    supplier VARCHAR(255),
    expiry_date DATE,
    location VARCHAR(100),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Premix Batches
CREATE TABLE premix_batches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_number VARCHAR(50) UNIQUE NOT NULL,
    raw_material_id UUID REFERENCES raw_materials(id),
    weight_kg DECIMAL(10, 2) NOT NULL,
    mixed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Production Batches
CREATE TABLE production_batches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_number VARCHAR(50) UNIQUE NOT NULL,
    premix_batch_id UUID REFERENCES premix_batches(id),
    fryer_type machine_type NOT NULL,
    temperature_c DECIMAL(5, 2),
    oil_ppm DECIMAL(10, 2),
    status batch_status DEFAULT 'PRE-PRODUCTION',
    produced_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Packaging Logs
CREATE TABLE packaging_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    production_batch_id UUID REFERENCES production_batches(id),
    weight_g DECIMAL(5, 2) NOT NULL,
    packed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- Constraint for 100-101g weight margin
    CONSTRAINT weight_check CHECK (weight_g >= 100.0 AND weight_g <= 101.0)
);

-- Alerts Table
CREATE TABLE system_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type alert_type NOT NULL,
    message TEXT NOT NULL,
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. TRIGGER FUNCTION FOR LOW STOCK
CREATE OR REPLACE FUNCTION notify_low_stock()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.stock_kg < NEW.min_stock_level_kg THEN
        INSERT INTO system_alerts (type, message)
        VALUES ('LOW_STOCK', 'Stock for ' || NEW.name || ' is low: ' || NEW.stock_kg || 'kg (Min: ' || NEW.min_stock_level_kg || 'kg)');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_low_stock_check
AFTER INSERT OR UPDATE ON raw_materials
FOR EACH ROW
EXECUTE FUNCTION notify_low_stock();

-- 4. VIEW FOR CONTAMINATION RISKS
CREATE OR REPLACE VIEW contamination_risks AS
SELECT 
    pb.id,
    pb.batch_number,
    pb.status,
    pb.produced_at,
    (EXTRACT(EPOCH FROM (NOW() - pb.produced_at)) / 3600)::DECIMAL(10, 2) AS hours_unpacked
FROM 
    production_batches pb
WHERE 
    pb.status = 'PRODUCED-UNPACKED'
    AND pb.produced_at < NOW() - INTERVAL '48 hours';
