
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getUserRecipes } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';
import { getFriends, getPendingFriendRequests, acceptFriendRequest, rejectFriendRequest } from '../data/users';
import FriendsList from '../components/FriendsList';
import { Loader2 } from 'lucide-react';

const Profile = () => {
  const { currentUser, isLoading: isUserLoading, updateProfile, logout } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    avatarUrl: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoading && !currentUser) {
      navigate('/login');
    }
    
    if (currentUser) {
      setFormData({
        displayName: currentUser.displayName || '',
        bio: currentUser.bio || '',
        avatarUrl: currentUser.avatarUrl || ''
      });
    }
  }, [currentUser, isUserLoading, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    setIsSubmitting(true);
    try {
      const success = await updateProfile(formData);
      if (success) {
        setIsEditing(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-76px)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  const userRecipes = getUserRecipes(currentUser.id);
  const friends = getFriends(currentUser.id);
  const pendingRequests = getPendingFriendRequests(currentUser.id);

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-herb-300 h-32 relative">
            <div className="absolute bottom-0 left-8 transform translate-y-1/2">
              <Avatar className="h-24 w-24 border-4 border-white">
                <AvatarImage src={currentUser.avatarUrl} />
                <AvatarFallback>{currentUser.displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          
          <div className="pt-16 px-8 pb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold">{currentUser.displayName}</h1>
                <p className="text-muted-foreground">@{currentUser.username}</p>
              </div>
              <div className="space-x-2">
                {isEditing ? (
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                ) : (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
            
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input 
                    id="displayName" 
                    name="displayName" 
                    value={formData.displayName} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    name="bio" 
                    value={formData.bio || ''} 
                    onChange={handleInputChange} 
                    placeholder="Tell us about yourself..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="avatarUrl">Avatar URL</Label>
                  <Input 
                    id="avatarUrl" 
                    name="avatarUrl" 
                    value={formData.avatarUrl || ''} 
                    onChange={handleInputChange} 
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
                
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            ) : (
              <p className="mb-6">{currentUser.bio || 'No bio yet'}</p>
            )}
            
            <Tabs defaultValue="recipes" className="mt-6">
              <TabsList className="mb-4">
                <TabsTrigger value="recipes">Recipes</TabsTrigger>
                <TabsTrigger value="friends">Friends</TabsTrigger>
                <TabsTrigger value="requests">
                  Friend Requests 
                  {pendingRequests.length > 0 && (
                    <span className="ml-2 bg-primary text-white text-xs rounded-full px-2 py-1">
                      {pendingRequests.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="recipes" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">My Recipes</h2>
                  <Button onClick={() => navigate('/add-recipe')}>Add Recipe</Button>
                </div>
                {userRecipes.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">You haven't created any recipes yet.</p>
                    <Button className="mt-4" onClick={() => navigate('/add-recipe')}>
                      Create Your First Recipe
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userRecipes.map(recipe => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="friends">
                <FriendsList friends={friends} />
              </TabsContent>
              
              <TabsContent value="requests">
                {pendingRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">You don't have any pending friend requests.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingRequests.map((request) => {
                      const sender = request.senderId ? getFriends(request.senderId)[0] : null;
                      if (!sender) return null;
                      
                      return (
                        <div key={request.id} className="flex items-center justify-between border p-4 rounded-md">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage src={sender.avatarUrl} />
                              <AvatarFallback>{sender.displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{sender.displayName}</p>
                              <p className="text-sm text-muted-foreground">@{sender.username}</p>
                            </div>
                          </div>
                          <div className="space-x-2">
                            <Button 
                              variant="outline" 
                              onClick={() => rejectFriendRequest(request.id)}
                            >
                              Decline
                            </Button>
                            <Button 
                              onClick={() => acceptFriendRequest(request.id)}
                            >
                              Accept
                            </Button>
                          </div>
                        </div>
                      );
                    })}
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

export default Profile;
