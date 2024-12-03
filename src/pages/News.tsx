import { useState, useEffect } from 'react';
import { NewsItem } from '../types';
import { Calendar, ArrowRight } from 'lucide-react';

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Season Opener: PEARS Championship Kicks Off',
    summary: 'The 2024 PEARS Championship season begins with exciting races ahead.',
    date: '2024-03-15',
    imageUrl: '/news/season-opener.jpg'
  },
  {
    id: '2',
    title: 'New Track Record Set at Catalunya',
    summary: 'Multiple records broken during the qualifying session.',
    date: '2024-03-10',
    imageUrl: '/news/catalunya.jpg'
  },
  {
    id: '3',
    title: 'Rule Changes for 2024 Season',
    summary: 'Important updates to racing regulations and scoring system.',
    date: '2024-03-05',
    imageUrl: '/news/rules.jpg'
  }
];

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    setNews(mockNews);
  }, []);

  return (
    <div className="container-section">
      <h1 className="text-4xl font-bold mb-8 text-gradient">Latest News</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item) => (
          <article key={item.id} className="glass-card rounded-xl overflow-hidden group">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-400 p-4">
                <div className="flex items-center text-sm text-gray-300">
                  <Calendar size={16} className="mr-2" />
                  {new Date(item.date).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2 text-white">{item.title}</h2>
              <p className="text-gray-400 mb-4">{item.summary}</p>
              <button className="flex items-center text-accent-primary hover:text-accent-secondary transition-colors">
                Read More <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default News;