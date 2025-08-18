import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Heart, Plus, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Anime } from '@/lib/mockData';

interface AnimeCardProps {
  anime: Anime;
  variant?: 'default' | 'large' | 'compact';
  showDetails?: boolean;
}

export const AnimeCard = ({ anime, variant = 'default', showDetails = true }: AnimeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const cardSizes = {
    default: 'w-full max-w-sm',
    large: 'w-full max-w-md',
    compact: 'w-48'
  };

  const imageSizes = {
    default: 'aspect-[2/3] h-72',
    large: 'aspect-[2/3] h-80', 
    compact: 'aspect-[2/3] h-64'
  };

  return (
    <Card 
      className={`${cardSizes[variant]} group cursor-pointer transition-all duration-300 hover:scale-105 overflow-hidden border-0 bg-gradient-to-br from-card via-card to-card/80 hover:shadow-2xl hover:shadow-primary/25`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0 relative overflow-hidden rounded-lg bg-gradient-to-br from-muted/50 to-muted/20 backdrop-blur-sm">
        <div className="relative">
          <img
            src={anime.poster}
            alt={anime.title}
            className={`${imageSizes[variant]} w-full object-cover transition-transform duration-300 group-hover:scale-110`}
          />
          
          {/* Animated Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          {/* Status Badge */}
          <Badge 
            variant={anime.status === 'Ongoing' ? 'default' : anime.status === 'Completed' ? 'secondary' : 'destructive'}
            className="absolute top-3 left-3 text-xs font-semibold shadow-lg backdrop-blur-sm bg-background/90"
          >
            {anime.status}
          </Badge>

          {/* Enhanced Rating */}
          <div className="absolute top-3 right-3 bg-gradient-to-br from-yellow-400/90 to-orange-500/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
            <Star className="w-3.5 h-3.5 fill-white text-white" />
            <span className="text-white text-xs font-bold">{anime.rating}</span>
          </div>

          {/* Enhanced Hover Actions */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHovered ? 'opacity-100 backdrop-blur-sm' : 'opacity-0'}`}>
            <div className="flex items-center gap-3">
              <Button size="sm" className="rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg transform hover:scale-110 transition-all duration-200" asChild>
                <Link to={`/watch/${anime.id}`}>
                  <Play className="w-4 h-4 fill-current" />
                </Link>
              </Button>
              
              <Button 
                size="sm" 
                variant="outline" 
                className="rounded-full bg-white/20 border-white/40 hover:bg-white/30 backdrop-blur-sm shadow-lg transform hover:scale-110 transition-all duration-200"
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-white'}`} />
              </Button>
              
              <Button 
                size="sm" 
                variant="outline"
                className="rounded-full bg-white/20 border-white/40 hover:bg-white/30 backdrop-blur-sm shadow-lg transform hover:scale-110 transition-all duration-200"
                onClick={() => setIsInWatchlist(!isInWatchlist)}
              >
                <Plus className={`w-4 h-4 ${isInWatchlist ? 'text-green-500' : 'text-white'}`} />
              </Button>
            </div>
          </div>

          {/* Quick Info on Hover */}
          {showDetails && isHovered && variant !== 'compact' && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
              <div className="flex items-center gap-2 text-white text-xs mb-2">
                <Clock className="w-3 h-3" />
                <span>{anime.duration}</span>
                <span>•</span>
                <span>{anime.year}</span>
                <span>•</span>
                <span>{anime.totalEpisodes} eps</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {anime.genres.slice(0, 3).map((genre) => (
                  <Badge key={genre} variant="secondary" className="text-xs">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {showDetails && (
          <div className="p-4 bg-gradient-to-br from-card to-muted/20 backdrop-blur-sm">
            <Link to={`/anime/${anime.id}`} className="group">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2 mb-1">
                {anime.title}
              </h3>
              {anime.englishTitle && anime.englishTitle !== anime.title && (
                <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                  {anime.englishTitle}
                </p>
              )}
            </Link>
            
            {variant !== 'compact' && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {anime.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {anime.genres.slice(0, 2).map((genre) => (
                  <Badge key={genre} variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                    {genre}
                  </Badge>
                ))}
              </div>
              <span className="text-xs text-muted-foreground font-medium">{anime.studio}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};