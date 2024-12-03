import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ScrollableSectionProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const ScrollableSection = ({ title, subtitle, children }: ScrollableSectionProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    
    const scrollAmount = window.innerWidth < 768 ? 300 : 400;
    containerRef.current.scrollBy({ 
      left: direction === 'left' ? -scrollAmount : scrollAmount, 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl text-red-500 font-bold tracking-tight">{title}</h2>
          <p className="text-lg md:text-xl text-gray-400">{subtitle}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-dark-300 hover:bg-dark-200 text-white transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-dark-300 hover:bg-dark-200 text-white transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <motion.div
        ref={containerRef}
        className="overflow-x-scroll scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
        whileTap={{ cursor: "grabbing" }}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <div className="flex gap-4 md:gap-6 pb-4">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default ScrollableSection;