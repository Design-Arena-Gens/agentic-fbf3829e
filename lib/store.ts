import { create } from 'zustand';
import { VideoScript, VideoAsset, AnalyticsData, GenerationSettings } from './types';

interface AppState {
  scripts: VideoScript[];
  videos: VideoAsset[];
  analytics: AnalyticsData[];
  settings: GenerationSettings;

  addScript: (script: VideoScript) => void;
  addVideo: (video: VideoAsset) => void;
  updateVideo: (id: string, updates: Partial<VideoAsset>) => void;
  deleteVideo: (id: string) => void;
  updateSettings: (settings: Partial<GenerationSettings>) => void;
  addAnalytics: (data: AnalyticsData) => void;
}

export const useStore = create<AppState>((set) => ({
  scripts: [],
  videos: [],
  analytics: [],
  settings: {
    niche: 'Tech Tips',
    tone: 'enthusiastic',
    duration: 30,
    postsPerDay: 3,
    autoSchedule: true,
    includeMusic: true,
    voiceType: 'neutral',
  },

  addScript: (script) =>
    set((state) => ({ scripts: [...state.scripts, script] })),

  addVideo: (video) =>
    set((state) => ({ videos: [...state.videos, video] })),

  updateVideo: (id, updates) =>
    set((state) => ({
      videos: state.videos.map((v) =>
        v.id === id ? { ...v, ...updates } : v
      ),
    })),

  deleteVideo: (id) =>
    set((state) => ({
      videos: state.videos.filter((v) => v.id !== id),
    })),

  updateSettings: (settings) =>
    set((state) => ({
      settings: { ...state.settings, ...settings },
    })),

  addAnalytics: (data) =>
    set((state) => ({
      analytics: [...state.analytics.filter((a) => a.videoId !== data.videoId), data],
    })),
}));
