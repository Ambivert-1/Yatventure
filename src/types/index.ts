export type UserRole = 'traveler' | 'creator' | 'host'
export type PostType = 'post' | 'itinerary' | 'tip'
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'

export interface User {
  id: string
  name: string
  email: string
  avatar_url?: string
  bio?: string
  role: UserRole
  created_at: string
}

export interface Destination {
  id: string
  name: string
  district?: string
  cover_image_url?: string
  lat?: number
  lng?: number
  featured: boolean
}

export interface Post {
  id: string
  user_id: string
  destination_id?: string
  title: string
  body?: string
  cover_image_url?: string
  type: PostType
  tags?: string[]
  likes_count: number
  created_at: string
  user?: User
  destination?: Destination
}

export interface TransportListing {
  id: string
  host_id: string
  type: string
  origin: string
  destination: string
  departure_time: string
  total_seats: number
  available_seats: number
  price_per_seat: number
  host?: User
}

export interface Stay {
  id: string
  host_id: string
  destination_id: string
  name: string
  images?: string[]
  price_per_night: number
  amenities?: string[]
  avg_rating?: number
}