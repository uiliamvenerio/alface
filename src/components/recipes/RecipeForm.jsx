import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@headlessui/react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { IngredientSearch } from './IngredientSearch';
import { IngredientList } from './IngredientList';
import { PreparationSteps } from './PreparationSteps';
import { recipeSchema } from '../../schemas/recipe';
import toast from 'react-hot-toast';

const allergenOptions = [
  'Leite',
  'Ovo',
  'Amendoim',
  'Nozes',
  'Soja',
  'Trigo',
  'Peixe',
  'Frutos do Mar',
  'Gergelim',
  'Mostarda',
  'Aipo',
  'Sulfitos'
];

const difficultyLevels = [
  { value: 'easy', label: 'Fácil' },
  { value: 'medium', label: 'Médio' },
  { value: 'hard', label: 'Difícil' }
];

const preparationTypes = [
  'Entrada',
  'Prato Principal',
  'Sobremesa',
  'Bebida',
  'Lanche',
  'Salada',
  'Sopa',
  'Molho',
  'Acompanhamento'
];

export function RecipeForm({ isOpen, onClose, onSubmit, recipe }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch
  } = useForm({
    resolver: zodResolver(recipeSchema),
    defaultValues: recipe || {
      name: '',
      category: '',
      unit: '',
      correction_factor: 1,
      cooking_index: 1,
      preparation_steps: [],
      notes: '',
      recipe_ingredients: [],
      monthly_production: 0,
      preparation_type: '',
      servings: 1,
      serving_size: 0,
      household_measure: '',
      validity_days: 1,
      difficulty_level: 'medium',
      preparation_time: 30,
      contains_gluten: false,
      allergens: []
    }
  });

  const ingredients = watch('recipe_ingredients');
  const selectedAllergens = watch('allergens') || [];

  const handleAddIngredient = (ingredient) => {
    const currentIngredients = watch('recipe_ingredients') || [];
    setValue('recipe_ingredients', [...currentIngredients, ingredient]);
  };

  const handleRemoveIngredient = (index) => {
    const currentIngredients = watch('recipe_ingredients') || [];
    setValue(
      'recipe_ingredients',
      currentIngredients.filter((_, i) => i !== index)
    );
  };

  const handleAllergenToggle = (allergen) => {
    const current = selectedAllergens;
    const updated = current.includes(allergen)
      ? current.filter(a => a !== allergen)
      : [...current, allergen];
    setValue('allergens', updated);
  };

  const onFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      toast.error('Erro ao salvar receita');
    }
  };

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
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                {recipe ? 'Editar Receita' : 'Nova Receita'}
              </Dialog.Title>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit(onFormSubmit)}>
              <div className="p-6 space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nome *
                    </label>
                    <input
                      type="text"
                      {...register('name')}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Categoria *
                    </label>
                    <select
                      {...register('category')}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="">Selecione uma categoria</option>
                      <option value="Entradas">Entradas</option>
                      <option value="Pratos Principais">Pratos Principais</option>
                      <option value="Sobremesas">Sobremesas</option>
                      <option value="Bebidas">Bebidas</option>
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tipo de Preparação
                    </label>
                    <select
                      {...register('preparation_type')}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="">Selecione um tipo</option>
                      {preparationTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Unidade *
                    </label>
                    <select
                      {...register('unit')}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="">Selecione uma unidade</option>
                      <option value="porção">Porção</option>
                      <option value="unidade">Unidade</option>
                      <option value="kg">Quilograma</option>
                      <option value="g">Grama</option>
                      <option value="ml">Mililitro</option>
                      <option value="l">Litro</option>
                    </select>
                    {errors.unit && (
                      <p className="mt-1 text-sm text-red-600">{errors.unit.message}</p>
                    )}
                  </div>
                </div>

                {/* Production Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Produção Mensal
                    </label>
                    <input
                      type="number"
                      {...register('monthly_production', { valueAsNumber: true })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Número de Porções
                    </label>
                    <input
                      type="number"
                      {...register('servings', { valueAsNumber: true })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tamanho da Porção (g/ml)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('serving_size', { valueAsNumber: true })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Medida Caseira
                    </label>
                    <input
                      type="text"
                      {...register('household_measure')}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Validade (dias)
                    </label>
                    <input
                      type="number"
                      {...register('validity_days', { valueAsNumber: true })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tempo de Preparo (min)
                    </label>
                    <input
                      type="number"
                      {...register('preparation_time', { valueAsNumber: true })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                {/* Calculation Factors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Fator de Correção
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('correction_factor', { valueAsNumber: true })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    {errors.correction_factor && (
                      <p className="mt-1 text-sm text-red-600">{errors.correction_factor.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Índice de Cocção
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('cooking_index', { valueAsNumber: true })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    {errors.cooking_index && (
                      <p className="mt-1 text-sm text-red-600">{errors.cooking_index.message}</p>
                    )}
                  </div>
                </div>

                {/* Difficulty and Allergens */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nível de Dificuldade
                    </label>
                    <select
                      {...register('difficulty_level')}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      {difficultyLevels.map(level => (
                        <option key={level.value} value={level.value}>{level.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Contém Glúten
                    </label>
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          {...register('contains_gluten')}
                          className="checkbox-custom"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Sim, esta receita contém glúten
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Allergens */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Alérgenos
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {allergenOptions.map(allergen => (
                      <label key={allergen} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedAllergens.includes(allergen)}
                          onChange={() => handleAllergenToggle(allergen)}
                          className="checkbox-custom"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {allergen}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Ingredientes
                  </h3>
                  <IngredientSearch onSelect={handleAddIngredient} />
                  <IngredientList
                    ingredients={ingredients}
                    onRemove={handleRemoveIngredient}
                  />
                  {errors.recipe_ingredients && (
                    <p className="mt-1 text-sm text-red-600">{errors.recipe_ingredients.message}</p>
                  )}
                </div>

                {/* Preparation Steps */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Modo de Preparo
                  </h3>
                  <Controller
                    name="preparation_steps"
                    control={control}
                    render={({ field }) => (
                      <PreparationSteps
                        steps={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.preparation_steps && (
                    <p className="mt-1 text-sm text-red-600">{errors.preparation_steps.message}</p>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Observações
                  </label>
                  <textarea
                    {...register('notes')}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  {errors.notes && (
                    <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 dark:border-gray-800">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                >
                  {recipe ? 'Atualizar Receita' : 'Criar Receita'}
                </Button>
              </div>
            </form>
          </Card>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}