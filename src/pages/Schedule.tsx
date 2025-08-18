import React, { useState } from 'react';
import { Calendar, Clock, Play, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockAnimes } from '@/lib/mockData';
import { Link } from 'react-router-dom';

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState('monday');

  const daysOfWeek = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
  ];

  // Mock schedule data
  const scheduleData = {
    monday: [
      { ...mockAnimes[0], time: '18:00', episode: 25 },
      { ...mockAnimes[1], time: '19:30', episode: 12 },
    ],
    tuesday: [
      { ...mockAnimes[2], time: '17:00', episode: 8 },
      { ...mockAnimes[3], time: '20:00', episode: 156 },
    ],
    wednesday: [
      { ...mockAnimes[4], time: '16:30', episode: 'Movie' },
      { ...mockAnimes[0], time: '21:00', episode: 26 },
    ],
    thursday: [
      { ...mockAnimes[1], time: '18:30', episode: 13 },
      { ...mockAnimes[5], time: '19:00', episode: 1001 },
    ],
    friday: [
      { ...mockAnimes[3], time: '17:30', episode: 157 },
      { ...mockAnimes[2], time: '20:30', episode: 9 },
    ],
    saturday: [
      { ...mockAnimes[5], time: '16:00', episode: 1002 },
      { ...mockAnimes[0], time: '18:00', episode: 27 },
    ],
    sunday: [
      { ...mockAnimes[1], time: '17:00', episode: 14 },
      { ...mockAnimes[4], time: '19:00', episode: 'Special' },
    ]
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase().slice(0, 3);
  const todayFull = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Anime Schedule
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Never miss your favorite anime! Check the weekly schedule for new episodes
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>All times in JST (Japan Standard Time)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={selectedDay} onValueChange={setSelectedDay} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8">
            {daysOfWeek.map((day) => (
              <TabsTrigger key={day} value={day} className="capitalize">
                {day.slice(0, 3)}
                {todayFull === day && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    Today
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {daysOfWeek.map((day) => (
            <TabsContent key={day} value={day} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold capitalize">{day}</h2>
                <Badge variant="outline">
                  {scheduleData[day]?.length || 0} Episodes
                </Badge>
              </div>

              <div className="space-y-4">
                {scheduleData[day]?.map((item, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <img
                          src={item.poster}
                          alt={item.title}
                          className="w-16 h-24 object-cover rounded-lg"
                        />
                        
                        <div className="flex-1 space-y-3">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-semibold hover:text-primary transition-colors">
                                <Link to={`/anime/${item.id}`}>
                                  {item.title}
                                </Link>
                              </h3>
                              {item.englishTitle && item.englishTitle !== item.title && (
                                <p className="text-sm text-muted-foreground">
                                  {item.englishTitle}
                                </p>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                <span className="font-mono">{item.time}</span>
                              </div>
                              <Badge variant="secondary">
                                EP {item.episode}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {item.genres.slice(0, 3).map((genre) => (
                              <Badge key={genre} variant="outline" className="text-xs">
                                {genre}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex flex-wrap gap-3">
                            <Button size="sm" asChild>
                              <Link to={`/watch/${item.id}`}>
                                <Play className="w-4 h-4 mr-1" />
                                Watch
                              </Link>
                            </Button>
                            
                            <Button size="sm" variant="outline">
                              <Bell className="w-4 h-4 mr-1" />
                              Remind Me
                            </Button>
                            
                            <Button size="sm" variant="ghost" asChild>
                              <Link to={`/anime/${item.id}`}>
                                Details
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )) || (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">No episodes scheduled for {day}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Schedule;