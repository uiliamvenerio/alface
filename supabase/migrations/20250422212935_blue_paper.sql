/*
  # Create Recipe Module Tables

  1. New Tables
    - recipes: Stores recipe information
    - recipe_ingredients: Stores ingredients for each recipe
    - ingredients: Stores ingredient information from nutritional tables

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create recipes table
CREATE TABLE recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  unit TEXT NOT NULL,
  correction_factor DECIMAL DEFAULT 1,
  cooking_index DECIMAL DEFAULT 1,
  preparation_steps JSONB,
  notes TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id)
);

-- Create recipe_ingredients table
CREATE TABLE recipe_ingredients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  ingredient_id UUID REFERENCES ingredients(id),
  quantity DECIMAL NOT NULL,
  unit TEXT NOT NULL,
  gross_weight DECIMAL,
  net_weight DECIMAL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create ingredients table
CREATE TABLE ingredients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  nutritional_table TEXT NOT NULL,
  calories DECIMAL,
  proteins DECIMAL,
  carbohydrates DECIMAL,
  fats DECIMAL,
  fiber DECIMAL,
  sodium DECIMAL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own recipes"
  ON recipes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own recipes"
  ON recipes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own recipes"
  ON recipes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own recipes"
  ON recipes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Recipe ingredients policies
CREATE POLICY "Users can read own recipe ingredients"
  ON recipe_ingredients
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM recipes
      WHERE recipes.id = recipe_ingredients.recipe_id
      AND recipes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own recipe ingredients"
  ON recipe_ingredients
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM recipes
      WHERE recipes.id = recipe_ingredients.recipe_id
      AND recipes.user_id = auth.uid()
    )
  );

-- Ingredients policies (all users can read)
CREATE POLICY "All users can read ingredients"
  ON ingredients
  FOR SELECT
  TO authenticated
  USING (true);