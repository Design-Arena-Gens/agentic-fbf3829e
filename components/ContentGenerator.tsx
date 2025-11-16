'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { generateScript, optimizeKeywords } from '@/lib/scriptGenerator';
import { VideoScript, VideoAsset } from '@/lib/types';
import { Sparkles, Loader2, Play } from 'lucide-react';

export default function ContentGenerator() {
  const { settings, addScript, addVideo, updateSettings } = useStore();
  const [loading, setLoading] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<VideoScript | null>(null);
  const [batchCount, setBatchCount] = useState(1);

  const niches = [
    'Tech Tips',
    'Fitness',
    'Finance',
    'Education',
    'Motivation',
    'Gaming',
    'Cooking',
    'DIY',
    'Travel',
    'Fashion',
  ];

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const script = await generateScript(
        settings.niche,
        settings.duration,
        settings.tone
      );
      setGeneratedScript(script);
      addScript(script);
    } catch (error) {
      console.error('Error generating script:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBatchGenerate = async () => {
    setLoading(true);
    try {
      for (let i = 0; i < batchCount; i++) {
        const script = await generateScript(
          settings.niche,
          settings.duration,
          settings.tone
        );
        addScript(script);

        // Create video asset
        const keywords = await optimizeKeywords(
          `${settings.niche} Tips #${i + 1}`,
          settings.niche
        );

        const video: VideoAsset = {
          id: `video-${Date.now()}-${i}`,
          scriptId: script.id,
          status: 'draft',
          title: keywords.title,
          description: keywords.description,
          tags: keywords.tags,
          createdAt: new Date(),
        };
        addVideo(video);

        // Small delay between generations
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      alert(`Successfully generated ${batchCount} video scripts!`);
    } catch (error) {
      console.error('Error in batch generation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVideo = async () => {
    if (!generatedScript) return;

    setLoading(true);
    try {
      const keywords = await optimizeKeywords(
        `Amazing ${settings.niche} Content`,
        settings.niche
      );

      const video: VideoAsset = {
        id: `video-${Date.now()}`,
        scriptId: generatedScript.id,
        status: 'generating',
        title: keywords.title,
        description: keywords.description,
        tags: keywords.tags,
        createdAt: new Date(),
      };

      addVideo(video);

      // Simulate video generation
      setTimeout(() => {
        video.status = 'ready';
        video.videoUrl = '/demo-video.mp4';
        video.thumbnailUrl = 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg';
        addVideo(video);
        alert('Video created successfully!');
      }, 2000);
    } catch (error) {
      console.error('Error creating video:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Niche
          </label>
          <select
            value={settings.niche}
            onChange={(e) => updateSettings({ niche: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {niches.map((niche) => (
              <option key={niche} value={niche}>
                {niche}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration (seconds)
          </label>
          <select
            value={settings.duration}
            onChange={(e) => updateSettings({ duration: parseInt(e.target.value) as any })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value={15}>15 seconds</option>
            <option value={30}>30 seconds</option>
            <option value={45}>45 seconds</option>
            <option value={60}>60 seconds</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tone
          </label>
          <select
            value={settings.tone}
            onChange={(e) => updateSettings({ tone: e.target.value as any })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="casual">Casual</option>
            <option value="professional">Professional</option>
            <option value="enthusiastic">Enthusiastic</option>
            <option value="educational">Educational</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Voice Type
          </label>
          <select
            value={settings.voiceType}
            onChange={(e) => updateSettings({ voiceType: e.target.value as any })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="neutral">Neutral</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5 mr-2" />
              Generate Script
            </>
          )}
        </button>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Batch Generation</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Videos
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={batchCount}
              onChange={(e) => setBatchCount(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleBatchGenerate}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center mt-6"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Batch'
            )}
          </button>
        </div>
      </div>

      {generatedScript && (
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Script</h3>

          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-600">Hook:</span>
              <p className="text-gray-900 mt-1">{generatedScript.hook}</p>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-600">Content:</span>
              <p className="text-gray-900 mt-1">{generatedScript.content}</p>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-600">Call to Action:</span>
              <p className="text-gray-900 mt-1">{generatedScript.cta}</p>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-600">Visual Suggestions:</span>
              <ul className="list-disc list-inside mt-1 space-y-1">
                {generatedScript.visualSuggestions.map((suggestion, index) => (
                  <li key={index} className="text-gray-700">{suggestion}</li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-600">Text Overlays:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {generatedScript.textOverlays.map((overlay, index) => (
                  <span
                    key={index}
                    className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-300"
                  >
                    {overlay}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-600">Captions:</span>
              <p className="text-gray-900 mt-1 whitespace-pre-line">{generatedScript.captions}</p>
            </div>

            <button
              onClick={handleCreateVideo}
              disabled={loading}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Creating Video...
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  Create Video from Script
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
