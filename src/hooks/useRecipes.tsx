
import { useState, useMemo } from 'react';
import { recipes, Recipe } from '../data/recipes';

export const useRecipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch = searchTerm === '' || 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesCategory = categoryFilter === null || recipe.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);
  
  const getRecipeById = (id: string): Recipe | undefined => {
    return recipes.find(recipe => recipe.id === id);
  };
  
  const getFeaturedRecipe = (): Recipe => {
    // Just return the first recipe for now, but this could be randomized or curated
    return recipes[0];
  };
  
  const categories = useMemo(() => {
    const categorySet = new Set(recipes.map(recipe => recipe.category));
    return Array.from(categorySet);
  }, []);
  
  return {
    recipes: filteredRecipes,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    getRecipeById,
    getFeaturedRecipe,
    categories
  };
};
