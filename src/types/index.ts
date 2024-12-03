export interface Rider {
  id: string;
  name: string;
  number: number;
  team: string;
  nationality: string;
  points: number;
  imageUrl?: string;
}

export interface Event {
  id: string;
  name: string;
  circuit: string;
  date: string;
  country: string;
  status: 'upcoming' | 'completed';
  winner?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  imageUrl?: string;
}