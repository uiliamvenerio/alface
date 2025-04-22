import React from 'react';

export function IngredientList({ ingredients = [], onRemove }) {
  if (!ingredients.length) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        Nenhum ingrediente adicionado
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Ingrediente</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Quantidade</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Unidade</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Ações</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient, index) => (
              <tr 
                key={index}
                className="border-b border-gray-100 dark:border-gray-800"
              >
                <td className="py-3 px-4">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {ingredient.ingredient.name}
                  </p>
                </td>
                <td className="py-3 px-4">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {ingredient.quantity}
                  </p>
                </td>
                <td className="py-3 px-4">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {ingredient.unit}
                  </p>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => onRemove(index)}
                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}