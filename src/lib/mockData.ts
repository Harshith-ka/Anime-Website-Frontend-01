export interface Anime {
  id: string;
  title: string;
  englishTitle?: string;
  description: string;
  poster: string;
  banner: string;
  trailer?: string;
  episodes: Episode[];
  genres: string[];
  year: number;
  rating: number;
  status: 'Completed' | 'Ongoing' | 'Upcoming';
  language: string[];
  duration: string;
  studio: string;
  totalEpisodes: number;
  popularity: number;
}

export interface Episode {
  id: string;
  animeId: string;
  episodeNumber: number;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  releaseDate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  favorites: string[];
  watchlist: string[];
  history: WatchHistory[];
  settings: UserSettings;
}

export interface WatchHistory {
  animeId: string;
  episodeId: string;
  watchedAt: string;
  progress: number;
  completed: boolean;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  language: string;
  autoplay: boolean;
  quality: string;
  subtitles: boolean;
}

export interface Review {
  id: string;
  userId: string;
  animeId: string;
  rating: number;
  comment: string;
  createdAt: string;
  likes: number;
}

// Mock data
export const mockAnimes: Anime[] = [
  {
    id: '1',
    title: 'Attack on Titan',
    englishTitle: 'Attack on Titan',
    description: 'Humanity fights for survival against giant humanoid Titans that have brought civilization to the brink of extinction.',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    banner: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop',
    trailer: 'https://example.com/trailer1',
    episodes: [],
    genres: ['Action', 'Drama', 'Fantasy'],
    year: 2013,
    rating: 9.0,
    status: 'Completed',
    language: ['Japanese', 'English'],
    duration: '24 min',
    studio: 'WIT Studio',
    totalEpisodes: 87,
    popularity: 95
  },
  {
    id: '2',
    title: 'Demon Slayer',
    englishTitle: 'Demon Slayer: Kimetsu no Yaiba',
    description: 'A young boy becomes a demon slayer to avenge his family and cure his sister.',
    poster: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=600&fit=crop',
    banner: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=400&fit=crop',
    episodes: [],
    genres: ['Action', 'Supernatural', 'Adventure'],
    year: 2019,
    rating: 8.7,
    status: 'Ongoing',
    language: ['Japanese', 'English'],
    duration: '23 min',
    studio: 'Ufotable',
    totalEpisodes: 44,
    popularity: 92
  },
  {
    id: '3',
    title: 'Your Name',
    englishTitle: 'Kimi no Na wa',
    description: 'Two teenagers share a profound, magical connection upon discovering they are swapping bodies.',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    banner: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop',
    episodes: [],
    genres: ['Romance', 'Drama', 'Fantasy'],
    year: 2016,
    rating: 8.4,
    status: 'Completed',
    language: ['Japanese', 'English'],
    duration: '106 min',
    studio: 'CoMix Wave Films',
    totalEpisodes: 1,
    popularity: 88
  },
  {
    id: '4',
    title: 'My Hero Academia',
    englishTitle: 'Boku no Hero Academia',
    description: 'A world where people with superpowers are the norm, and one boy without powers dreams of becoming a hero.',
    poster: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=600&fit=crop',
    banner: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=400&fit=crop',
    episodes: [],
    genres: ['Action', 'Adventure', 'School'],
    year: 2016,
    rating: 8.5,
    status: 'Ongoing',
    language: ['Japanese', 'English'],
    duration: '24 min',
    studio: 'Bones',
    totalEpisodes: 154,
    popularity: 90
  },
  {
    id: '5',
    title: 'Spirited Away',
    englishTitle: 'Sen to Chihiro no Kamikakushi',
    description: 'A young girl enters a world ruled by gods and witches where humans are changed into beasts.',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    banner: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop',
    episodes: [],
    genres: ['Adventure', 'Family', 'Fantasy'],
    year: 2001,
    rating: 9.3,
    status: 'Completed',
    language: ['Japanese', 'English'],
    duration: '125 min',
    studio: 'Studio Ghibli',
    totalEpisodes: 1,
    popularity: 96
  },
  {
    id: '6',
    title: 'One Piece',
    englishTitle: 'One Piece',
    description: 'Follow Monkey D. Luffy on his quest to find the legendary treasure One Piece and become Pirate King.',
    poster: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=600&fit=crop',
    banner: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=400&fit=crop',
    episodes: [],
    genres: ['Action', 'Adventure', 'Comedy'],
    year: 1999,
    rating: 9.1,
    status: 'Ongoing',
    language: ['Japanese', 'English'],
    duration: '24 min',
    studio: 'Toei Animation',
    totalEpisodes: 1000,
    popularity: 94
  }
];

export const genres = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Romance', 
  'Sci-Fi', 'Thriller', 'Horror', 'Mystery', 'Slice of Life', 'Sports',
  'Music', 'School', 'Military', 'Historical', 'Supernatural'
];

export const mockUser: User = {
  id: '1',
  name: 'Anime Fan',
  email: 'fan@anime.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
  favorites: ['1', '2', '5'],
  watchlist: ['3', '4', '6'],
  history: [
    {
      animeId: '1',
      episodeId: '1-1',
      watchedAt: '2024-01-15T10:30:00Z',
      progress: 0.75,
      completed: false
    }
  ],
  settings: {
    theme: 'dark',
    language: 'English',
    autoplay: true,
    quality: '1080p',
    subtitles: true
  }
};

// Helper functions
export const getTrendingAnimes = () => mockAnimes.slice(0, 6);
export const getPopularAnimes = () => mockAnimes.sort((a, b) => b.popularity - a.popularity);
export const getNewAnimes = () => mockAnimes.filter(anime => anime.year >= 2020);
export const getAnimesByGenre = (genre: string) => mockAnimes.filter(anime => anime.genres.includes(genre));
export const searchAnimes = (query: string) => mockAnimes.filter(anime => 
  anime.title.toLowerCase().includes(query.toLowerCase()) ||
  anime.englishTitle?.toLowerCase().includes(query.toLowerCase()) ||
  anime.description.toLowerCase().includes(query.toLowerCase())
);