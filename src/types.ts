export interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  kcBalance: number;
  role: 'farmer' | 'supporter';
  avatarUrl?: string;
}

export interface Farm {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  practices: ('vedic' | 'yogic' | 'electroculture')[];
  location: string;
  profileImageUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  farmId: string;
  priceKC: number;
  priceFiat: number;
  category: string;
  imageUrl?: string;
  stock: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  providerId: string;
  type: 'rental' | 'help' | 'other';
  rateKC: number;
  status: 'available' | 'unavailable';
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  tags: string[];
}

export interface Donation {
  id: string;
  donorId?: string;
  amountFiat: number;
  amountKC: number;
  note?: string;
  category: 'R&D' | 'Planet';
  timestamp: string;
}
