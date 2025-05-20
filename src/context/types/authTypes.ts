
// Define types for authentication
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'seller' | 'admin';
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

// Mock users for development
export const MOCK_USER: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  role: 'customer'
};

export const MOCK_SELLER: User = {
  id: 2,
  name: 'Jane Seller',
  email: 'jane@example.com',
  role: 'seller'
};

export const MOCK_ADMIN: User = {
  id: 3,
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin'
};
