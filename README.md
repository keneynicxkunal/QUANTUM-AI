# 🚀 QUANTUM - AI-Powered Search Engine

A next-generation search engine powered by cutting-edge AI technology, designed to deliver intelligent results and real-time insights. Experience the future of search with QUANTUM.

## ✨ Technology Stack

QUANTUM is built with modern, production-ready technologies:

### 🎯 Core Framework
- **⚡ Next.js 16** - The React framework for production with App Router
- **📘 TypeScript 5** - Type-safe JavaScript for better developer experience
- **🎨 Tailwind CSS 4** - Utility-first CSS framework for rapid UI development

### 🧩 UI Components & Styling
- **🧩 shadcn/ui** - High-quality, accessible components built on Radix UI
- **🎯 Lucide React** - Beautiful & consistent icon library
- **🎨 Next Themes** - Perfect dark mode in 2 lines of code

### 🔄 State Management & Data Fetching
- **🌐 Fetch** - Promise-based HTTP request
- **z-ai-web-dev-sdk** - AI-powered search and content generation

### 🎨 Advanced UI Features
- **🎨 Canvas API** - High-performance particle animations
- **📊 Custom Design System** - Quantum-themed color palette and animations

## 🎯 Why QUANTUM?

- **🤖 AI-Powered** - Intelligent search results and insights
- **🎨 Beautiful UI** - Futuristic quantum computing theme with particle animations
- **🌐 Real-Time Search** - Fast, accurate web search results
- **💡 Smart Insights** - AI-generated summaries and key points
- **📱 Responsive** - Mobile-first design with smooth animations
- **🎭 Quantum Theme** - Dark futuristic aesthetic with glowing effects
- **⚡ Fast & Efficient** - Optimized for performance
- **♿ Accessible** - WCAG AA compliant with full keyboard support

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Start production server
bun start
```

Open [http://localhost:3000](http://localhost:3000) to see QUANTUM running.

## 🌟 Features

### 🔍 Intelligent Search
- **Real-Time Web Search** - Powered by advanced web search API
- **AI-Generated Insights** - Automatic summaries and key points for each query
- **Smart Results** - Relevant, accurate search results with source attribution
- **Search History** - Persistent search history for quick access

### 🎨 Visual Experience
- **Quantum Particle Background** - Animated particles with dynamic connections
- **Glowing Effects** - Neon cyan, blue, purple, and teal accents
- **Smooth Animations** - Quantum-float, quantum-pulse, and quantum-spin effects
- **Gradient Backgrounds** - Beautiful mesh gradients with multiple color stops
- **Custom Scrollbars** - Styled scrollbars matching the quantum theme

### 📱 Responsive Design
- **Mobile-First** - Optimized for mobile devices (375px+)
- **Tablet & Desktop** - Enhanced layouts for larger screens
- **Touch-Friendly** - 44px+ minimum touch targets
- **Flexible Grid** - Responsive layouts that adapt to screen size

### ♿ Accessibility
- **WCAG AA Compliant** - High contrast ratios for text and backgrounds
- **Semantic HTML** - Proper use of `<main>`, `<header>`, `<footer>`, `<section>`
- **ARIA Labels** - Screen reader-friendly with proper labels and roles
- **Keyboard Navigation** - All interactive elements accessible via keyboard
- **Reduced Motion** - Respects `prefers-reduced-motion` setting

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── api/             # API endpoints
│   │   ├── search/       # Web search endpoint
│   │   └── ai-summary/  # AI summary endpoint
│   ├── layout.tsx        # Root layout with metadata
│   ├── page.tsx          # Main search page
│   └── globals.css      # Quantum design system
├── components/          # Reusable React components
│   └── ui/             # shadcn/ui components
└── lib/                # Utility functions and configurations
```

## 🎨 Quantum Theme

### Color Palette
- **Background**: Deep dark with subtle quantum mesh
- **Primary**: Glowing cyan (oklch)
- **Secondary**: Quantum blue
- **Accents**: Purple and teal gradients
- **Glow Effects**: Soft neon glows on interactive elements

### Animations
- **quantum-float**: Gentle floating animation
- **quantum-pulse**: Pulsing glow effect
- **quantum-spin**: Slow rotation for decorative elements

### Effects
- **quantum-glow**: Strong glow for primary elements
- **quantum-glow-subtle**: Subtle glow for cards and secondary elements
- **quantum-border**: Quantum-themed border with cyan glow
- **quantum-text-glow**: Text glow effect for titles and links

## 🔧 API Endpoints

### `/api/search`
Performs web search using the AI-powered search API.

**Query Parameters:**
- `q` (required): Search query string

**Response:**
```json
{
  "success": true,
  "query": "search term",
  "totalResults": 10,
  "results": [...]
}
```

### `/api/ai-summary`
Generates AI-powered insights and key points for a search query.

**Query Parameters:**
- `q` (required): Search query string

**Response:**
```json
{
  "success": true,
  "query": "search term",
  "data": {
    "summary": "AI-generated summary",
    "keyPoints": ["point 1", "point 2", "point 3"]
  }
}
```

## 🚀 How to Use

1. **Visit** the QUANTUM search page
2. **Enter** your search query in the search box
3. **Click** "Search" or press Enter
4. **View** AI-generated insights and key points
5. **Browse** search results with source attribution
6. **Click** on results to visit the original sources

**Features to try:**
- Use **Trending Queries** for popular searches
- Check **Recent Searches** for quick access
- Click **"New Search"** to return to the homepage
- Use **keyboard navigation** for accessibility

## 🌟 Key Highlights

- **No External Branding** - Pure QUANTUM experience
- **AI-Powered** - Intelligent search with LLM-generated insights
- **Beautiful Design** - Quantum computing aesthetic
- **Fast Performance** - Optimized animations and API calls
- **Fully Responsive** - Works on all devices
- **Accessible** - WCAG AA compliant
- **Production Ready** - Built for scale

---

Built with ❤️ for the future of search. Welcome to QUANTUM 🚀
