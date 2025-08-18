import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { AnimeCard } from '@/components/anime/AnimeCard';
import { mockUser, mockAnimes } from '@/lib/mockData';
import { 
  User, 
  Settings, 
  Heart, 
  BookmarkPlus, 
  Clock, 
  Star, 
  Edit, 
  Camera,
  Bell,
  Shield,
  Palette,
  Volume2,
  Monitor
} from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);

  // Get user's anime data
  const favoriteAnimes = mockAnimes.filter(anime => user.favorites.includes(anime.id));
  const watchlistAnimes = mockAnimes.filter(anime => user.watchlist.includes(anime.id));
  const recentlyWatched = mockAnimes.slice(0, 4); // Mock recent data

  const stats = {
    totalWatched: 142,
    hoursWatched: 3420,
    averageRating: 8.3,
    completionRate: 87
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-primary/20 to-accent/20 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Profile Picture */}
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-background shadow-lg"
              />
              <Button
                size="sm"
                className="absolute bottom-0 right-0 rounded-full p-2 w-10 h-10"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <div className="flex gap-2">
                  <Badge variant="secondary">Otaku Level 42</Badge>
                  <Badge variant="outline">Premium Member</Badge>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">{user.email}</p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{stats.totalWatched}</div>
                  <div className="text-sm text-muted-foreground">Anime Watched</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{stats.hoursWatched}h</div>
                  <div className="text-sm text-muted-foreground">Hours Watched</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">{stats.averageRating}</div>
                  <div className="text-sm text-muted-foreground">Avg Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">{stats.completionRate}%</div>
                  <div className="text-sm text-muted-foreground">Completion</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Recently Watched */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Continue Watching
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {recentlyWatched.map((anime) => (
                    <AnimeCard
                      key={anime.id}
                      anime={anime}
                      variant="compact"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5">
                <CardContent className="p-6 text-center">
                  <Star className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                  <h3 className="text-xl font-bold mb-2">This Week</h3>
                  <p className="text-2xl font-bold text-blue-600">12 Episodes</p>
                  <p className="text-sm text-muted-foreground">+3 from last week</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5">
                <CardContent className="p-6 text-center">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                  <h3 className="text-xl font-bold mb-2">Favorites</h3>
                  <p className="text-2xl font-bold text-purple-600">{favoriteAnimes.length}</p>
                  <p className="text-sm text-muted-foreground">Anime you love</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5">
                <CardContent className="p-6 text-center">
                  <BookmarkPlus className="w-12 h-12 mx-auto mb-4 text-green-500" />
                  <h3 className="text-xl font-bold mb-2">Watchlist</h3>
                  <p className="text-2xl font-bold text-green-600">{watchlistAnimes.length}</p>
                  <p className="text-sm text-muted-foreground">To watch later</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Your Favorite Anime ({favoriteAnimes.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {favoriteAnimes.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {favoriteAnimes.map((anime) => (
                      <AnimeCard
                        key={anime.id}
                        anime={anime}
                        variant="compact"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No favorites yet. Start exploring!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Watchlist Tab */}
          <TabsContent value="watchlist">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookmarkPlus className="w-5 h-5 text-blue-500" />
                  Your Watchlist ({watchlistAnimes.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {watchlistAnimes.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {watchlistAnimes.map((anime) => (
                      <AnimeCard
                        key={anime.id}
                        anime={anime}
                        variant="compact"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookmarkPlus className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Your watchlist is empty. Add some anime!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Display Name</Label>
                    <Input id="name" value={user.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={user.email} />
                  </div>
                </div>
                <Button>Update Profile</Button>
              </CardContent>
            </Card>

            {/* Viewing Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  Viewing Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autoplay Next Episode</Label>
                    <p className="text-sm text-muted-foreground">Automatically play the next episode</p>
                  </div>
                  <Switch checked={user.settings.autoplay} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Subtitles</Label>
                    <p className="text-sm text-muted-foreground">Show subtitles by default</p>
                  </div>
                  <Switch checked={user.settings.subtitles} />
                </div>

                <div className="space-y-2">
                  <Label>Default Quality</Label>
                  <div className="flex gap-2">
                    {['720p', '1080p', '4K'].map((quality) => (
                      <Button
                        key={quality}
                        variant={user.settings.quality === quality ? 'default' : 'outline'}
                        size="sm"
                      >
                        {quality}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Episode Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified when new episodes are available</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Recommendation Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive personalized anime recommendations</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;