import React, { useState } from 'react';
import { useIngredients } from '../../hooks/useIngredients';
import { recipeIngredientSchema } from '../../schemas/recipe';

export function IngredientSearch({ onSelect }) {
  const [search, setSearch] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('g');
  const { ingredients, isLoading } = useIngredients(search);

  const handleSelect = (ingredient) => {
    try {
      const newIngredient = recipeIngredientSchema.parse({
        ingredient_id: ingredient.id,
        quantity: Number(quantity),
        unit,
        ingredient: ingredient // Include full ingredient data for display
      });
      
      onSelect(newIngredient);
      setSearch('');
      setQuantity('');
    } catch (error) {
      console.error('Invalid ingredient data:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar ingrediente..."
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Qtd"
            className="w-24 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="g">g</option>
            <option value="kg">kg</option>
            <option value="ml">ml</option>
            <option value="l">l</option>
            <option value="unidade">un</option>
          </select>
        </div>
      </div>

      {search.length > 2 && (
        <div className="relative">
          <div className="absolute z-10 w-full bg-white dark:bg-dark-card rounded-lg shadow-lg border border-gray-100 dark:border-gray-800 max-h-60 overflow-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                Carregando...
              </div>
            ) : ingredients.length > 0 ? (
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {ingredients.map((ingredient) => (
                  <button
                    key={ingredient.id}
                    onClick={() => handleSelect(ingredient)}
                    className="flex items-center gap-4 w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {ingredient.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {ingredient.nutritional_table}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                Nenhum ingrediente encontrado
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}