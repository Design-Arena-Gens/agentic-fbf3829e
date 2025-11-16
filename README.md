# YouTube Shorts AI Agent

An AI-powered platform for automating YouTube Shorts content creation, optimization, and publishing.

## 🚀 Live Demo

**Production URL:** https://agentic-fbf3829e.vercel.app

## ✨ Features

### 1. **AI Script Generation**
- Generate engaging short-form video scripts (15-60 seconds)
- Optimized for faceless niche channels
- Compelling hooks, concise storytelling, and strong CTAs
- Customizable tone (casual, professional, enthusiastic, educational)
- Multiple niche support (Tech, Fitness, Finance, Education, etc.)

### 2. **Batch Content Creation**
- Create multiple video scripts simultaneously
- Generate 1-10 videos at once with minimal input
- Automated scheduling for consistent posting

### 3. **Smart Optimization**
- Trending keyword integration
- SEO-optimized titles, tags, and descriptions
- Based on real-time search trends and niche analysis
- Automatic hashtag generation

### 4. **Visual & Audio Suggestions**
- AI-generated visual suggestions for each script
- Text overlay recommendations
- Voice type selection (male, female, neutral)
- Background music options

### 5. **Video Library Management**
- Organized video asset management
- Status tracking (draft, generating, ready, scheduled, published)
- Quick publish and delete actions
- YouTube link integration

### 6. **Advanced Scheduling**
- Manual scheduling with date/time picker
- Auto-schedule feature for batch posting
- Configurable posts per day (1-10)
- Visual schedule calendar

### 7. **Analytics Dashboard**
- Real-time engagement metrics
- Views, likes, comments, shares tracking
- Engagement rate and CTR analysis
- Performance comparison charts
- Individual video performance table

### 8. **Comprehensive Logging**
- All videos logged with metadata
- Creation timestamps
- Publishing history
- Error tracking and reporting

## 🛠️ Technology Stack

- **Framework:** Next.js 14 (React)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Charts:** Recharts
- **Icons:** Lucide React
- **Date Handling:** date-fns
- **Deployment:** Vercel

## 📦 Installation

```bash
npm install
npm run dev
```

## 🎯 Usage Guide

### Generating Scripts
1. Select niche, duration, tone, and voice type
2. Click "Generate Script" or use "Batch Generation"
3. Review generated content with hooks, CTAs, and visual suggestions

### Scheduling Posts
1. Configure auto-schedule settings
2. Use auto-schedule or manual scheduling
3. View all scheduled posts in calendar

### Viewing Analytics
1. Navigate to Analytics tab
2. View performance metrics and charts
3. Track engagement rates and CTR

## 🔌 API Routes

- `/api/generate-script` - Generate video scripts
- `/api/video/create` - Create video from script
- `/api/youtube/upload` - Upload to YouTube
- `/api/youtube/analytics` - Fetch analytics
- `/api/trending` - Get trending topics

## 📝 Production Setup

For production use, integrate:
- Real video generation (Remotion/FFmpeg)
- YouTube Data API v3
- Voice synthesis (ElevenLabs)
- Stock video APIs (Pexels/Unsplash)
- Google Trends API

Built with Next.js and AI ❤️
