
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserByUsername, addFriendRequest } from '../data/users';
import { getUserRecipes } from '../data/recipes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecipeCard from '../components/RecipeCard';
import { useUser } from '../contexts/UserContext';
import { UserPlus, UserCheck } from 'lucide-react';
import { toast } from 'sonner';

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState(getUserByUsername(username || ''));
  const { currentUser } = useUser();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (username) {
      const profileUser = getUserByUsername(username);
      setUser(profileUser);
      
      if (!profileUser) {
        navigate('/not-found');
      }
      
      // If viewing your own profile, redirect to the profile page
      if (profileUser && currentUser && profileUser.id === currentUser.id) {
        navigate('/profile');
      }
    }
  }, [username, currentUser, navigate]);
  
  if (!user) return null;
  
  const userRecipes = getUserRecipes(user.id);
  const isFriend = currentUser?.friends.includes(user.id);
  
  const handleAddFriend = () => {
    if (!currentUser) {
      toast.error('You need to be logged in to add friends');
      navigate('/login');
      return;
    }
    
    addFriendRequest(currentUser.id, user.id);
    toast.success('Friend request sent!');
  };
  
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-herb-300 h-32 relative">
            <div className="absolute bottom-0 left-8 transform translate-y-1/2">
              <Avatar className="h-24 w-24 border-4 border-white">
                <AvatarImage src={user.avatarUrl} />
                <AvatarFallback>{user.displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          
          <div className="pt-16 px-8 pb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold">{user.displayName}</h1>
                <p className="text-muted-foreground">@{user.username}</p>
              </div>
              {currentUser && !isFriend && (
                <Button onClick={handleAddFriend}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Friend
                </Button>
              )}
              {currentUser && isFriend && (
                <Button variant="outline" disabled>
                  <UserCheck className="h-4 w-4 mr-2" />
                  Friends
                </Button>
              )}
            </div>
            
            <p className="mb-6">{user.bio || 'No bio yet'}</p>
            
            <Tabs defaultValue="recipes" className="mt-6">
              <TabsList className="mb-4">
                <TabsTrigger value="recipes">Recipes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recipes">
                <h2 className="text-lg font-semibold mb-4">{user.displayName}'s Recipes</h2>
                {userRecipes.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">This user hasn't created any recipes yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userRecipes.map(recipe => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
