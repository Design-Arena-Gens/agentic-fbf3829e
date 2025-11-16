'use client';

import { useStore } from '@/lib/store';
import { Video, Clock, TrendingUp, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const { videos, analytics } = useStore();

  const stats = {
    totalVideos: videos.length,
    published: videos.filter(v => v.status === 'published').length,
    scheduled: videos.filter(v => v.status === 'scheduled').length,
    totalViews: analytics.reduce((sum, a) => sum + a.views, 0),
    avgEngagement: analytics.length > 0
      ? (analytics.reduce((sum, a) => sum + a.engagement, 0) / analytics.length).toFixed(1)
      : '0',
  };

  const cards = [
    {
      title: 'Total Videos',
      value: stats.totalVideos,
      icon: Video,
      color: 'bg-blue-500',
    },
    {
      title: 'Published',
      value: stats.published,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      title: 'Scheduled',
      value: stats.scheduled,
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      title: 'Total Views',
      value: stats.totalViews.toLocaleString(),
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
              </div>
              <div className={`${card.color} rounded-full p-3`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
