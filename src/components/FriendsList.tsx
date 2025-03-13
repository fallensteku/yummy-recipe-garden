
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/user';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { users, addFriendRequest } from '../data/users';
import { useUser } from '../contexts/UserContext';
import { Search, UserPlus, UserCheck } from 'lucide-react';
import { toast } from 'sonner';

interface FriendsListProps {
  friends: User[];
}

const FriendsList = ({ friends }: FriendsListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const { currentUser } = useUser();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchTerm.trim() || !currentUser) return;
    
    // Filter out the current user and existing friends
    const results = users.filter(user => 
      user.id !== currentUser.id && 
      !currentUser.friends.includes(user.id) &&
      (user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
       user.displayName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    setSearchResults(results);
  };

  const handleAddFriend = (userId: string) => {
    if (!currentUser) return;
    
    addFriendRequest(currentUser.id, userId);
    toast.success('Friend request sent!');
    
    // Remove the user from search results
    setSearchResults(prev => prev.filter(user => user.id !== userId));
  };

  const viewProfile = (username: string) => {
    navigate(`/profile/${username}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button onClick={handleSearch}>Search</Button>
      </div>
      
      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">Search Results</h3>
          {searchResults.map(user => (
            <div key={user.id} className="flex items-center justify-between border p-4 rounded-md">
              <div className="flex items-center space-x-4 cursor-pointer" onClick={() => viewProfile(user.username)}>
                <Avatar>
                  <AvatarImage src={user.avatarUrl} />
                  <AvatarFallback>{user.displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.displayName}</p>
                  <p className="text-sm text-muted-foreground">@{user.username}</p>
                </div>
              </div>
              <Button 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddFriend(user.id);
                }}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Friend
              </Button>
            </div>
          ))}
        </div>
      )}
      
      <div className="space-y-4">
        <h3 className="font-medium">Your Friends ({friends.length})</h3>
        {friends.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">You don't have any friends yet.</p>
            <p className="text-sm mt-2">Search for users to add friends.</p>
          </div>
        ) : (
          friends.map(friend => (
            <div 
              key={friend.id} 
              className="flex items-center justify-between border p-4 rounded-md cursor-pointer"
              onClick={() => viewProfile(friend.username)}
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={friend.avatarUrl} />
                  <AvatarFallback>{friend.displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{friend.displayName}</p>
                  <p className="text-sm text-muted-foreground">@{friend.username}</p>
                </div>
              </div>
              <UserCheck className="h-5 w-5 text-herb-500" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FriendsList;
