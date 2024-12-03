import { useEffect, useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ScrollObserverProps {
  children: ReactNode;
  threshold?: number;
}

const ScrollObserver = ({ children, threshold = 0.1 }: ScrollObserverProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && ref.current) {
          ref.current.classList.add('active');
        }
      },
      {
        threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return (
    <motion.div
      ref={ref}
      className="reveal"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollObserver;