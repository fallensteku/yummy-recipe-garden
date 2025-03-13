
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Utensils } from 'lucide-react';
import { Recipe } from '../data/recipes';

interface RecipeCardProps {
  recipe: Recipe;
  featured?: boolean;
}

const RecipeCard = ({ recipe, featured = false }: RecipeCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link 
      to={`/recipe/${recipe.id}`} 
      className={`recipe-card block ${featured ? 'h-full' : ''}`}
    >
      <div className="relative overflow-hidden">
        <div className={`aspect-[4/3] bg-sand-100 ${!imageLoaded ? 'animate-pulse' : ''}`}>
          <img
            src={recipe.image}
            alt={recipe.title}
            className={`recipe-card-image ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        {recipe.category && (
          <div className="absolute top-3 left-3">
            <span className="recipe-tag">
              {recipe.category}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className={`font-serif ${featured ? 'text-2xl' : 'text-lg'} font-medium mb-2 line-clamp-2`}>
          {recipe.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {recipe.description}
        </p>
        
        <div className="flex items-center text-sm text-muted-foreground space-x-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{recipe.cookTime} min</span>
          </div>
          <div className="flex items-center">
            <Utensils className="w-4 h-4 mr-1" />
            <span>{recipe.difficulty}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
