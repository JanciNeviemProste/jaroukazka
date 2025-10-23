import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  bgColor: string;
  image: string;
}

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides: Slide[] = [
    {
      id: 1,
      title: 'Nová kolekcia 2024',
      subtitle: 'Zdravotnícke oblečenie',
      description: 'Moderné súpravy pre zdravotnícky personál s dôrazom na komfort a štýl',
      buttonText: 'Pozrieť kolekciu',
      buttonLink: '/',
      bgColor: 'from-primary-400 to-primary-600',
      image: 'https://picsum.photos/seed/hero1/800/600',
    },
    {
      id: 2,
      title: 'Akcia -20% na súpravy',
      subtitle: 'Len tento týždeň',
      description: 'Zľava na všetky dámske a pánske súpravy z novej kolekcie',
      buttonText: 'Nakupovať',
      buttonLink: '/',
      bgColor: 'from-purple-400 to-pink-600',
      image: 'https://picsum.photos/seed/hero2/800/600',
    },
    {
      id: 3,
      title: 'Premium plášte',
      subtitle: 'Elegancia a profesionalita',
      description: 'Lekárske plášte z najkvalitnejších materiálov s certifikátom',
      buttonText: 'Objaviť',
      buttonLink: '/',
      bgColor: 'from-green-400 to-blue-600',
      image: 'https://picsum.photos/seed/hero3/800/600',
    },
    {
      id: 4,
      title: 'Doprava zdarma',
      subtitle: 'Pri nákupe nad 50€',
      description: 'Rýchle doručenie do 1-2 pracovných dní priamo k vám',
      buttonText: 'Viac informácií',
      buttonLink: '/',
      bgColor: 'from-orange-400 to-red-600',
      image: 'https://picsum.photos/seed/hero4/800/600',
    },
  ];

  // Auto-play slider
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgColor} opacity-90`} />

            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-30"
            />

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl text-white">
                  <p className="text-lg md:text-xl mb-2 font-medium opacity-90">
                    {slide.subtitle}
                  </p>
                  <h2 className="text-4xl md:text-6xl font-bold mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl mb-8 opacity-95">
                    {slide.description}
                  </p>
                  <Link
                    to={slide.buttonLink}
                    className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
        aria-label="Predchádzajúci slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
        aria-label="Nasledujúci slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/70"
            )}
            aria-label={`Prejsť na slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;