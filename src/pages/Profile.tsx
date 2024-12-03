import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Settings, Trophy, Calendar } from 'lucide-react';

interface UserProfile {
  email: string;
  name: string;
  team?: string;
  nationality?: string;
  points: number;
  eventsParticipated: number;
}

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    email: user?.email || '',
    name: '',
    points: 0,
    eventsParticipated: 0
  });

  useEffect(() => {
    // In a real app, this would fetch from an API
    const savedProfile = localStorage.getItem(`profile_${user?.email}`);
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, [user]);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(`profile_${user?.email}`, JSON.stringify(profile));
    alert('Profile updated successfully!');
  };

  return (
    <div className="container-section">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gradient">Rider Profile</h1>
          <button className="btn-primary">
            <Settings className="w-5 h-5 mr-2" />
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-300">Points</h3>
              <Trophy className="text-accent-primary" />
            </div>
            <p className="text-3xl font-bold text-white">{profile.points}</p>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-300">Events</h3>
              <Calendar className="text-accent-primary" />
            </div>
            <p className="text-3xl font-bold text-white">{profile.eventsParticipated}</p>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-300">Rank</h3>
              <User className="text-accent-primary" />
            </div>
            <p className="text-3xl font-bold text-white">#123</p>
          </div>
        </div>

        <div className="glass-card p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="w-full bg-dark-300 border border-dark-100 rounded-lg py-3 px-4 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full bg-dark-300 border border-dark-100 rounded-lg py-3 px-4 text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Team
                </label>
                <input
                  type="text"
                  value={profile.team || ''}
                  onChange={(e) => setProfile({...profile, team: e.target.value})}
                  className="w-full bg-dark-300 border border-dark-100 rounded-lg py-3 px-4 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nationality
                </label>
                <input
                  type="text"
                  value={profile.nationality || ''}
                  onChange={(e) => setProfile({...profile, nationality: e.target.value})}
                  className="w-full bg-dark-300 border border-dark-100 rounded-lg py-3 px-4 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;