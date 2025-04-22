import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Recipe related functions
export const recipeService = {
  async create(recipe) {
    const { data, error } = await supabase
      .from('recipes')
      .insert([recipe])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id, recipe) {
    const { data, error } = await supabase
      .from('recipes')
      .update(recipe)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('recipes')
      .select(`
        *,
        recipe_ingredients (
          *,
          ingredients (*)
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async list(filters = {}) {
    let query = supabase
      .from('recipes')
      .select(`
        *,
        recipe_ingredients (
          *,
          ingredients (*)
        )
      `);

    if (filters.category) {
      query = query.eq('category', filters.category);
    }

    if (filters.search) {
      query = query.ilike('name', `%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  },

  async uploadImage(file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `recipe-images/${fileName}`;

    const { error } = await supabase.storage
      .from('recipes')
      .upload(filePath, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from('recipes')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }
};

// Ingredient related functions
export const ingredientService = {
  async search(query) {
    const { data, error } = await supabase
      .from('ingredients')
      .select('*')
      .ilike('name', `%${query}%`)
      .limit(10);

    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('ingredients')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
};