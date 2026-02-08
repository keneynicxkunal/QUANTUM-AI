'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, ArrowRight, Clock, TrendingUp, Zap, Globe, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SearchResult {
  url: string;
  name: string;
  snippet: string;
  host_name: string;
  rank: number;
  date: string;
}

interface AISummary {
  summary: string;
  keyPoints: string[];
}

export default function QuantumSearchPage() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [aiSummary, setAiSummary] = useState<AISummary | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load search history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('quantumSearchHistory');
      if (saved) {
        setSearchHistory(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load search history:', error);
    }
  }, []);

  // Quantum particle background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 20000));
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 200, 255, ${particle.opacity})`;
        ctx.fill();

        // Draw connections
        particles.forEach((particle2, j) => {
          if (i === j) return;
          const dx = particle.x - particle2.x;
          const dy = particle.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.strokeStyle = `rgba(100, 200, 255, ${0.15 * (1 - distance / 150)})`;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    resizeCanvas();
    createParticles();
    drawParticles();

    const handleResize = () => {
      resizeCanvas();
      particles.length = 0;
      createParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setShowResults(false);
    setAiSummary(null);

    try {
      // Update search history
      const newHistory = [searchQuery, ...searchHistory.filter(q => q !== searchQuery)].slice(0, 10);
      setSearchHistory(newHistory);
      try {
        localStorage.setItem('quantumSearchHistory', JSON.stringify(newHistory));
      } catch (error) {
        console.error('Failed to save search history:', error);
      }

      // Fetch search results
      const searchRes = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const searchData = await searchRes.json();

      if (searchData.success) {
        setSearchResults(searchData.results);

        // Fetch AI summary
        try {
          const summaryRes = await fetch(`/api/ai-summary?q=${encodeURIComponent(searchQuery)}`);
          const summaryData = await summaryRes.json();

          if (summaryData.success) {
            setAiSummary(summaryData.data);
          }
        } catch (error) {
          console.error('Failed to fetch AI summary:', error);
        }

        setShowResults(true);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSearching) {
      handleSearch();
    }
  };

  const trendingQueries = [
    'quantum computing applications',
    'AI breakthroughs 2024',
    'machine learning trends',
    'neural networks explained',
    'artificial intelligence ethics'
  ];

  if (showResults) {
    return (
      <div className="min-h-screen bg-background" role="main">
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none opacity-30"
          style={{ zIndex: 0 }}
          aria-hidden="true"
        />

        <div className="relative z-10 container mx-auto px-4 py-6 md:py-8">
          {/* Header */}
          <header className="mb-6 md:mb-8">
            <Button
              variant="ghost"
              onClick={() => setShowResults(false)}
              className="text-foreground/60 hover:text-foreground"
              aria-label="Perform new search"
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              New Search
            </Button>
          </header>

          {/* Search Input */}
          <div className="mb-6 md:mb-8">
            <div className="relative max-w-3xl mx-auto">
              <label htmlFor="search-input-results" className="sr-only">Search</label>
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" aria-hidden="true" />
              <Input
                id="search-input-results"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Search the quantum web..."
                className="pl-12 pr-14 py-6 text-lg bg-card/50 border-border/30 quantum-border focus:ring-primary/50"
              />
              <Button
                onClick={() => handleSearch()}
                disabled={isSearching || !query.trim()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90 text-primary-foreground"
                aria-label="Search"
              >
                {isSearching ? (
                  <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                ) : (
                  <Search className="w-5 h-5" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>

          {/* AI Summary */}
          {aiSummary && (
            <section aria-label="AI Insights" className="mb-6 md:mb-8">
              <Card className="p-4 md:p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 quantum-glow-subtle">
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <Sparkles className="w-5 h-5 text-primary" aria-hidden="true" />
                  <h3 className="text-base md:text-lg font-semibold text-foreground">AI Insights</h3>
                </div>
                <p className="text-foreground/90 mb-4 leading-relaxed text-sm md:text-base">{aiSummary.summary}</p>
                {aiSummary.keyPoints.length > 0 && (
                  <div>
                    <h4 className="text-xs md:text-sm font-semibold text-foreground/70 mb-2">Key Points:</h4>
                    <ul className="space-y-1 md:space-y-2" role="list">
                      {aiSummary.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm md:text-base text-foreground/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            </section>
          )}

          {/* Search Results */}
          <main className="max-w-4xl mx-auto space-y-4 md:space-y-6">
            <div className="flex items-center justify-between" role="status">
              <h2 className="text-foreground/70 text-sm">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
              </h2>
              <Badge variant="outline" className="text-xs">
                <Globe className="w-3 h-3 mr-1" aria-hidden="true" />
                Web Search
              </Badge>
            </div>

            {searchResults.map((result) => (
              <Card
                key={result.url}
                className="p-4 md:p-6 bg-card/50 border-border/30 hover:bg-card/80 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Globe className="w-3 h-3 text-foreground/40" aria-hidden="true" />
                      <span className="text-sm text-foreground/50">{result.host_name}</span>
                      {result.date && result.date !== 'N/A' && (
                        <span className="text-xs text-foreground/40" aria-label={`Published date: ${new Date(result.date).toLocaleDateString()}`}>
                          • {new Date(result.date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base md:text-xl font-semibold text-primary hover:text-primary/80 transition-colors group-hover:quantum-text-glow block"
                    >
                      {result.name}
                    </a>
                    <p className="mt-2 text-foreground/70 leading-relaxed text-sm md:text-base">
                      {result.snippet}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-foreground/30 group-hover:text-primary/70 transition-colors flex-shrink-0" aria-hidden="true" />
                </div>
              </Card>
            ))}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Quantum Particle Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">
        {/* Logo / Brand */}
        <div className="text-center mb-8 md:mb-12 animate-quantum-float">
          <div className="flex items-center justify-center gap-3 mb-4 md:mb-6">
            <div className="relative">
              <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-primary animate-quantum-pulse" aria-hidden="true" />
              <div className="absolute inset-0 blur-xl bg-primary/30 animate-quantum-pulse" aria-hidden="true" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-3 md:mb-4 quantum-text-glow">
            <span className="bg-gradient-to-r from-quantum-cyan via-quantum-blue to-quantum-purple bg-clip-text text-transparent">
              QUANTUM
            </span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-foreground/70 font-light tracking-widest">
            SEARCH
          </p>
          <p className="text-xs md:text-sm text-foreground/50 mt-3 md:mt-4 tracking-wide">
            AI-POWERED • FUTURISTIC • INTELLIGENT
          </p>
        </div>

        {/* Search Box */}
        <div className="w-full max-w-3xl mb-8 md:mb-12 px-2">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-quantum-blue to-quantum-purple rounded-2xl opacity-20 group-hover:opacity-30 blur transition-all duration-300" aria-hidden="true" />
            <div className="relative flex items-center bg-card/80 backdrop-blur-sm rounded-xl border border-border/30">
              <label htmlFor="search-input-home" className="sr-only">Search anything across the quantum web</label>
              <Search className="w-5 h-5 md:w-6 md:h-6 ml-4 md:ml-6 text-foreground/40" aria-hidden="true" />
              <Input
                id="search-input-home"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Search anything across the quantum web..."
                className="flex-1 px-4 md:px-6 py-4 md:py-6 text-base md:text-lg bg-transparent border-0 focus:ring-0 focus:ring-offset-0 placeholder:text-foreground/40"
              />
              <Button
                onClick={() => handleSearch()}
                disabled={isSearching || !query.trim()}
                className="mr-2 md:mr-3 bg-primary hover:bg-primary/90 text-primary-foreground px-6 md:px-8 py-4 md:py-6 text-base md:text-lg quantum-glow-subtle"
              >
                {isSearching ? (
                  <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" aria-hidden="true" />
                ) : (
                  <>
                    <Zap className="w-4 h-4 md:w-5 md:h-5 mr-2" aria-hidden="true" />
                    <span className="hidden sm:inline">Search</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Search History & Trending */}
        <div className="w-full max-w-3xl grid md:grid-cols-2 gap-4 md:gap-6 px-2">
          {/* Search History */}
          {searchHistory.length > 0 && (
            <Card className="p-4 md:p-6 bg-card/30 border-border/20">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <Clock className="w-4 h-4 text-foreground/60" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-foreground/80">Recent Searches</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchHistory.slice(0, 5).map((item, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    onClick={() => handleSearch(item)}
                    className="cursor-pointer hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all text-xs md:text-sm"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(item)}
                    aria-label={`Search for: ${item}`}
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Trending */}
          <Card className="p-4 md:p-6 bg-card/30 border-border/20">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <TrendingUp className="w-4 h-4 text-foreground/60" aria-hidden="true" />
              <h3 className="text-sm font-semibold text-foreground/80">Trending Now</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingQueries.map((item, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  onClick={() => handleSearch(item)}
                  className="cursor-pointer hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all text-xs md:text-sm"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(item)}
                  aria-label={`Search for: ${item}`}
                >
                  {item}
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* Feature Pills */}
        <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-2 md:gap-3 px-2">
          <Badge className="text-xs py-2 px-3 md:px-4 bg-primary/10 border-primary/30 text-foreground/80">
            <Sparkles className="w-3 h-3 mr-1" aria-hidden="true" />
            AI-Powered Results
          </Badge>
          <Badge className="text-xs py-2 px-3 md:px-4 bg-primary/10 border-primary/30 text-foreground/80">
            <Zap className="w-3 h-3 mr-1" aria-hidden="true" />
            Real-Time Insights
          </Badge>
          <Badge className="text-xs py-2 px-3 md:px-4 bg-primary/10 border-primary/30 text-foreground/80">
            <Globe className="w-3 h-3 mr-1" aria-hidden="true" />
            Global Search
          </Badge>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 md:py-6 text-center text-xs md:text-sm text-foreground/40 border-t border-border/10 mt-auto">
        <p className="flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3 md:w-4 md:h-4" aria-hidden="true" />
          <span>Quantum Search Engine • The Future of Search</span>
          <Sparkles className="w-3 h-3 md:w-4 md:h-4" aria-hidden="true" />
        </p>
      </footer>
    </div>
  );
}
