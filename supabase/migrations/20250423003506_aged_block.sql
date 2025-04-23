/*
  # Add serving information to recipes table
  
  1. Changes
    - Add new columns to recipes table for serving information
    - Add new columns for allergen information
    
  2. Notes
    - All new fields are nullable to maintain compatibility with existing data
*/

ALTER TABLE recipes ADD COLUMN monthly_production INTEGER;
ALTER TABLE recipes ADD COLUMN preparation_type TEXT;
ALTER TABLE recipes ADD COLUMN servings INTEGER;
ALTER TABLE recipes ADD COLUMN serving_size DECIMAL;
ALTER TABLE recipes ADD COLUMN household_measure TEXT;
ALTER TABLE recipes ADD COLUMN validity_days INTEGER;
ALTER TABLE recipes ADD COLUMN difficulty_level TEXT;
ALTER TABLE recipes ADD COLUMN preparation_time INTEGER;
ALTER TABLE recipes ADD COLUMN contains_gluten BOOLEAN DEFAULT false;
ALTER TABLE recipes ADD COLUMN allergens JSONB;