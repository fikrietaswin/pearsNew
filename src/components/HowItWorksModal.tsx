import { X, Trophy, Star, Award, Flag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowItWorksModal = ({ isOpen, onClose }: HowItWorksModalProps) => {
  const scoringSystem = [
    { position: 1, points: 25, description: 'Winner' },
    { position: 2, points: 20, description: 'Runner-up' },
    { position: 3, points: 16, description: 'Third Place' },
    { position: 4, points: 13, description: 'Fourth Place' },
    { position: 5, points: 11, description: 'Fifth Place' }
  ];

  const bonusPoints = [
    { type: 'Fastest Lap', points: 2 },
    { type: 'Pole Position', points: 1 },
    { type: 'Perfect Weekend', points: 5 }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl rounded-xl bg-dark-300 shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-dark-100 p-6">
              <h2 className="text-2xl font-bold text-white">How Rankings Work</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Introduction */}
              <div>
                <h3 className="flex items-center text-xl font-bold text-accent-primary mb-3">
                  <Trophy className="mr-2" />
                  Ranking System
                </h3>
                <p className="text-gray-300">
                  The PEARS ranking system is designed to reward consistent performance and excellence 
                  in pushbike racing. Points are accumulated throughout the season from various events 
                  and special achievements.
                </p>
              </div>

              {/* Race Points */}
              <div>
                <h3 className="flex items-center text-xl font-bold text-accent-primary mb-3">
                  <Flag className="mr-2" />
                  Race Points
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {scoringSystem.map(({ position, points, description }) => (
                    <div
                      key={position}
                      className="glass-card p-4 text-center rounded-lg"
                    >
                      <div className="text-2xl font-bold text-white mb-1">
                        {points} pts
                      </div>
                      <div className="text-sm text-gray-400">
                        {description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bonus Points */}
              <div>
                <h3 className="flex items-center text-xl font-bold text-accent-primary mb-3">
                  <Star className="mr-2" />
                  Bonus Points
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {bonusPoints.map(({ type, points }) => (
                    <div
                      key={type}
                      className="glass-card p-4 text-center rounded-lg"
                    >
                      <div className="text-lg font-bold text-white mb-1">
                        +{points} pts
                      </div>
                      <div className="text-sm text-gray-400">
                        {type}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Rules */}
              <div>
                <h3 className="flex items-center text-xl font-bold text-accent-primary mb-3">
                  <Award className="mr-2" />
                  Additional Rules
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Points are awarded only to riders who complete the race</li>
                  <li>Ties are broken by number of wins, then number of second places, etc.</li>
                  <li>Bonus points can be accumulated in addition to race points</li>
                  <li>Points are tracked separately for each racing category</li>
                  <li>Season champions receive additional bonus points in the following season</li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-dark-100 p-6">
              <button
                onClick={onClose}
                className="w-full btn-primary"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default HowItWorksModal;