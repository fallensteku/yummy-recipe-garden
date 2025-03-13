
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import RecipeCard from '../components/RecipeCard';
import FeaturedRecipe from '../components/FeaturedRecipe';
import Footer from '../components/Footer';
import { useRecipes } from '../hooks/useRecipes';

const Index = () => {
  const { recipes, getFeaturedRecipe, categories } = useRecipes();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredRecipe = getFeaturedRecipe();
  
  // Get 3 recipes for each category section
  const getRecipesByCategory = (category: string) => {
    return recipes
      .filter(recipe => recipe.category === category)
      .slice(0, 3);
  };
  
  return (
    <>
      <Navbar />
      
      <main className="pt-16">
        {/* Hero section */}
        <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center bg-sand-50">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Delicious food"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto px-4 animate-fade-up">
            <h1 className="font-serif text-4xl md:text-6xl font-medium mb-6">
              Simple, Delicious Recipes
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover recipes that bring joy to your table, focusing on quality ingredients and straightforward techniques.
            </p>
            <Link 
              to="/recipes" 
              className="btn btn-primary px-8 py-3 text-base"
            >
              Explore Recipes
            </Link>
          </div>
        </section>
        
        {/* Featured recipe section */}
        <section className="page-container">
          <h2 className="font-serif text-3xl font-medium mb-8 text-center">Featured Recipe</h2>
          <FeaturedRecipe recipe={featuredRecipe} />
        </section>
        
        {/* Category sections */}
        {categories.map(category => {
          const categoryRecipes = getRecipesByCategory(category);
          if (categoryRecipes.length === 0) return null;
          
          return (
            <section key={category} className="page-container mt-24">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-serif text-3xl font-medium">{category}</h2>
                <Link 
                  to={`/recipes?category=${category}`} 
                  className="text-spice-500 font-medium flex items-center hover:text-spice-600 transition-colors"
                >
                  View all
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categoryRecipes.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </section>
          );
        })}
      </main>
      
      <Footer />
    </>
  );
};

export default Index;
