import { z } from 'zod';

export const recipeSchema = z.object({
  name: z.string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  category: z.string()
    .min(1, 'Categoria é obrigatória'),
  unit: z.string()
    .min(1, 'Unidade é obrigatória'),
  correction_factor: z.number()
    .min(0.1, 'Fator de correção deve ser maior que 0')
    .default(1),
  cooking_index: z.number()
    .min(0.1, 'Índice de cocção deve ser maior que 0')
    .default(1),
  preparation_steps: z.array(
    z.string().min(1, 'Passo não pode estar vazio')
  ).default([]),
  notes: z.string().optional(),
  image_url: z.string().url().optional(),
  monthly_production: z.number().int().min(0).optional(),
  preparation_type: z.string().optional(),
  servings: z.number().int().min(1, 'Número de porções deve ser maior que 0').optional(),
  serving_size: z.number().min(0, 'Tamanho da porção deve ser maior ou igual a 0').optional(),
  household_measure: z.string().optional(),
  validity_days: z.number().int().min(1, 'Validade deve ser maior que 0').optional(),
  difficulty_level: z.enum(['easy', 'medium', 'hard']).optional(),
  preparation_time: z.number().int().min(1, 'Tempo de preparo deve ser maior que 0').optional(),
  contains_gluten: z.boolean().default(false),
  allergens: z.array(z.string()).default([]),
  recipe_ingredients: z.array(
    z.object({
      ingredient_id: z.string().uuid('ID do ingrediente inválido'),
      quantity: z.number()
        .min(0.01, 'Quantidade deve ser maior que 0'),
      unit: z.string()
        .min(1, 'Unidade é obrigatória'),
      gross_weight: z.number()
        .min(0, 'Peso bruto deve ser maior ou igual a 0')
        .optional(),
      net_weight: z.number()
        .min(0, 'Peso líquido deve ser maior ou igual a 0')
        .optional()
    })
  ).min(1, 'Receita deve ter pelo menos um ingrediente')
});

export const recipeIngredientSchema = z.object({
  ingredient_id: z.string().uuid('ID do ingrediente inválido'),
  quantity: z.number()
    .min(0.01, 'Quantidade deve ser maior que 0'),
  unit: z.string()
    .min(1, 'Unidade é obrigatória'),
  gross_weight: z.number()
    .min(0, 'Peso bruto deve ser maior ou igual a 0')
    .optional(),
  net_weight: z.number()
    .min(0, 'Peso líquido deve ser maior ou igual a 0')
    .optional()
});