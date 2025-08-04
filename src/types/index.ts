export interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  options?: string[];
  questionId?: string;
}

export interface UserResponse {
  noteFamily: string;
  vibe: string;
  timing: string;
  intensity: string;
  brand?: string;
}

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  description: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  price: string;
  image: string;
  tags: string[];
  matchReason: string;
}

export type ConversationState = 
  | 'greeting' 
  | 'choice' 
  | 'occasion' 
  | 'noteFamily' 
  | 'vibe'
  | 'timing'
  | 'intensity'
  | 'priceRange' 
  | 'brand' 
  | 'processing' 
  | 'results' 
  | 'freeText';