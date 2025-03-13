export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  cookTime: number;
  prepTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  servings: number;
  ingredients: string[];
  instructions: string[];
  authorId?: string;
  createdAt?: string;
}

export const recipes: Recipe[] = [
  {
    id: "1",
    title: "Creamy Mushroom Risotto",
    description: "A comforting classic Italian rice dish made with arborio rice, mushrooms, and parmesan cheese. Perfect for a cozy dinner.",
    image: "https://images.unsplash.com/photo-1633436375153-d7045cb61590?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
    category: "Main Course",
    cookTime: 30,
    prepTime: 15,
    difficulty: "Medium",
    servings: 4,
    ingredients: [
      "1 1/2 cups arborio rice",
      "6 cups vegetable stock, kept warm",
      "1/2 cup dry white wine",
      "1 small onion, finely diced",
      "2 cloves garlic, minced",
      "8 oz mushrooms, sliced",
      "2 tbsp olive oil",
      "2 tbsp butter",
      "1/2 cup grated parmesan cheese",
      "2 tbsp fresh parsley, chopped",
      "Salt and pepper to taste"
    ],
    instructions: [
      "In a large pot, heat the olive oil and 1 tbsp butter over medium heat.",
      "Add onions and sauté until translucent, about 3 minutes.",
      "Add garlic and mushrooms, cook until mushrooms are softened, about 5 minutes.",
      "Add the arborio rice and stir to coat with oil and butter, toasting slightly for 1-2 minutes.",
      "Pour in the white wine and stir until absorbed.",
      "Begin adding warm stock, one ladle at a time, stirring frequently. Wait until each addition is absorbed before adding more.",
      "Continue this process until rice is creamy and al dente, about 20-25 minutes.",
      "Remove from heat and stir in remaining butter and parmesan cheese.",
      "Season with salt and pepper, garnish with parsley, and serve immediately."
    ]
  },
  {
    id: "2",
    title: "Blueberry Pancakes",
    description: "Fluffy homemade pancakes bursting with fresh blueberries. The perfect weekend breakfast treat.",
    image: "https://images.unsplash.com/photo-1590137876181-2a5a7e340308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
    category: "Breakfast",
    cookTime: 15,
    prepTime: 10,
    difficulty: "Easy",
    servings: 4,
    ingredients: [
      "2 cups all-purpose flour",
      "2 tbsp sugar",
      "1 tbsp baking powder",
      "1/2 tsp salt",
      "2 large eggs",
      "1 3/4 cups milk",
      "1/4 cup melted butter",
      "1 tsp vanilla extract",
      "1 1/2 cups fresh blueberries",
      "Maple syrup for serving",
      "Additional butter for cooking"
    ],
    instructions: [
      "In a large bowl, whisk together flour, sugar, baking powder, and salt.",
      "In another bowl, whisk eggs, milk, melted butter, and vanilla.",
      "Pour wet ingredients into dry ingredients and mix until just combined. Don't overmix - some lumps are okay.",
      "Gently fold in the blueberries.",
      "Heat a large skillet or griddle over medium heat and melt a small amount of butter.",
      "Pour 1/4 cup portions of batter onto the hot skillet.",
      "Cook until bubbles form on top, about 2-3 minutes, then flip and cook another 2 minutes until golden brown.",
      "Serve warm with maple syrup and additional butter if desired."
    ]
  },
  {
    id: "3",
    title: "Lemon Herb Roasted Chicken",
    description: "A simple yet flavorful roasted chicken infused with lemon and fresh herbs. Perfect for Sunday dinner.",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
    category: "Main Course",
    cookTime: 75,
    prepTime: 15,
    difficulty: "Medium",
    servings: 6,
    ingredients: [
      "1 whole chicken (about 4-5 pounds)",
      "2 lemons, 1 zested and juiced, 1 quartered",
      "3 cloves garlic, minced",
      "2 tbsp olive oil",
      "1 tbsp fresh rosemary, chopped",
      "1 tbsp fresh thyme leaves",
      "1 tsp salt",
      "1/2 tsp black pepper",
      "1 onion, quartered",
      "2 carrots, roughly chopped",
      "2 celery stalks, roughly chopped"
    ],
    instructions: [
      "Preheat oven to 425°F (220°C).",
      "Pat chicken dry with paper towels, inside and out.",
      "In a small bowl, mix lemon zest, lemon juice, garlic, olive oil, rosemary, thyme, salt, and pepper.",
      "Rub herb mixture all over the chicken, including under the skin where possible.",
      "Stuff the cavity with quartered lemon and half the onion.",
      "Place the remaining onion, carrots, and celery in a roasting pan, then place the chicken on top, breast side up.",
      "Roast for 1 hour and 15 minutes, or until the internal temperature reaches 165°F (74°C) and juices run clear.",
      "Let rest for 15 minutes before carving.",
      "Serve with the roasted vegetables and pan juices."
    ]
  },
  {
    id: "4",
    title: "Chocolate Lava Cake",
    description: "Decadent individual chocolate cakes with a molten chocolate center. A perfect dessert to impress guests.",
    image: "https://images.unsplash.com/photo-1617305855058-336d9ce3eb63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
    category: "Dessert",
    cookTime: 14,
    prepTime: 15,
    difficulty: "Medium",
    servings: 4,
    ingredients: [
      "4 oz dark chocolate, chopped",
      "1/2 cup unsalted butter",
      "1 cup powdered sugar",
      "2 large eggs",
      "2 large egg yolks",
      "1 tsp vanilla extract",
      "6 tbsp all-purpose flour",
      "1/4 tsp salt",
      "Vanilla ice cream for serving (optional)",
      "Fresh berries for garnish (optional)"
    ],
    instructions: [
      "Preheat oven to 425°F (220°C). Butter and lightly flour four 6-oz ramekins.",
      "In a microwave-safe bowl, combine chocolate and butter. Microwave in 30-second intervals, stirring between each, until melted and smooth.",
      "Add powdered sugar and whisk until combined.",
      "Add eggs and egg yolks, one at a time, whisking well after each addition.",
      "Stir in vanilla extract.",
      "Gently fold in flour and salt until just combined.",
      "Divide batter evenly among prepared ramekins.",
      "Place ramekins on a baking sheet and bake for 12-14 minutes until the edges are firm but the center is still soft.",
      "Let stand for 1 minute, then carefully invert each cake onto a serving plate.",
      "Serve immediately with vanilla ice cream and fresh berries if desired."
    ]
  },
  {
    id: "5",
    title: "Fresh Mediterranean Salad",
    description: "A vibrant and refreshing salad packed with crisp vegetables, olives, and feta cheese, dressed with olive oil and lemon.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
    category: "Salad",
    cookTime: 0,
    prepTime: 15,
    difficulty: "Easy",
    servings: 4,
    ingredients: [
      "1 English cucumber, diced",
      "4 Roma tomatoes, diced",
      "1 red bell pepper, diced",
      "1/2 red onion, thinly sliced",
      "1 cup Kalamata olives, pitted",
      "6 oz feta cheese, crumbled",
      "1/4 cup extra virgin olive oil",
      "2 tbsp fresh lemon juice",
      "1 tsp dried oregano",
      "2 tbsp fresh parsley, chopped",
      "Salt and pepper to taste"
    ],
    instructions: [
      "In a large bowl, combine cucumber, tomatoes, bell pepper, red onion, and olives.",
      "In a small bowl, whisk together olive oil, lemon juice, oregano, salt, and pepper.",
      "Pour dressing over the vegetables and toss gently to combine.",
      "Sprinkle crumbled feta cheese and fresh parsley over the top.",
      "Serve immediately or refrigerate for up to an hour to allow flavors to meld."
    ]
  },
  {
    id: "6",
    title: "Classic French Onion Soup",
    description: "A rich and hearty soup featuring caramelized onions in a savory broth, topped with crusty bread and melted Gruyère cheese.",
    image: "https://images.unsplash.com/photo-1583192614447-e55d233d45b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
    category: "Soup",
    cookTime: 70,
    prepTime: 15,
    difficulty: "Medium",
    servings: 6,
    ingredients: [
      "6 large onions, thinly sliced",
      "4 tbsp unsalted butter",
      "2 tbsp olive oil",
      "1 tsp sugar",
      "2 cloves garlic, minced",
      "3 tbsp all-purpose flour",
      "8 cups beef stock",
      "1/2 cup dry white wine",
      "2 bay leaves",
      "2 sprigs fresh thyme",
      "1 baguette, sliced",
      "2 cups Gruyère cheese, grated",
      "Salt and pepper to taste"
    ],
    instructions: [
      "In a large pot or Dutch oven, melt butter with olive oil over medium heat.",
      "Add sliced onions and sugar, cook until deeply caramelized, stirring occasionally, about 45-50 minutes.",
      "Add garlic and cook for 1 minute until fragrant.",
      "Sprinkle flour over the onions and cook for 1-2 minutes, stirring constantly.",
      "Slowly add beef stock and white wine, stirring to incorporate.",
      "Add bay leaves and thyme, bring to a simmer.",
      "Reduce heat to low and simmer for 15-20 minutes. Season with salt and pepper.",
      "Preheat broiler. Place oven-safe soup bowls on a baking sheet.",
      "Ladle soup into bowls, top each with a slice of baguette and a generous amount of grated Gruyère.",
      "Broil until cheese is melted and bubbly, about 2-3 minutes. Serve immediately."
    ]
  }
];

export const getRecipeById = (id: string): Recipe | undefined => {
  return recipes.find(recipe => recipe.id === id);
};

export const getRecipesByCategory = (category: string): Recipe[] => {
  return recipes.filter(recipe => recipe.category === category);
};

export const getUserRecipes = (userId: string): Recipe[] => {
  return recipes.filter(recipe => recipe.authorId === userId);
};

export const addRecipe = (recipe: Omit<Recipe, 'id'>): Recipe => {
  const newRecipe: Recipe = {
    ...recipe,
    id: (recipes.length + 1).toString(),
  };
  
  recipes.push(newRecipe);
  return newRecipe;
};

export const updateRecipe = (id: string, updates: Partial<Recipe>): Recipe | undefined => {
  const recipeIndex = recipes.findIndex(recipe => recipe.id === id);
  if (recipeIndex === -1) return undefined;
  
  recipes[recipeIndex] = { ...recipes[recipeIndex], ...updates };
  return recipes[recipeIndex];
};

export const deleteRecipe = (id: string): boolean => {
  const recipeIndex = recipes.findIndex(recipe => recipe.id === id);
  if (recipeIndex === -1) return false;
  
  recipes.splice(recipeIndex, 1);
  return true;
};
