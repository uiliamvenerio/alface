import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { recipeService } from '../lib/supabase';
import toast from 'react-hot-toast';

export function useRecipe(id) {
  const queryClient = useQueryClient();

  const {
    data: recipe,
    isLoading,
    error
  } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => recipeService.getById(id),
    enabled: !!id
  });

  const createMutation = useMutation({
    mutationFn: recipeService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      toast.success('Recipe created successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, recipe }) => recipeService.update(id, recipe),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      toast.success('Recipe updated successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: recipeService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      toast.success('Recipe deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const uploadImageMutation = useMutation({
    mutationFn: recipeService.uploadImage,
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return {
    recipe,
    isLoading,
    error,
    createRecipe: createMutation.mutate,
    updateRecipe: updateMutation.mutate,
    deleteRecipe: deleteMutation.mutate,
    uploadImage: uploadImageMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isUploading: uploadImageMutation.isPending
  };
}