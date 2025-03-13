
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import { useRecipes } from '../hooks/useRecipes';

const Recipes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { 
    recipes, 
    searchTerm, 
    setSearchTerm, 
    categoryFilter, 
    setCategoryFilter, 
    categories 
  } = useRecipes();
  
  useEffect(() => {
    // Get category from URL query params
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setCategoryFilter(categoryParam);
    }
    
    window.scrollTo(0, 0);
  }, [searchParams, setCategoryFilter]);
  
  const handleCategoryChange = (category: string | null) => {
    setCategoryFilter(category);
    
    if (category) {
      searchParams.set('category', category);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter(null);
    setSearchParams({});
  };
  
  const hasActiveFilters = searchTerm || categoryFilter;
  
  return (
    <>
      <Navbar />
      
      <main className="pt-24">
        <div className="page-container">
          <h1 className="font-serif text-4xl md:text-5xl font-medium mb-8 text-center">
            All Recipes
          </h1>
          
          {/* Search and filters */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 border border-sand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-spice-400 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`recipe-tag ${categoryFilter === null ? 'bg-spice-400 text-white' : ''}`}
              >
                All
              </button>
              
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`recipe-tag ${categoryFilter === category ? 'bg-spice-400 text-white' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-muted-foreground flex items-center hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4 mr-1" />
                Clear all filters
              </button>
            )}
          </div>
          
          {/* Recipe grid */}
          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                No recipes found. Try adjusting your search or filters.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 btn btn-primary px-6 py-2"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Recipes;
