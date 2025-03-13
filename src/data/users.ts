
import { User, FriendRequest } from '../types/user';

// Mock database of users
export const users: User[] = [
  {
    id: "u1",
    username: "johndoe",
    email: "john@example.com",
    displayName: "John Doe",
    bio: "I love cooking Italian cuisine!",
    avatarUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    joinedAt: "2023-01-15T00:00:00Z",
    role: "user",
    friends: ["u2"],
    recipes: ["1", "3"]
  },
  {
    id: "u2",
    username: "janedoe",
    email: "jane@example.com",
    displayName: "Jane Smith",
    bio: "Pastry chef and food photographer",
    avatarUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    joinedAt: "2023-02-20T00:00:00Z",
    role: "user",
    friends: ["u1"],
    recipes: ["2"]
  },
  {
    id: "u3",
    username: "chefmike",
    email: "mike@example.com",
    displayName: "Chef Mike",
    bio: "Professional chef with 10 years of experience",
    avatarUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    joinedAt: "2023-03-10T00:00:00Z",
    role: "user",
    friends: [],
    recipes: ["4", "5"]
  }
];

// Mock database of friend requests
export const friendRequests: FriendRequest[] = [
  {
    id: "fr1",
    senderId: "u1",
    receiverId: "u3",
    status: "pending",
    createdAt: "2023-05-15T00:00:00Z"
  }
];

// Helper functions
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getUserByUsername = (username: string): User | undefined => {
  return users.find(user => user.username === username);
};

export const getPendingFriendRequests = (userId: string): FriendRequest[] => {
  return friendRequests.filter(
    request => request.receiverId === userId && request.status === "pending"
  );
};

export const getFriends = (userId: string): User[] => {
  const user = getUserById(userId);
  if (!user) return [];
  
  return user.friends.map(friendId => getUserById(friendId)).filter(Boolean) as User[];
};

export const addFriendRequest = (senderId: string, receiverId: string): FriendRequest => {
  // Check if there's already a pending request
  const existingRequest = friendRequests.find(
    request => 
      request.senderId === senderId && 
      request.receiverId === receiverId &&
      request.status === "pending"
  );
  
  if (existingRequest) return existingRequest;
  
  const newRequest: FriendRequest = {
    id: `fr${friendRequests.length + 1}`,
    senderId,
    receiverId,
    status: "pending",
    createdAt: new Date().toISOString()
  };
  
  friendRequests.push(newRequest);
  return newRequest;
};

export const acceptFriendRequest = (requestId: string): boolean => {
  const requestIndex = friendRequests.findIndex(request => request.id === requestId);
  if (requestIndex === -1) return false;
  
  const request = friendRequests[requestIndex];
  request.status = "accepted";
  
  // Add each user to the other's friends list
  const sender = getUserById(request.senderId);
  const receiver = getUserById(request.receiverId);
  
  if (sender && receiver) {
    if (!sender.friends.includes(receiver.id)) {
      sender.friends.push(receiver.id);
    }
    
    if (!receiver.friends.includes(sender.id)) {
      receiver.friends.push(sender.id);
    }
    
    return true;
  }
  
  return false;
};

export const rejectFriendRequest = (requestId: string): boolean => {
  const requestIndex = friendRequests.findIndex(request => request.id === requestId);
  if (requestIndex === -1) return false;
  
  friendRequests[requestIndex].status = "rejected";
  return true;
};
