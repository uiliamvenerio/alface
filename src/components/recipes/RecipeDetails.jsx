import React from 'react';
import { Dialog } from '@headlessui/react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useRecipeCalculations } from '../../hooks/useRecipeCalculations';
import { RecipeExport } from './RecipeExport';

export function RecipeDetails({ recipe, isOpen, onClose, onEdit, onDelete }) {
  const { total: nutritionalValues, perServing } = useRecipeCalculations(recipe);

  if (!recipe) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/20 dark:bg-black/40" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-4xl max-h-[90vh] overflow-auto">
          <Card>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-4">
                {recipe.image_url && (
                  <img
                    src={recipe.image_url}
                    alt={recipe.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                )}
                <div>
                  <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white">
                    {recipe.name}
                  </Dialog.Title>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {recipe.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <RecipeExport recipe={recipe} />
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Ingredients */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Ingredientes
                </h3>
                <div className="space-y-2">
                  {recipe.recipe_ingredients.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      <span>{item.quantity}{item.unit} {item.ingredient.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preparation Steps */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Modo de Preparo
                </h3>
                <div className="space-y-4">
                  {recipe.preparation_steps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-none pt-1">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary bg-opacity-10 text-primary text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <p className="flex-1 text-sm text-gray-700 dark:text-gray-300">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nutritional Values */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Valores Nutricionais
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-dark-hover">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Calorias</p>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {nutritionalValues.calories.toFixed(2)} kcal
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-dark-hover">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Proteínas</p>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {nutritionalValues.proteins.toFixed(2)}g
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-dark-hover">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Carboidratos</p>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {nutritionalValues.carbohydrates.toFixed(2)}g
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-dark-hover">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Gorduras</p>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {nutritionalValues.fats.toFixed(2)}g
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-dark-hover">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Fibras</p>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {nutritionalValues.fiber.toFixed(2)}g
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-dark-hover">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Sódio</p>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {nutritionalValues.sodium.toFixed(2)}mg
                    </p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {recipe.notes && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Observações
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-dark-hover p-4 rounded-lg">
                    {recipe.notes}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 dark:border-gray-800">
              <Button
                variant="secondary"
                onClick={onClose}
              >
                Fechar
              </Button>
              <Button
                variant="secondary"
                onClick={() => onEdit(recipe)}
              >
                Editar
              </Button>
              <Button
                variant="secondary"
                className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={() => {
                  onDelete(recipe.id);
                  onClose();
                }}
              >
                Excluir
              </Button>
            </div>
          </Card>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}