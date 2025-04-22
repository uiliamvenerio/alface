import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { ingredientService } from '../lib/supabase';

export function useIngredients(searchQuery = '') {
  const {
    data: ingredients,
    isLoading,
    error
  } = useQuery({
    queryKey: ['ingredients', searchQuery],
    queryFn: () => ingredientService.search(searchQuery),
    enabled: searchQuery.length > 2
  });

  const {
    data: ingredient,
    isLoading: isLoadingIngredient
  } = useQuery({
    queryKey: ['ingredient', searchQuery],
    queryFn: () => ingredientService.getById(searchQuery),
    enabled: searchQuery.length === 36 // UUID length
  });

  return {
    ingredients: ingredients || [],
    ingredient,
    isLoading: isLoading || isLoadingIngredient,
    error
  };
}