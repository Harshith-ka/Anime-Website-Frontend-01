import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Plus, Info, Star, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Anime } from '@/lib/mockData';

interface HeroSectionProps {
  featuredAnimes: Anime[];
}

export const HeroSection = ({ featuredAnimes }: HeroSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredAnimes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredAnimes.length, isAutoPlaying]);

  const currentAnime = featuredAnimes[currentIndex];

  if (!currentAnime) return null;

  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentAnime.banner}
          alt={currentAnime.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl space-y-6">
          {/* Status Badge */}
          <Badge 
            variant={currentAnime.status === 'Ongoing' ? 'default' : 'secondary'}
            className="text-sm"
          >
            {currentAnime.status}
          </Badge>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-2 animate-fade-in">
              {currentAnime.title}
            </h1>
            {currentAnime.englishTitle && currentAnime.englishTitle !== currentAnime.title && (
              <p className="text-xl text-white/80">
                {currentAnime.englishTitle}
              </p>
            )}
          </div>

          {/* Info Row */}
          <div className="flex items-center gap-4 text-white/90">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{currentAnime.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-5 h-5" />
              <span>{currentAnime.year}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-5 h-5" />
              <span>{currentAnime.duration}</span>
            </div>
            <span>{currentAnime.totalEpisodes} episodes</span>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {currentAnime.genres.slice(0, 4).map((genre) => (
              <Badge key={genre} variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                {genre}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <p className="text-lg text-white/90 line-clamp-3 max-w-xl">
            {currentAnime.description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white" asChild>
              <Link to={`/watch/${currentAnime.id}`}>
                <Play className="w-5 h-5 mr-2 fill-current" />
                Play Now
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Plus className="w-5 h-5 mr-2" />
              Add to Watchlist
            </Button>
            
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/10" asChild>
              <Link to={`/anime/${currentAnime.id}`}>
                <Info className="w-5 h-5 mr-2" />
                More Info
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {featuredAnimes.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoPlaying(false);
            }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          />
        ))}
      </div>
    </section>
  );
};