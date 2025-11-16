'use client';

import { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import ContentGenerator from '@/components/ContentGenerator';
import VideoLibrary from '@/components/VideoLibrary';
import ScheduleManager from '@/components/ScheduleManager';
import Analytics from '@/components/Analytics';
import { Video, Play, Calendar, BarChart3, Settings } from 'lucide-react';

type Tab = 'generator' | 'library' | 'schedule' | 'analytics' | 'settings';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('generator');

  const tabs = [
    { id: 'generator' as Tab, label: 'Generate', icon: Video },
    { id: 'library' as Tab, label: 'Library', icon: Play },
    { id: 'schedule' as Tab, label: 'Schedule', icon: Calendar },
    { id: 'analytics' as Tab, label: 'Analytics', icon: BarChart3 },
    { id: 'settings' as Tab, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Video className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                YouTube Shorts AI Agent
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Dashboard />

        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors
                      ${
                        activeTab === tab.id
                          ? 'border-purple-600 text-purple-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'generator' && <ContentGenerator />}
            {activeTab === 'library' && <VideoLibrary />}
            {activeTab === 'schedule' && <ScheduleManager />}
            {activeTab === 'analytics' && <Analytics />}
            {activeTab === 'settings' && (
              <div className="text-center py-12 text-gray-500">
                <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Settings panel - Configure API keys, channels, and preferences</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
