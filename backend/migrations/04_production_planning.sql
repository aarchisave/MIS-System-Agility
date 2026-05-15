-- Migration: Create production_planning table
CREATE TABLE IF NOT EXISTS production_planning (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    order_qty_kg NUMERIC NOT NULL,
    assigned_machine VARCHAR(255) NOT NULL,
    hours_required NUMERIC NOT NULL,
    total_shifts NUMERIC NOT NULL,
    days_scheduled INT NOT NULL,
    manpower_mandays NUMERIC NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
