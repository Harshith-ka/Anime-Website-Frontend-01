import { useState } from 'react';
import { ChevronLeft, ChevronRight, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimeCard } from './AnimeCard';
import { Anime } from '@/lib/mockData';

interface AnimeListProps {
  title: string;
  animes: Anime[];
  variant?: 'carousel' | 'grid';
  cardVariant?: 'default' | 'large' | 'compact';
  showViewToggle?: boolean;
}

export const AnimeList = ({ 
  title, 
  animes, 
  variant = 'carousel',
  cardVariant = 'default',
  showViewToggle = false 
}: AnimeListProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const itemsPerView = 6;
  const maxIndex = Math.max(0, animes.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(Math.min(currentIndex + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(Math.max(currentIndex - 1, 0));
  };

  if (variant === 'grid') {
    return (
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          {showViewToggle && (
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
        
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {animes.map((anime) => (
            <AnimeCard 
              key={anime.id} 
              anime={anime} 
              variant={viewMode === 'list' ? 'large' : cardVariant}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div 
          className="flex gap-4 transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
          }}
        >
          {animes.map((anime) => (
            <div key={anime.id} className="flex-none w-1/6 min-w-48">
              <AnimeCard anime={anime} variant={cardVariant} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};