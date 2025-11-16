'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Calendar, Clock, Plus } from 'lucide-react';
import { format, addHours } from 'date-fns';

export default function ScheduleManager() {
  const { videos, updateVideo, settings, updateSettings } = useStore();
  const [selectedVideo, setSelectedVideo] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  const readyVideos = videos.filter(v => v.status === 'ready');
  const scheduledVideos = videos.filter(v => v.status === 'scheduled');

  const handleSchedule = () => {
    if (!selectedVideo || !scheduleDate || !scheduleTime) {
      alert('Please select a video and set date/time');
      return;
    }

    const scheduledFor = new Date(`${scheduleDate}T${scheduleTime}`);

    if (scheduledFor < new Date()) {
      alert('Cannot schedule in the past');
      return;
    }

    updateVideo(selectedVideo, {
      status: 'scheduled',
      scheduledFor,
    });

    setSelectedVideo('');
    setScheduleDate('');
    setScheduleTime('');
    alert('Video scheduled successfully!');
  };

  const handleAutoSchedule = () => {
    const { postsPerDay } = settings;
    const unscheduled = readyVideos.slice(0, postsPerDay * 7); // Schedule up to a week

    let scheduleTime = new Date();
    scheduleTime.setHours(scheduleTime.getHours() + 1, 0, 0, 0);

    const hoursInterval = 24 / postsPerDay;

    unscheduled.forEach((video) => {
      updateVideo(video.id, {
        status: 'scheduled',
        scheduledFor: new Date(scheduleTime),
      });
      scheduleTime = addHours(scheduleTime, hoursInterval);
    });

    alert(`Auto-scheduled ${unscheduled.length} videos!`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Auto-Schedule Settings</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Posts Per Day
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={settings.postsPerDay}
              onChange={(e) => updateSettings({ postsPerDay: parseInt(e.target.value) || 1 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.autoSchedule}
                onChange={(e) => updateSettings({ autoSchedule: e.target.checked })}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Enable Auto-Schedule</span>
            </label>
          </div>
        </div>

        <button
          onClick={handleAutoSchedule}
          disabled={readyVideos.length === 0}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <Calendar className="h-5 w-5 mr-2" />
          Auto-Schedule Ready Videos ({readyVideos.length})
        </button>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Manual Schedule</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Video
            </label>
            <select
              value={selectedVideo}
              onChange={(e) => setSelectedVideo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Choose a video...</option>
              {readyVideos.map((video) => (
                <option key={video.id} value={video.id}>
                  {video.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              min={format(new Date(), 'yyyy-MM-dd')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time
            </label>
            <input
              type="time"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          onClick={handleSchedule}
          disabled={!selectedVideo || !scheduleDate || !scheduleTime}
          className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Schedule Video
        </button>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Scheduled Posts</h3>

        {scheduledVideos.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No scheduled videos</p>
        ) : (
          <div className="space-y-3">
            {scheduledVideos
              .sort((a, b) => {
                const aTime = a.scheduledFor?.getTime() || 0;
                const bTime = b.scheduledFor?.getTime() || 0;
                return aTime - bTime;
              })
              .map((video) => (
                <div
                  key={video.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{video.title}</h4>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {video.scheduledFor && format(video.scheduledFor, 'MMM d, yyyy HH:mm')}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('Remove from schedule?')) {
                        updateVideo(video.id, {
                          status: 'ready',
                          scheduledFor: undefined,
                        });
                      }
                    }}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Unschedule
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
