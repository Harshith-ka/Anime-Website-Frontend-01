import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Plus, Heart, Share2, Star, Calendar, Clock, Users, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { AnimeList } from '@/components/anime/AnimeList';
import { mockAnimes, Anime, getAnimesByGenre } from '@/lib/mockData';

export const AnimeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [watchProgress, setWatchProgress] = useState(65); // Mock progress

  useEffect(() => {
    const foundAnime = mockAnimes.find(a => a.id === id);
    setAnime(foundAnime || null);
  }, [id]);

  if (!anime) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Anime Not Found</h2>
          <p className="text-muted-foreground mb-4">The anime you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/">Go Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const relatedAnimes = getAnimesByGenre(anime.genres[0]).filter(a => a.id !== anime.id);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src={anime.banner}
          alt={anime.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient" />
        
        <div className="absolute bottom-8 left-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{anime.title}</h1>
          {anime.englishTitle && anime.englishTitle !== anime.title && (
            <p className="text-xl text-white/80">{anime.englishTitle}</p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link to={`/watch/${anime.id}`}>
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  Watch Now
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setIsInWatchlist(!isInWatchlist)}
                className={isInWatchlist ? 'bg-primary/10 border-primary' : ''}
              >
                <Plus className="w-5 h-5 mr-2" />
                {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setIsFavorited(!isFavorited)}
                className={isFavorited ? 'bg-red-500/10 border-red-500' : ''}
              >
                <Heart className={`w-5 h-5 mr-2 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                {isFavorited ? 'Favorited' : 'Add to Favorites'}
              </Button>
              
              <Button size="lg" variant="outline">
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </Button>
            </div>

            {/* Continue Watching Progress */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Continue Watching</h3>
                  <span className="text-sm text-muted-foreground">Episode 12</span>
                </div>
                <Progress value={watchProgress} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  {watchProgress}% complete • Last watched 2 days ago
                </p>
              </CardContent>
            </Card>

            {/* Content Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="episodes">Episodes</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="characters">Characters</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Synopsis</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {anime.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {anime.genres.map((genre) => (
                      <Badge key={genre} variant="secondary">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="episodes" className="space-y-4">
                <div className="grid gap-4">
                  {Array.from({ length: Math.min(anime.totalEpisodes, 10) }, (_, i) => (
                    <Card key={i} className="hover:bg-accent/50 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-12 bg-muted rounded flex items-center justify-center">
                            <Play className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">Episode {i + 1}</h4>
                            <p className="text-sm text-muted-foreground">
                              Duration: {anime.duration}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Play className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Reviews feature coming soon!</p>
                </div>
              </TabsContent>

              <TabsContent value="characters" className="space-y-4">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Characters feature coming soon!</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Anime Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{anime.rating}</span>
                  <span className="text-muted-foreground">/ 10</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Year: {anime.year}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Duration: {anime.duration}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Episodes: {anime.totalEpisodes}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Studio: {anime.studio}</span>
                  </div>
                </div>

                <Badge 
                  variant={anime.status === 'Ongoing' ? 'default' : anime.status === 'Completed' ? 'secondary' : 'destructive'}
                  className="w-full justify-center"
                >
                  {anime.status}
                </Badge>
              </CardContent>
            </Card>

            {/* Poster */}
            <div className="aspect-[2/3] overflow-hidden rounded-lg">
              <img
                src={anime.poster}
                alt={anime.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Related Anime */}
        <div className="mt-16">
          <AnimeList 
            title="More Like This" 
            animes={relatedAnimes} 
            variant="carousel"
            cardVariant="default"
          />
        </div>
      </div>
    </div>
  );
};