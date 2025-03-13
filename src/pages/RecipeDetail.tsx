
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Utensils, Users, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRecipes } from '../hooks/useRecipes';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRecipeById } = useRecipes();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const recipe = id ? getRecipeById(id) : undefined;
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!recipe) {
      // If recipe not found, navigate to recipes page
      navigate('/recipes', { replace: true });
    }
  }, [recipe, navigate]);
  
  if (!recipe) {
    return null;
  }
  
  return (
    <>
      <Navbar />
      
      <main className="pt-24">
        <div className="page-container">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to recipes
          </button>
          
          <div className="mb-12">
            <div className="mb-4">
              <span className="recipe-tag">{recipe.category}</span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl font-medium mb-6">
              {recipe.title}
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mb-8">
              {recipe.description}
            </p>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <div>
                  <p className="font-medium">Prep Time</p>
                  <p>{recipe.prepTime} min</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <div>
                  <p className="font-medium">Cook Time</p>
                  <p>{recipe.cookTime} min</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Utensils className="w-5 h-5 mr-2" />
                <div>
                  <p className="font-medium">Difficulty</p>
                  <p>{recipe.difficulty}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <div>
                  <p className="font-medium">Servings</p>
                  <p>{recipe.servings}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative w-full h-[50vh] min-h-[400px] rounded-2xl overflow-hidden mb-16">
            <div className={`absolute inset-0 bg-sand-100 ${!imageLoaded ? 'animate-pulse' : ''}`} />
            <img
              src={recipe.image}
              alt={recipe.title}
              className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="font-serif text-2xl font-medium mb-6">Ingredients</h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 mt-2 mr-2 bg-spice-400 rounded-full" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl font-medium mb-6">Instructions</h2>
              <ol className="space-y-6">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex">
                    <span className="inline-flex items-center justify-center w-8 h-8 mr-4 bg-sand-100 rounded-full font-medium flex-shrink-0">
                      {index + 1}
                    </span>
                    <p>{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default RecipeDetail;
