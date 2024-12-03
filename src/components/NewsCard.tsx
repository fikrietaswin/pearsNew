import { Calendar } from 'lucide-react';

interface NewsCardProps {
  title: string;
  image: string;
  date: string;
  summary: string;
}

const NewsCard = ({ title, image, date, summary }: NewsCardProps) => {
  return (
    <article className="glass-card rounded-xl overflow-hidden w-[280px] md:w-[400px] flex-shrink-0 group cursor-pointer">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-400 p-4">
          <div className="flex items-center text-sm text-gray-300">
            <Calendar size={16} className="mr-2" />
            {date}
          </div>
        </div>
      </div>
      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold mb-2 text-white line-clamp-2">{title}</h3>
        <p className="text-sm md:text-base text-gray-400 line-clamp-2">{summary}</p>
      </div>
    </article>
  );
};

export default NewsCard;