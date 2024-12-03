import { Trophy, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TopRider {
  rank: number;
  name: string;
  points: number;
  imageUrl?: string;
  nationality: string;
}

const mockTopRiders: TopRider[] = [
  { rank: 1, name: "Marc Marquez", points: 245, nationality: "ESP" },
  { rank: 2, name: "Fabio Quartararo", points: 230, nationality: "FRA" },
  { rank: 3, name: "Francesco Bagnaia", points: 214, nationality: "ITA" },
  { rank: 4, name: "Johann Zarco", points: 187, nationality: "FRA" },
  { rank: 5, name: "Jack Miller", points: 181, nationality: "AUS" },
  { rank: 6, name: "Brad Binder", points: 178, nationality: "RSA" },
  { rank: 7, name: "Aleix Espargaro", points: 165, nationality: "ESP" },
  { rank: 8, name: "Alex Rins", points: 157, nationality: "ESP" },
  { rank: 9, name: "Joan Mir", points: 145, nationality: "ESP" },
  { rank: 10, name: "Miguel Oliveira", points: 138, nationality: "POR" },
];

const TopRiders = () => {
  // Generate initials for placeholder
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  // Generate a consistent color based on name
  const generateColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = Math.floor(Math.abs(Math.sin(hash) * 16777215));
    return '#' + color.toString(16).padStart(6, '0');
  };

  return (
    <div className="glass-card p-4 md:p-6 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Trophy className="text-accent-primary" size={24} />
          <h2 className="text-xl md:text-2xl font-bold text-white">Top 10 Riders</h2>
        </div>
        <Link 
          to="/riders"
          className="text-accent-primary hover:text-accent-secondary flex items-center gap-1"
        >
          View All
          <ChevronRight size={20} />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-dark-100">
              <th className="pb-4 text-gray-400 font-medium">RANK</th>
              <th className="pb-4 text-gray-400 font-medium">PLAYER</th>
              <th className="pb-4 text-gray-400 font-medium hidden md:table-cell">NATION</th>
              <th className="pb-4 text-gray-400 font-medium text-right">POINTS</th>
            </tr>
          </thead>
          <tbody>
            {mockTopRiders.map((rider) => (
              <tr key={rider.rank} className="border-b border-dark-100 last:border-0">
                <td className="py-4 font-bold text-accent-primary">#{rider.rank}</td>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    {rider.imageUrl ? (
                      <img
                        src={rider.imageUrl}
                        alt={rider.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{ backgroundColor: generateColor(rider.name) + '40' }}
                      >
                        {getInitials(rider.name)}
                      </div>
                    )}
                    <div>
                      <span className="font-bold text-white block">{rider.name}</span>
                      <span className="text-sm text-gray-400 md:hidden">{rider.nationality}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://flagcdn.com/w40/${rider.nationality.toLowerCase()}.png`}
                      alt={rider.nationality}
                      className="w-6 h-4 object-cover"
                    />
                    <span className="text-white">{rider.nationality}</span>
                  </div>
                </td>
                <td className="py-4 text-right font-bold text-white">
                  {rider.points.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopRiders;