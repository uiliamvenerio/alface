import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { RecipesList } from './RecipesList';
import { RecipeForm } from './RecipeForm';

const initialRecipes = [
  {
    id: 1,
    name: 'Salada de Quinoa',
    category: 'Saladas',
    unit: 'porção',
    createdAt: '2023-12-22T10:30:00Z'
  },
  {
    id: 2,
    name: 'Smoothie Verde',
    category: 'Bebidas',
    unit: 'ml',
    createdAt: '2023-12-21T15:45:00Z'
  }
];

export function RecipesPage() {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all'
  });

  const handleCreateRecipe = (recipe) => {
    setRecipes([...recipes, { ...recipe, id: Date.now() }]);
  };

  const handleUpdateRecipe = (updatedRecipe) => {
    setRecipes(recipes.map(r => 
      r.id === updatedRecipe.id ? updatedRecipe : r
    ));
  };

  const handleDeleteRecipe = (id) => {
    setRecipes(recipes.filter(r => r.id !== id));
  };

  const filteredRecipes = recipes.filter(recipe => {
    if (filters.search && !recipe.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.category !== 'all' && recipe.category !== filters.category) {
      return false;
    }
    return true;
  });

  return (
    <main className="flex-1 min-w-0 overflow-auto">
      <div className="max-w-[1440px] mx-auto animate-fade-in">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4">
          <h1 className="text-gray-900 dark:text-white text-2xl md:text-3xl font-bold">Receitas</h1>
          <Button onClick={() => {
            setSelectedRecipe(null);
            setIsFormOpen(true);
          }}>
            Nova Receita
          </Button>
        </div>

        <div className="p-4">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center gap-4">
                <input
                  type="text"
                  placeholder="Buscar receitas..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="flex-1 min-w-[200px] px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="all">Todas as Categorias</option>
                  <option value="Saladas">Saladas</option>
                  <option value="Bebidas">Bebidas</option>
                  <option value="Pratos Principais">Pratos Principais</option>
                  <option value="Sobremesas">Sobremesas</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <RecipesList
                recipes={filteredRecipes}
                onEdit={(recipe) => {
                  setSelectedRecipe(recipe);
                  setIsFormOpen(true);
                }}
                onDelete={handleDeleteRecipe}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <RecipeForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedRecipe(null);
        }}
        onSubmit={selectedRecipe ? handleUpdateRecipe : handleCreateRecipe}
        recipe={selectedRecipe}
      />
    </main>
  );
}