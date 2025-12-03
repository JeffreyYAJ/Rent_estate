export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  type: 'house' | 'room' | 'studio';
  location: string;
  price: number;
  images: string[];
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  ownerId: string;
  ownerName: string;
  ownerAvatar?: string;
  isFavorite?: boolean;
}

export interface Message {
  id: string;
  listingId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  listingId: string;
  listingTitle: string;
  listingImage: string;
  otherUserId: string;
  otherUserName: string;
  otherUserAvatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}
