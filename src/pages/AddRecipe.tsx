
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { addRecipe } from '../data/recipes';
import { toast } from 'sonner';
import { ChevronLeft, Plus, Trash2 } from 'lucide-react';

const AddRecipe = () => {
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    category: '',
    cookTime: 0,
    prepTime: 0,
    difficulty: 'Easy' as 'Easy' | 'Medium' | 'Hard',
    servings: 2,
    ingredients: [''],
    instructions: ['']
  });

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData(prev => ({ ...prev, ingredients: newIngredients }));
  };

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = value;
    setFormData(prev => ({ ...prev, instructions: newInstructions }));
  };

  const addIngredient = () => {
    setFormData(prev => ({ ...prev, ingredients: [...prev.ingredients, ''] }));
  };

  const removeIngredient = (index: number) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = [...formData.ingredients];
      newIngredients.splice(index, 1);
      setFormData(prev => ({ ...prev, ingredients: newIngredients }));
    }
  };

  const addInstruction = () => {
    setFormData(prev => ({ ...prev, instructions: [...prev.instructions, ''] }));
  };

  const removeInstruction = (index: number) => {
    if (formData.instructions.length > 1) {
      const newInstructions = [...formData.instructions];
      newInstructions.splice(index, 1);
      setFormData(prev => ({ ...prev, instructions: newInstructions }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title.trim()) {
      toast.error('Please enter a recipe title');
      return;
    }
    
    if (!formData.category.trim()) {
      toast.error('Please select a category');
      return;
    }
    
    // Filter out empty ingredients and instructions
    const ingredients = formData.ingredients.filter(ingredient => ingredient.trim() !== '');
    const instructions = formData.instructions.filter(instruction => instruction.trim() !== '');
    
    if (ingredients.length === 0) {
      toast.error('Please add at least one ingredient');
      return;
    }
    
    if (instructions.length === 0) {
      toast.error('Please add at least one instruction');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Add the recipe to the mock database
      const newRecipe = addRecipe({
        ...formData,
        ingredients,
        instructions,
        authorId: currentUser.id,
        createdAt: new Date().toISOString()
      });
      
      // Update the user's recipes array
      currentUser.recipes.push(newRecipe.id);
      
      toast.success('Recipe added successfully!');
      navigate(`/recipe/${newRecipe.id}`);
    } catch (error) {
      toast.error('Failed to add recipe');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Add New Recipe</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Recipe Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter recipe title"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Briefly describe your recipe"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Main Course">Main Course</SelectItem>
                    <SelectItem value="Breakfast">Breakfast</SelectItem>
                    <SelectItem value="Dessert">Dessert</SelectItem>
                    <SelectItem value="Soup">Soup</SelectItem>
                    <SelectItem value="Salad">Salad</SelectItem>
                    <SelectItem value="Appetizer">Appetizer</SelectItem>
                    <SelectItem value="Side Dish">Side Dish</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="prepTime">Prep Time (minutes)</Label>
                  <Input
                    id="prepTime"
                    name="prepTime"
                    type="number"
                    min="0"
                    value={formData.prepTime}
                    onChange={handleNumberChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="cookTime">Cook Time (minutes)</Label>
                  <Input
                    id="cookTime"
                    name="cookTime"
                    type="number"
                    min="0"
                    value={formData.cookTime}
                    onChange={handleNumberChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) => handleSelectChange('difficulty', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="servings">Servings</Label>
                  <Input
                    id="servings"
                    name="servings"
                    type="number"
                    min="1"
                    value={formData.servings}
                    onChange={handleNumberChange}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Ingredients</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addIngredient}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Ingredient
                  </Button>
                </div>
                
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <Input
                      value={ingredient}
                      onChange={(e) => handleIngredientChange(index, e.target.value)}
                      placeholder={`Ingredient ${index + 1}`}
                    />
                    {formData.ingredients.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeIngredient(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Instructions</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addInstruction}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Step
                  </Button>
                </div>
                
                {formData.instructions.map((instruction, index) => (
                  <div key={index} className="flex items-start gap-2 mb-3">
                    <div className="flex-none pt-2">
                      <div className="bg-herb-100 w-6 h-6 rounded-full flex items-center justify-center font-medium text-sm">
                        {index + 1}
                      </div>
                    </div>
                    <Textarea
                      value={instruction}
                      onChange={(e) => handleInstructionChange(index, e.target.value)}
                      placeholder={`Step ${index + 1}`}
                      className="flex-1"
                    />
                    {formData.instructions.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeInstruction(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating Recipe...' : 'Create Recipe'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
