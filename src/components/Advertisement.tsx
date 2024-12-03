import { Info } from 'lucide-react';

interface AdvertisementProps {
  text?: string;
  link?: string;
}

const Advertisement = ({ 
  text = "Get 15% off on PEARS merchandise! Limited time offer.", 
  link = "https://store.pears.co.id" 
}: AdvertisementProps) => {
  return (
    <div className="bg-dark-400 py-2">
      <div className="container-section">
        <a 
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card py-3 px-4 flex items-center justify-between rounded-lg group hover:bg-dark-200/80 transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <Info size={20} className="text-accent-primary" />
            <span className="text-gray-300 group-hover:text-white transition-colors">
              {text}
            </span>
          </div>
          <span className="text-accent-primary group-hover:text-accent-secondary transition-colors">
            Shop Now →
          </span>
        </a>
      </div>
    </div>
  );
};

export default Advertisement;