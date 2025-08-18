import React, { useState } from 'react';
import { AnimeList } from '@/components/anime/AnimeList';
import { mockAnimes } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Award, Trophy, Medal } from 'lucide-react';

const TopRated = () => {
  const [filterByYear, setFilterByYear] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  // Get top rated anime (rating >= 8.5)
  const topRatedAnimes = mockAnimes.filter(anime => anime.rating >= 8.0);
  
  const filteredAnimes = topRatedAnimes.filter(anime => {
    const matchesYear = filterByYear === 'all' || anime.year.toString() === filterByYear;
    return matchesYear;
  });

  const sortedAnimes = [...filteredAnimes].sort((a, b) => {
    switch (sortBy) {
      case 'year':
        return b.year - a.year;
      case 'popularity':
        return b.popularity - a.popularity;
      default:
        return b.rating - a.rating;
    }
  });

  const years = Array.from(new Set(topRatedAnimes.map(anime => anime.year))).sort((a, b) => b - a);

  // Get the top 3 for special display
  const topThree = sortedAnimes.slice(0, 3);
  const restOfList = sortedAnimes.slice(3);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <Star className="w-8 h-8 text-amber-500 fill-current" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
              Top Rated Anime
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The highest rated anime series and movies according to our community
            </p>
            <Badge variant="secondary" className="text-sm bg-yellow-500/10 text-yellow-700 dark:text-yellow-300">
              ⭐ {topRatedAnimes.length} Highly Rated (8.0+)
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="popularity">Most Popular</SelectItem>
              <SelectItem value="year">Newest First</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterByYear} onValueChange={setFilterByYear}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Top 3 Special Display */}
        {topThree.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              Hall of Fame
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {topThree.map((anime, index) => (
                <Card key={anime.id} className="relative overflow-hidden group hover:scale-105 transition-transform duration-300">
                  <div className="absolute top-4 left-4 z-10">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                      index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                      'bg-gradient-to-br from-amber-400 to-amber-600'
                    }`}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                    </div>
                  </div>
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={anime.poster}
                        alt={anime.title}
                        className="w-full h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="text-xl font-bold">{anime.rating}</span>
                        </div>
                        <h3 className="text-lg font-bold mb-1">{anime.title}</h3>
                        <p className="text-sm text-white/80">{anime.year} • {anime.studio}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Rest of the List */}
        {restOfList.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Award className="w-6 h-6 text-primary" />
              More Top Rated ({restOfList.length})
            </h2>
            <AnimeList 
              title=""
              animes={restOfList}
              variant="grid"
              cardVariant="default"
              showViewToggle={true}
            />
          </div>
        )}

        {/* Rating Distribution */}
        <div className="mt-16">
          <h3 className="text-xl font-bold mb-6">Rating Distribution</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center bg-gradient-to-br from-green-500/10 to-green-500/5">
              <div className="text-2xl font-bold text-green-600">
                {mockAnimes.filter(a => a.rating >= 9.0).length}
              </div>
              <div className="text-sm text-muted-foreground">9.0+ Masterpieces</div>
            </Card>
            <Card className="p-4 text-center bg-gradient-to-br from-blue-500/10 to-blue-500/5">
              <div className="text-2xl font-bold text-blue-600">
                {mockAnimes.filter(a => a.rating >= 8.5 && a.rating < 9.0).length}
              </div>
              <div className="text-sm text-muted-foreground">8.5-8.9 Excellent</div>
            </Card>
            <Card className="p-4 text-center bg-gradient-to-br from-purple-500/10 to-purple-500/5">
              <div className="text-2xl font-bold text-purple-600">
                {mockAnimes.filter(a => a.rating >= 8.0 && a.rating < 8.5).length}
              </div>
              <div className="text-sm text-muted-foreground">8.0-8.4 Great</div>
            </Card>
            <Card className="p-4 text-center bg-gradient-to-br from-orange-500/10 to-orange-500/5">
              <div className="text-2xl font-bold text-orange-600">
                {mockAnimes.filter(a => a.rating >= 7.5 && a.rating < 8.0).length}
              </div>
              <div className="text-sm text-muted-foreground">7.5-7.9 Good</div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRated;
