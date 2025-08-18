import { HeroSection } from '@/components/anime/HeroSection';
import { AnimeList } from '@/components/anime/AnimeList';
import { getTrendingAnimes, getPopularAnimes, getNewAnimes, mockAnimes } from '@/lib/mockData';

const Index = () => {
  const trendingAnimes = getTrendingAnimes();
  const popularAnimes = getPopularAnimes();
  const newAnimes = getNewAnimes();
  const featuredAnimes = mockAnimes.slice(0, 5); // Top 5 for hero carousel

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection featuredAnimes={featuredAnimes} />

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Trending Section */}
        <AnimeList 
          title="Trending Now" 
          animes={trendingAnimes} 
          variant="carousel"
          cardVariant="default"
        />

        {/* Popular Section */}
        <AnimeList 
          title="Most Popular" 
          animes={popularAnimes} 
          variant="carousel"
          cardVariant="default"
        />

        {/* New Releases */}
        <AnimeList 
          title="New Releases" 
          animes={newAnimes} 
          variant="carousel"
          cardVariant="default"
        />

        {/* Continue Watching - Mock section */}
        <AnimeList 
          title="Continue Watching" 
          animes={mockAnimes.slice(0, 4)} 
          variant="carousel"
          cardVariant="large"
        />
      </div>
    </div>
  );
};

export default Index;
