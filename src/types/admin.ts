export interface AdminUser {
  id: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  lastLogin?: string;
}

export interface AdminRider {
  id: string;
  name: string;
  number: number;
  team: string;
  nationality: string;
  category: string;
  points: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminNationality {
  id: string;
  code: string;
  name: string;
  flag?: string;
  createdAt: string;
}

export interface AdminCategory {
  id: string;
  name: string;
  description: string;
  minAge?: number;
  maxAge?: number;
  createdAt: string;
}

export interface AdminEvent {
  id: string;
  name: string;
  circuit: string;
  date: string;
  country: string;
  category: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  maxParticipants: number;
  registeredParticipants: number;
  points: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminPoint {
  id: string;
  eventId: string;
  riderId: string;
  position: number;
  points: number;
  bonusPoints: number;
  createdAt: string;
}

export interface AdminSearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface AdminTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}