import { Rider } from '../types';
import { Trophy, User } from 'lucide-react';

interface RiderCardProps {
  rider: Rider;
}

const RiderCard = ({ rider }: RiderCardProps) => {
  // Generate initials for placeholder
  const initials = rider.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();

  // Generate a consistent color based on name
  const generateColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = Math.floor(Math.abs(Math.sin(hash) * 16777215));
    return '#' + color.toString(16).padStart(6, '0');
  };

  const placeholderColor = generateColor(rider.name);

  return (
    <div className="glass-card rounded-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-square bg-gradient-to-br from-dark-200 to-dark-300 relative">
        {rider.imageUrl ? (
          <img
            src={rider.imageUrl}
            alt={rider.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div 
            className="w-full h-full flex flex-col items-center justify-center"
            style={{ backgroundColor: placeholderColor + '20' }} // Adding transparency
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-full blur-sm" style={{ backgroundColor: placeholderColor }}></div>
              <div className="relative w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold" style={{ backgroundColor: placeholderColor }}>
                {initials}
              </div>
            </div>
            <span className="mt-4 text-4xl font-bold text-white/80">#{rider.number}</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-dark-300/80 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-white">#{rider.number}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-white mb-2">{rider.name}</h3>
        <div className="space-y-2 text-sm text-gray-300">
          <p className="flex items-center gap-2">
            <User size={14} className="text-accent-primary" />
            <span>{rider.team}</span>
          </p>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <img
                src={`https://flagcdn.com/w40/${rider.nationality.toLowerCase()}.png`}
                alt={rider.nationality}
                className="w-4 h-3 object-cover"
              />
              {rider.nationality}
            </span>
            <span className="flex items-center gap-1 text-accent-primary">
              <Trophy size={14} />
              {rider.points.toLocaleString()} pts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderCard;