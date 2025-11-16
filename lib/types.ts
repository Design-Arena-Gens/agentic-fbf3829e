export interface VideoScript {
  id: string;
  niche: string;
  hook: string;
  content: string;
  cta: string;
  estimatedDuration: number;
  visualSuggestions: string[];
  textOverlays: string[];
  captions: string;
  timestamp: Date;
}

export interface VideoAsset {
  id: string;
  scriptId: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  audioUrl?: string;
  status: 'draft' | 'generating' | 'ready' | 'scheduled' | 'published' | 'failed';
  title: string;
  description: string;
  tags: string[];
  createdAt: Date;
  scheduledFor?: Date;
  publishedAt?: Date;
  youtubeId?: string;
  error?: string;
}

export interface AnalyticsData {
  videoId: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  watchTime: number;
  ctr: number;
  engagement: number;
  lastUpdated: Date;
}

export interface TrendingTopic {
  keyword: string;
  volume: number;
  competition: string;
  relevance: number;
}

export interface GenerationSettings {
  niche: string;
  tone: 'casual' | 'professional' | 'enthusiastic' | 'educational';
  duration: 15 | 30 | 45 | 60;
  postsPerDay: number;
  autoSchedule: boolean;
  includeMusic: boolean;
  voiceType: 'male' | 'female' | 'neutral';
}
