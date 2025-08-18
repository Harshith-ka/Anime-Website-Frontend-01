import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                AnimeStream
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your ultimate destination for anime streaming. Watch thousands of anime series and movies in HD quality with subtitles.
            </p>
            <div className="flex space-x-3">
              <Button size="sm" variant="outline" className="rounded-full p-2">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="rounded-full p-2">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="rounded-full p-2">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="rounded-full p-2">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/anime" className="text-muted-foreground hover:text-primary transition-colors">All Anime</Link></li>
              <li><Link to="/genres" className="text-muted-foreground hover:text-primary transition-colors">Genres</Link></li>
              <li><Link to="/movies" className="text-muted-foreground hover:text-primary transition-colors">Movies</Link></li>
              <li><Link to="/random" className="text-muted-foreground hover:text-primary transition-colors">Random</Link></li>
              <li><Link to="/schedule" className="text-muted-foreground hover:text-primary transition-colors">Schedule</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/trending" className="text-muted-foreground hover:text-primary transition-colors">Trending</Link></li>
              <li><Link to="/popular" className="text-muted-foreground hover:text-primary transition-colors">Popular</Link></li>
              <li><Link to="/new-releases" className="text-muted-foreground hover:text-primary transition-colors">New Releases</Link></li>
              <li><Link to="/top-rated" className="text-muted-foreground hover:text-primary transition-colors">Top Rated</Link></li>
              <li><Link to="/completed" className="text-muted-foreground hover:text-primary transition-colors">Completed</Link></li>
              <li><Link to="/ongoing" className="text-muted-foreground hover:text-primary transition-colors">Ongoing</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-muted-foreground text-sm">
              Subscribe to get notified about new anime releases and updates.
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder="Enter your email" 
                className="flex-1"
              />
              <Button size="sm" className="px-4">
                Subscribe
              </Button>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@animestream.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for anime lovers worldwide</span>
          </div>
          <div className="flex flex-wrap gap-6">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          </div>
          <div>
            <span>© 2024 AnimeStream. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};