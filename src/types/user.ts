
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  joinedAt: string;
  role: UserRole;
  friends: string[]; // Array of user IDs
  recipes: string[]; // Array of recipe IDs created by this user
}

export interface FriendRequest {
  id: string;
  senderId: string;
  receiverId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}
