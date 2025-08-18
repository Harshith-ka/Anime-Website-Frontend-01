import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimeCard } from '@/components/anime/AnimeCard';
import { mockAnimes } from '@/lib/mockData';
import { Shuffle, Play, Plus, Star, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Random = () => {
  const [randomAnime, setRandomAnime] = useState(() => 
    mockAnimes[Math.floor(Math.random() * mockAnimes.length)]
  );
  const [isSpinning, setIsSpinning] = useState(false);

  const getRandomAnime = () => {
    setIsSpinning(true);
    setTimeout(() => {
      const newAnime = mockAnimes[Math.floor(Math.random() * mockAnimes.length)];
      setRandomAnime(newAnime);
      setIsSpinning(false);
    }, 1000);
  };

  const relatedAnimes = mockAnimes
    .filter(anime => 
      anime.id !== randomAnime.id && 
      anime.genres.some(genre => randomAnime.genres.includes(genre))
    )
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-accent/20 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Random Anime Picker
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Can't decide what to watch? Let us pick a random anime for you!
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Random Button */}
        <div className="text-center mb-12">
          <Button 
            size="lg" 
            onClick={getRandomAnime}
            disabled={isSpinning}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Shuffle className={`w-6 h-6 mr-3 ${isSpinning ? 'animate-spin' : ''}`} />
            {isSpinning ? 'Finding Random Anime...' : 'Get Random Anime'}
          </Button>
        </div>

        {/* Random Anime Display */}
        <Card className="mb-12 overflow-hidden">
          <div className="relative">
            <img
              src={randomAnime.banner}
              alt={randomAnime.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <Badge 
                variant={randomAnime.status === 'Ongoing' ? 'default' : 'secondary'}
                className="mb-3"
              >
                {randomAnime.status}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{randomAnime.title}</h2>
              {randomAnime.englishTitle && randomAnime.englishTitle !== randomAnime.title && (
                <p className="text-xl text-white/80 mb-4">{randomAnime.englishTitle}</p>
              )}
            </div>
          </div>
          
          <CardContent className="p-6">
            {/* Info Row */}
            <div className="flex flex-wrap items-center gap-4 mb-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{randomAnime.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-5 h-5" />
                <span>{randomAnime.year}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-5 h-5" />
                <span>{randomAnime.duration}</span>
              </div>
              <span>{randomAnime.totalEpisodes} episodes</span>
              <span className="text-sm">{randomAnime.studio}</span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-4">
              {randomAnime.genres.map((genre) => (
                <Badge key={genre} variant="outline">
                  {genre}
                </Badge>
              ))}
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {randomAnime.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link to={`/watch/${randomAnime.id}`}>
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  Watch Now
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" asChild>
                <Link to={`/anime/${randomAnime.id}`}>
                  More Details
                </Link>
              </Button>
              
              <Button size="lg" variant="outline">
                <Plus className="w-5 h-5 mr-2" />
                Add to Watchlist
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Related Anime */}
        {relatedAnimes.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Similar Anime You Might Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {relatedAnimes.map((anime) => (
                <AnimeCard
                  key={anime.id}
                  anime={anime}
                  variant="compact"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Random;