import { useState, useEffect } from 'react';
import { Event } from '../types';
import { Calendar, MapPin, Trophy, Clock } from 'lucide-react';

const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Barcelona Grand Prix',
    circuit: 'Circuit de Barcelona-Catalunya',
    date: '2024-04-15',
    country: 'Spain',
    status: 'upcoming'
  },
  {
    id: '2',
    name: 'British Championship',
    circuit: 'Silverstone Circuit',
    date: '2024-05-01',
    country: 'United Kingdom',
    status: 'upcoming'
  },
  {
    id: '3',
    name: 'Italian Series',
    circuit: 'Mugello Circuit',
    date: '2024-03-10',
    country: 'Italy',
    status: 'completed',
    winner: 'Team Red Racing'
  }
];

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    setEvents(mockEvents);
  }, []);

  return (
    <div className="container-section">
      <h1 className="text-4xl font-bold mb-8 text-gradient">Racing Calendar</h1>
      
      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="glass-card rounded-xl p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">{event.name}</h2>
                <div className="space-y-2 text-gray-300">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-accent-primary" />
                    <span>{event.circuit}, {event.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-accent-primary" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {event.status === 'completed' ? (
                  <div className="flex items-center gap-2 text-accent-primary">
                    <Trophy size={20} />
                    <span className="font-bold">{event.winner}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-accent-secondary">
                    <Clock size={20} />
                    <span className="font-bold">Upcoming</span>
                  </div>
                )}
                
                <button className="btn-primary">
                  {event.status === 'completed' ? 'View Results' : 'Register'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;