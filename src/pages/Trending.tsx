import React from 'react';
import { AnimeList } from '@/components/anime/AnimeList';
import { getTrendingAnimes } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Flame, Star } from 'lucide-react';

const Trending = () => {
  const trendingAnimes = getTrendingAnimes();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Flame className="w-8 h-8 text-red-500" />
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Trending Anime
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The hottest anime everyone is talking about right now
            </p>
            <Badge variant="destructive" className="text-sm">
              🔥 Hot • {trendingAnimes.length} Trending Now
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <AnimeList 
          title="Currently Trending"
          animes={trendingAnimes}
          variant="grid"
          cardVariant="default"
          showViewToggle={true}
        />

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-red-500/10 to-red-500/5 rounded-lg">
            <Flame className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <h3 className="text-2xl font-bold">Most Watched</h3>
            <p className="text-muted-foreground">Based on daily views</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-lg">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-orange-500" />
            <h3 className="text-2xl font-bold">Rising Fast</h3>
            <p className="text-muted-foreground">Rapidly gaining popularity</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 rounded-lg">
            <Star className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
            <h3 className="text-2xl font-bold">Community Favorites</h3>
            <p className="text-muted-foreground">Highest rated this week</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;