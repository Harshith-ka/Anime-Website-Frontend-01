import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, List, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AnimeList } from '@/components/anime/AnimeList';
import { genres, getAnimesByGenre, mockAnimes } from '@/lib/mockData';

export const Genres = () => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'year' | 'title'>('popularity');

  const genreAnimes = selectedGenre ? getAnimesByGenre(selectedGenre) : mockAnimes;

  const sortedAnimes = [...genreAnimes].sort((a, b) => {
    switch (sortBy) {
      case 'popularity':
        return b.popularity - a.popularity;
      case 'rating':
        return b.rating - a.rating;
      case 'year':
        return b.year - a.year;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {selectedGenre ? `${selectedGenre} Anime` : 'Browse by Genre'}
          </h1>
          <p className="text-muted-foreground">
            Discover anime by your favorite genres
          </p>
        </div>

        {/* Genre Grid */}
        {!selectedGenre && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">All Genres</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {genres.map((genre) => {
                const genreCount = getAnimesByGenre(genre).length;
                return (
                  <Card 
                    key={genre} 
                    className="cursor-pointer hover:scale-105 transition-transform duration-200 card-gradient"
                    onClick={() => setSelectedGenre(genre)}
                  >
                    <CardContent className="p-6 text-center">
                      <h3 className="font-semibold text-foreground mb-1">{genre}</h3>
                      <p className="text-sm text-muted-foreground">{genreCount} anime</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Filters and Controls */}
        {selectedGenre && (
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setSelectedGenre(null)}
              >
                ← All Genres
              </Button>
              
              <Badge variant="secondary" className="text-sm">
                {sortedAnimes.length} results
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Sort by {sortBy}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortBy('popularity')}>
                    Popularity
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('rating')}>
                    Rating
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('year')}>
                    Year
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('title')}>
                    Title
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* View Toggle */}
              <div className="flex items-center gap-1 border rounded-md p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Anime List/Grid */}
        {selectedGenre ? (
          <AnimeList
            title=""
            animes={sortedAnimes}
            variant="grid"
            cardVariant={viewMode === 'list' ? 'large' : 'default'}
            showViewToggle={false}
          />
        ) : (
          <div className="space-y-12">
            {/* Featured Genres */}
            {['Action', 'Romance', 'Fantasy'].map((genre) => (
              <div key={genre}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">{genre}</h2>
                  <Button variant="outline" asChild>
                    <Link to={`/genres?genre=${genre}`} onClick={() => setSelectedGenre(genre)}>
                      View All
                    </Link>
                  </Button>
                </div>
                <AnimeList
                  title=""
                  animes={getAnimesByGenre(genre).slice(0, 6)}
                  variant="carousel"
                  cardVariant="default"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};