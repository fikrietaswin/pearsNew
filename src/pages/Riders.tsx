import { Sun, Droplets, ThermometerIcon, HelpCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Rider } from '../types';
import RiderCard from '../components/RiderCard';
import HowItWorksModal from '../components/HowItWorksModal';

const mockRiders: Rider[] = [
  {
    id: '1',
    name: 'Marc Marquez',
    number: 93,
    team: 'GRESINI RACING MOTOGP',
    nationality: 'ESP',
    points: 985222,
  },
  {
    id: '2',
    name: 'Fabio Quartararo',
    number: 20,
    team: 'MONSTER ENERGY YAMAHA MOTOGP',
    nationality: 'FRA',
    points: 931660,
  },
  {
    id: '3',
    name: 'Francesco Bagnaia',
    number: 63,
    team: 'DUCATI LENOVO TEAM',
    nationality: 'ITA',
    points: 887573,
  },
  {
    id: '4',
    name: 'Johann Zarco',
    number: 5,
    team: 'PRAMAC RACING',
    nationality: 'FRA',
    points: 866146,
  }
];

const categories = [
  { id: 'combined', label: 'COMBINED', active: true },
  { id: 'men', label: 'MEN', active: false },
  { id: 'women', label: 'WOMEN', active: false },
  { id: 'u23-men', label: 'U23 MEN', active: false },
  { id: 'u23-women', label: 'U23 WOMEN', active: false },
  { id: 'u18-men', label: 'U18 MEN', active: false },
  { id: 'u18-women', label: 'U18 WOMEN', active: false },
];

const Riders = () => {
  const [riders, setRiders] = useState<Rider[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('combined');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  useEffect(() => {
    setRiders(mockRiders);
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="container-section">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">INDIVIDUAL WORLD RANKING</h1>
          <p className="text-gray-400 mt-2">Updated on {currentDate}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => setIsHowItWorksOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-dark-300 text-accent-primary hover:text-accent-secondary transition-colors rounded-lg"
          >
            <HelpCircle size={20} />
            <span>How It Works</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'list'
                ? 'bg-accent-primary text-white'
                : 'bg-dark-300 text-gray-400 hover:text-white'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-accent-primary text-white'
                : 'bg-dark-300 text-gray-400 hover:text-white'
            }`}
          >
            Grid View
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-4 md:gap-8 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`text-base md:text-lg font-bold whitespace-nowrap pb-2 border-b-2 transition-colors ${
              category.id === selectedCategory
                ? 'text-white border-accent-primary'
                : 'text-gray-400 border-transparent hover:text-gray-300'
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {viewMode === 'grid' ? (
        // Grid View
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {riders.map((rider) => (
            <RiderCard key={rider.id} rider={rider} />
          ))}
        </div>
      ) : (
        // List View
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="min-w-full overflow-x-auto">
            <div className="grid grid-cols-[80px_minmax(200px,1fr)_200px_200px] md:grid-cols-[80px_minmax(300px,1fr)_300px_200px] gap-4 p-4 border-b border-dark-100 text-gray-400">
              <div>RANK</div>
              <div>PLAYER</div>
              <div className="hidden md:block">NATIONALITY</div>
              <div className="text-right">POINTS</div>
            </div>

            {riders.map((rider, index) => (
              <div
                key={rider.id}
                className="grid grid-cols-[80px_minmax(200px,1fr)_200px_200px] md:grid-cols-[80px_minmax(300px,1fr)_300px_200px] gap-4 p-4 border-b border-dark-100 hover:bg-dark-300/50 transition-colors items-center"
              >
                <div className="font-bold text-white text-lg">#{index + 1}</div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-dark-200 to-dark-300 flex items-center justify-center overflow-hidden">
                    {rider.imageUrl ? (
                      <img
                        src={rider.imageUrl}
                        alt={rider.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-bold text-white">
                        {rider.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="font-bold text-white block">{rider.name}</span>
                    <span className="text-sm text-gray-400 md:hidden">{rider.nationality}</span>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <img
                    src={`https://flagcdn.com/w40/${rider.nationality.toLowerCase()}.png`}
                    alt={rider.nationality}
                    className="w-6 h-4 object-cover"
                  />
                  <span className="text-white">{rider.nationality}</span>
                </div>
                <div className="text-right font-bold text-white">
                  {rider.points.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />
    </div>
  );
};

export default Riders;