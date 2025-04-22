import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { recipeService } from '../lib/supabase';

export function useRecipes(filters = {}) {
  const {
    data: recipes,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['recipes', filters],
    queryFn: ({ pageParam = 0 }) => recipeService.list({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return undefined;
      return pages.length;
    }
  });

  const flatRecipes = recipes?.pages.flat() || [];

  return {
    recipes: flatRecipes,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  };
}