import { useState, useEffect } from 'react';

// Added placeholder image URLs for development
const images = [
  'https://awsimages.detik.net.id/community/media/visual/2024/01/13/naresh-adhitama-pradipta-1_169.jpeg?w=600&q=90',
  'https://images.unsplash.com/photo-1571188654248-7a89213915f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  'https://awsimages.detik.net.id/community/media/visual/2022/06/17/keseruan-anak-anak-mengikuti-kompetisi-push-bike-di-karawang-5_43.jpeg?w=1200',
  'https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  'https://pears.co.id/assets/img/logo-white.svg',
  'https://thumb.viva.co.id/media/frontend/thumbs3/2023/09/19/6509340d65098-kompetisi-push-bike-di-cirebon-diikuti-peserta-dari-luar-negerip_665_374.jpg',
];

const BackgroundCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 
            ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
            style={{ backgroundImage: `url(${image})` }}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-400/90 via-dark-400/80 to-transparent" />
    </div>
  );
};

export default BackgroundCarousel;