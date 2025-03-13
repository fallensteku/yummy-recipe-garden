
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/user';
import { getUserById, users } from '../data/users';
import { toast } from 'sonner';

interface UserContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        const user = getUserById(userData.id);
        if (user) {
          setCurrentUser(user);
        }
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, you would validate credentials against a backend
    // For this mock version, we'll just check if the email exists
    const user = users.find(u => u.email === email);
    
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      toast.success('Logged in successfully');
      return true;
    }
    
    toast.error('Invalid credentials');
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    toast.success('Logged out');
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    // Check if the email or username is already in use
    if (users.some(u => u.email === email)) {
      toast.error('Email already in use');
      return false;
    }

    if (users.some(u => u.username === username)) {
      toast.error('Username already taken');
      return false;
    }

    // Create a new user
    const newUser: User = {
      id: `u${users.length + 1}`,
      username,
      email,
      displayName: username,
      joinedAt: new Date().toISOString(),
      role: 'user',
      friends: [],
      recipes: []
    };

    users.push(newUser);
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    toast.success('Account created successfully');
    return true;
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!currentUser) return false;

    const updatedUser = { ...currentUser, ...updates };
    
    // Update in the mock database
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully');
      return true;
    }
    
    toast.error('Failed to update profile');
    return false;
  };

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      isLoading, 
      login, 
      logout, 
      register,
      updateProfile
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
