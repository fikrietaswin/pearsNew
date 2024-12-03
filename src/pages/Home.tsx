import { Link } from 'react-router-dom';
import { ChevronRight, Trophy, Calendar, Users, ArrowRight, MessageCircle } from 'lucide-react';
import BackgroundCarousel from '../components/BackgroundCarousel';
import ScrollableSection from '../components/ScrollableSection';
import NewsCard from '../components/NewsCard';
import VideoCard from '../components/VideoCard';
import TopRiders from '../components/TopRiders';
import Advertisement from '../components/Advertisement';

const mockNews = [
  {
    id: 1,
    title: "PEARS Championship: Exciting New Season Ahead",
    image: "https://awsimages.detik.net.id/community/media/visual/2024/01/13/naresh-adhitama-pradipta-1_169.jpeg?w=600&q=90",
    date: "March 15, 2024",
    summary: "Get ready for an action-packed season with new riders and challenging circuits."
  },
  {
    id: 2,
    title: "Rising Star: Meet the New Champion",
    image: "https://awsimages.detik.net.id/community/media/visual/2022/06/17/keseruan-anak-anak-mengikuti-kompetisi-push-bike-di-karawang-5_43.jpeg?w=1200",
    date: "March 14, 2024",
    summary: "Young talent showcases exceptional skills in recent championship."
  },
  {
    id: 3,
    title: "New Safety Regulations Announced",
    image: "https://thumb.viva.co.id/media/frontend/thumbs3/2023/09/19/6509340d65098-kompetisi-push-bike-di-cirebon-diikuti-peserta-dari-luar-negerip_665_374.jpg",
    date: "March 13, 2024",
    summary: "Updated safety measures to be implemented in all upcoming events."
  },
  {
    id: 4,
    title: "International Circuit Expansion",
    image: "https://images.unsplash.com/photo-1571188654248-7a89213915f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    date: "March 12, 2024",
    summary: "PEARS announces new international venues for upcoming seasons."
  }
];

const mockVideos = [
  {
    id: 1,
    title: "Race Highlights: Barcelona Grand Prix 2024",
    thumbnail: "https://awsimages.detik.net.id/community/media/visual/2024/01/13/naresh-adhitama-pradipta-1_169.jpeg?w=600&q=90",
    duration: "10:32",
    views: "125K"
  },
  {
    id: 2,
    title: "Best Overtakes of the Season",
    thumbnail: "https://awsimages.detik.net.id/community/media/visual/2022/06/17/keseruan-anak-anak-mengikuti-kompetisi-push-bike-di-karawang-5_43.jpeg?w=1200",
    duration: "8:45",
    views: "89K"
  },
  {
    id: 3,
    title: "Rider Interview: Championship Leader",
    thumbnail: "https://thumb.viva.co.id/media/frontend/thumbs3/2023/09/19/6509340d65098-kompetisi-push-bike-di-cirebon-diikuti-peserta-dari-luar-negerip_665_374.jpg",
    duration: "15:20",
    views: "67K"
  },
  {
    id: 4,
    title: "Behind the Scenes: Team Preparation",
    thumbnail: "https://images.unsplash.com/photo-1571188654248-7a89213915f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    duration: "12:15",
    views: "45K"
  }
];

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative min-h-[600px] md:h-screen bg-dark-400 overflow-hidden">
        <BackgroundCarousel />
        
        <div className="relative h-full flex items-center">
          <div className="container-section">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to PEARS
              <br />
              <span className="text-gradient">#1 World Pushbike Ranking System</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
              Follow the world's most comprehensive pushbike ranking system.
              Stay updated with rider rankings, race results, and upcoming events.
            </p>
            <Link to="/signup" className="btn-primary inline-flex items-center">
              Sign Up Now
              <ChevronRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Top Riders Section */}
      <div className="bg-dark-400 py-20">
        <div className="container-section">
          <TopRiders />
        </div>
      </div>

      {/* Upcoming Event Section */}
      <div className="bg-dark-400 py-20">
        <div className="container-section">
          <div className="flex flex-col space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-red-500">UPCOMING EVENT</h2>
            <p className="text-lg md:text-xl text-gray-400">REGISTER YOUR RIDER IN THIS EVENT</p>
            
            <div className="mt-8 glass-card p-4 md:p-8 rounded-xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Jakarta International Speedway</h3>
                  <p className="text-gray-400 flex items-center gap-2">
                    <Calendar className="text-accent-primary" />
                    March 25, 2024
                  </p>
                </div>
                <Link to="/events" className="btn-primary w-full md:w-auto text-center">
                  Register Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advertisement Banner */}
      <Advertisement />

      {/* Latest News Section */}
      <div className="bg-dark-400 py-20">
        <div className="container-section">
          <ScrollableSection 
            title="LATEST NEWS" 
            subtitle="STAY UPDATED WITH PEARS NEWS"
          >
            {mockNews.map((news) => (
              <NewsCard
                key={news.id}
                title={news.title}
                image={news.image}
                date={news.date}
                summary={news.summary}
              />
            ))}
          </ScrollableSection>
        </div>
      </div>

      {/* Latest Videos Section */}
      <div className="bg-dark-400 pb-20">
        <div className="container-section">
          <ScrollableSection 
            title="LATEST VIDEOS" 
            subtitle="WATCH THE LATEST RACE HIGHLIGHTS"
          >
            {mockVideos.map((video) => (
              <VideoCard
                key={video.id}
                title={video.title}
                thumbnail={video.thumbnail}
                duration={video.duration}
                views={video.views}
              />
            ))}
          </ScrollableSection>
        </div>
      </div>

      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/+6281284442665" 
        target="_blank" 
        rel="noopener noreferrer"
        className="whatsapp-button"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
};

export default Home;