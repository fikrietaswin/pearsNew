import { Play } from 'lucide-react';

interface VideoCardProps {
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
}

const VideoCard = ({ title, thumbnail, duration, views }: VideoCardProps) => {
  return (
    <div className="glass-card rounded-xl overflow-hidden w-[260px] md:w-[300px] flex-shrink-0 group cursor-pointer">
      <div className="relative aspect-video">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="w-12 h-12 text-white" />
        </div>
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-xs text-white">
          {duration}
        </div>
      </div>
      <div className="p-3 md:p-4">
        <h3 className="font-bold text-base md:text-lg text-white line-clamp-2">{title}</h3>
        <p className="text-xs md:text-sm text-gray-400 mt-1">{views} views</p>
      </div>
    </div>
  );
};

export default VideoCard;