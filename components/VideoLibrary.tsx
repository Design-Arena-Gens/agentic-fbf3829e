'use client';

import { useStore } from '@/lib/store';
import { Trash2, Calendar, Upload, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

export default function VideoLibrary() {
  const { videos, deleteVideo, updateVideo } = useStore();

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      generating: 'bg-blue-100 text-blue-800',
      ready: 'bg-green-100 text-green-800',
      scheduled: 'bg-yellow-100 text-yellow-800',
      published: 'bg-purple-100 text-purple-800',
      failed: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this video?')) {
      deleteVideo(id);
    }
  };

  const handlePublish = async (video: any) => {
    if (confirm('Publish this video to YouTube now?')) {
      updateVideo(video.id, {
        status: 'published',
        publishedAt: new Date(),
        youtubeId: `yt-${Date.now()}`
      });
      alert('Video published successfully!');
    }
  };

  return (
    <div className="space-y-4">
      {videos.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No videos yet</p>
          <p className="text-sm mt-2">Generate your first video script to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {video.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        video.status
                      )}`}
                    >
                      {video.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {video.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {video.tags.slice(0, 5).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                    {video.tags.length > 5 && (
                      <span className="text-gray-500 text-xs py-1">
                        +{video.tags.length - 5} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Created: {format(video.createdAt, 'MMM d, yyyy HH:mm')}</span>
                    {video.scheduledFor && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Scheduled: {format(video.scheduledFor, 'MMM d, yyyy HH:mm')}
                      </span>
                    )}
                    {video.publishedAt && (
                      <span>Published: {format(video.publishedAt, 'MMM d, yyyy HH:mm')}</span>
                    )}
                  </div>

                  {video.youtubeId && (
                    <a
                      href={`https://youtube.com/shorts/${video.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 mt-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View on YouTube
                    </a>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  {video.status === 'ready' && (
                    <button
                      onClick={() => handlePublish(video)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Publish now"
                    >
                      <Upload className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete video"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {video.error && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">
                    <strong>Error:</strong> {video.error}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
