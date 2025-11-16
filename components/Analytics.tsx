'use client';

import { useStore } from '@/lib/store';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Eye, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { useEffect } from 'react';

export default function Analytics() {
  const { videos, analytics, addAnalytics } = useStore();

  // Generate mock analytics for published videos
  useEffect(() => {
    videos
      .filter(v => v.status === 'published' && v.youtubeId)
      .forEach(video => {
        const existing = analytics.find(a => a.videoId === video.id);
        if (!existing) {
          addAnalytics({
            videoId: video.id,
            views: Math.floor(Math.random() * 50000) + 1000,
            likes: Math.floor(Math.random() * 2000) + 50,
            comments: Math.floor(Math.random() * 500) + 10,
            shares: Math.floor(Math.random() * 300) + 5,
            watchTime: Math.floor(Math.random() * 80) + 20,
            ctr: Math.random() * 10 + 2,
            engagement: Math.random() * 8 + 1,
            lastUpdated: new Date(),
          });
        }
      });
  }, [videos, analytics, addAnalytics]);

  const publishedVideos = videos.filter(v => v.status === 'published');

  const totalStats = {
    views: analytics.reduce((sum, a) => sum + a.views, 0),
    likes: analytics.reduce((sum, a) => sum + a.likes, 0),
    comments: analytics.reduce((sum, a) => sum + a.comments, 0),
    shares: analytics.reduce((sum, a) => sum + a.shares, 0),
    avgEngagement: analytics.length > 0
      ? (analytics.reduce((sum, a) => sum + a.engagement, 0) / analytics.length).toFixed(2)
      : '0',
    avgCtr: analytics.length > 0
      ? (analytics.reduce((sum, a) => sum + a.ctr, 0) / analytics.length).toFixed(2)
      : '0',
  };

  const chartData = publishedVideos.map((video, index) => {
    const videoAnalytics = analytics.find(a => a.videoId === video.id);
    return {
      name: `Video ${index + 1}`,
      views: videoAnalytics?.views || 0,
      likes: videoAnalytics?.likes || 0,
      engagement: videoAnalytics?.engagement || 0,
    };
  });

  const engagementData = publishedVideos.map((video, index) => {
    const videoAnalytics = analytics.find(a => a.videoId === video.id);
    return {
      name: `Video ${index + 1}`,
      ctr: videoAnalytics?.ctr || 0,
      engagement: videoAnalytics?.engagement || 0,
      watchTime: videoAnalytics?.watchTime || 0,
    };
  });

  const statCards = [
    { title: 'Total Views', value: totalStats.views.toLocaleString(), icon: Eye, color: 'bg-blue-500' },
    { title: 'Total Likes', value: totalStats.likes.toLocaleString(), icon: ThumbsUp, color: 'bg-green-500' },
    { title: 'Total Comments', value: totalStats.comments.toLocaleString(), icon: MessageCircle, color: 'bg-purple-500' },
    { title: 'Total Shares', value: totalStats.shares.toLocaleString(), icon: Share2, color: 'bg-pink-500' },
  ];

  return (
    <div className="space-y-6">
      {publishedVideos.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No published videos yet</p>
          <p className="text-sm mt-2">Publish your first video to see analytics!</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{card.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">{card.value}</p>
                    </div>
                    <div className={`${card.color} rounded-full p-3`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Views & Likes</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="views" fill="#3b82f6" />
                  <Bar dataKey="likes" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Metrics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="engagement" stroke="#8b5cf6" strokeWidth={2} />
                  <Line type="monotone" dataKey="ctr" stroke="#ec4899" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Video Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Video</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">Views</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">Likes</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">Comments</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">Engagement</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">CTR</th>
                  </tr>
                </thead>
                <tbody>
                  {publishedVideos.map((video) => {
                    const videoAnalytics = analytics.find(a => a.videoId === video.id);
                    return (
                      <tr key={video.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900 truncate max-w-xs">{video.title}</p>
                            <p className="text-sm text-gray-500">
                              {video.publishedAt && format(video.publishedAt, 'MMM d, yyyy')}
                            </p>
                          </div>
                        </td>
                        <td className="text-right py-3 px-4 text-gray-900">
                          {videoAnalytics?.views.toLocaleString() || 0}
                        </td>
                        <td className="text-right py-3 px-4 text-gray-900">
                          {videoAnalytics?.likes.toLocaleString() || 0}
                        </td>
                        <td className="text-right py-3 px-4 text-gray-900">
                          {videoAnalytics?.comments.toLocaleString() || 0}
                        </td>
                        <td className="text-right py-3 px-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {videoAnalytics?.engagement.toFixed(1) || 0}%
                          </span>
                        </td>
                        <td className="text-right py-3 px-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {videoAnalytics?.ctr.toFixed(1) || 0}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Average Engagement Rate</h3>
              </div>
              <p className="text-4xl font-bold text-purple-600">{totalStats.avgEngagement}%</p>
              <p className="text-sm text-gray-600 mt-2">Across all published videos</p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-6 border border-pink-200">
              <div className="flex items-center gap-3 mb-2">
                <Eye className="h-6 w-6 text-pink-600" />
                <h3 className="text-lg font-semibold text-gray-900">Average Click-Through Rate</h3>
              </div>
              <p className="text-4xl font-bold text-pink-600">{totalStats.avgCtr}%</p>
              <p className="text-sm text-gray-600 mt-2">Across all published videos</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
