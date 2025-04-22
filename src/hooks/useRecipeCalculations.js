import { useMemo } from 'react';

export function useRecipeCalculations(recipe) {
  const nutritionalValues = useMemo(() => {
    if (!recipe?.recipe_ingredients?.length) {
      return {
        calories: 0,
        proteins: 0,
        carbohydrates: 0,
        fats: 0,
        fiber: 0,
        sodium: 0
      };
    }

    return recipe.recipe_ingredients.reduce((acc, { quantity, ingredients }) => {
      const factor = quantity / 100; // Convert to 100g basis

      return {
        calories: acc.calories + (ingredients.calories * factor),
        proteins: acc.proteins + (ingredients.proteins * factor),
        carbohydrates: acc.carbohydrates + (ingredients.carbohydrates * factor),
        fats: acc.fats + (ingredients.fats * factor),
        fiber: acc.fiber + (ingredients.fiber * factor),
        sodium: acc.sodium + (ingredients.sodium * factor)
      };
    }, {
      calories: 0,
      proteins: 0,
      carbohydrates: 0,
      fats: 0,
      fiber: 0,
      sodium: 0
    });
  }, [recipe?.recipe_ingredients]);

  const perServing = useMemo(() => {
    const servings = recipe?.servings || 1;
    return {
      calories: nutritionalValues.calories / servings,
      proteins: nutritionalValues.proteins / servings,
      carbohydrates: nutritionalValues.carbohydrates / servings,
      fats: nutritionalValues.fats / servings,
      fiber: nutritionalValues.fiber / servings,
      sodium: nutritionalValues.sodium / servings
    };
  }, [nutritionalValues, recipe?.servings]);

  return {
    total: nutritionalValues,
    perServing
  };
}