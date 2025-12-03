import { Listing } from '../types';

export const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Appartement moderne avec vue sur la ville',
    description: 'Magnifique studio lumineux au coeur de la ville avec une vue imprenable. Idéal pour voyageurs d\'affaires ou couples.',
    type: 'studio',
    location: 'Paris, France',
    price: 89,
    images: [
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Cuisine', 'Climatisation', 'TV'],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    ownerId: '2',
    ownerName: 'Marie Dubois',
    ownerAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '2',
    title: 'Villa luxueuse avec piscine',
    description: 'Superbe villa de 4 chambres avec piscine privée et jardin tropical. Parfait pour des vacances en famille.',
    type: 'house',
    location: 'Nice, France',
    price: 299,
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Piscine', 'Jardin', 'Parking', 'BBQ', 'Climatisation'],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    ownerId: '3',
    ownerName: 'Pierre Martin',
    ownerAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '3',
    title: 'Chambre cosy dans maison partagée',
    description: 'Chambre confortable dans une maison chaleureuse. Parfait pour les étudiants ou voyageurs solo.',
    type: 'room',
    location: 'Lyon, France',
    price: 45,
    images: [
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1049302/pexels-photo-1049302.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Cuisine partagée', 'Buanderie'],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 1,
    ownerId: '4',
    ownerName: 'Sophie Laurent',
    ownerAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '4',
    title: 'Loft industriel design',
    description: 'Magnifique loft avec hauts plafonds et décoration industrielle moderne. Espace ouvert lumineux.',
    type: 'studio',
    location: 'Marseille, France',
    price: 125,
    images: [
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Cuisine équipée', 'Parking', 'Climatisation'],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 3,
    ownerId: '2',
    ownerName: 'Marie Dubois',
    ownerAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '5',
    title: 'Maison de campagne authentique',
    description: 'Charmante maison en pierre avec jardin et vue sur les vignobles. Calme et sérénité garantis.',
    type: 'house',
    location: 'Bordeaux, France',
    price: 180,
    images: [
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Jardin', 'Cheminée', 'BBQ', 'Parking'],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    ownerId: '3',
    ownerName: 'Pierre Martin',
    ownerAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '6',
    title: 'Chambre avec terrasse privée',
    description: 'Belle chambre avec accès à une terrasse privée. Vue dégagée et calme absolu.',
    type: 'room',
    location: 'Toulouse, France',
    price: 55,
    images: [
      'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Terrasse', 'Cuisine partagée'],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    ownerId: '4',
    ownerName: 'Sophie Laurent',
    ownerAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];
