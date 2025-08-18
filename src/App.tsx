import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Index from "./pages/Index";
import { AnimeDetail } from "./pages/AnimeDetail";
import { Genres } from "./pages/Genres";
import Movies from "./pages/Movies";
import Random from "./pages/Random";
import Schedule from "./pages/Schedule";
import AllAnime from "./pages/AllAnime";
import Trending from "./pages/Trending";
import TopRated from "./pages/TopRated";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/anime/:id" element={<AnimeDetail />} />
                <Route path="/anime" element={<AllAnime />} />
                <Route path="/genres" element={<Genres />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/random" element={<Random />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/top-rated" element={<TopRated />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
