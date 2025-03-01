// types/types.ts

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  schoolName: string;
  standard: string;
  status?: string;
}


export interface Question {
  id: number;
  text: string;
  type: 'multiple-choice' | 'numerical'|'radio' | 'checkbox' | 'textarea' | 'text' | 'number';
  options?: string[];
  required?: boolean;
}



export interface QuestionResponse {
  questionId: number;
  answer: string | number | string[];
}

export type UserStatus = 'pending' | 'test_done' | 'report_generated' | 'formatting_done' | 'sent';

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id' | 'status'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  refreshUser: () => Promise<boolean>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  token: string | null;
}


