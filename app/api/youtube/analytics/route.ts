import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('videoId');

    if (!videoId) {
      return NextResponse.json(
        { error: 'Video ID required' },
        { status: 400 }
      );
    }

    // In production, this would fetch real data from YouTube Analytics API
    // For demo, generate mock analytics
    const analytics = {
      videoId,
      views: Math.floor(Math.random() * 50000) + 1000,
      likes: Math.floor(Math.random() * 2000) + 50,
      comments: Math.floor(Math.random() * 500) + 10,
      shares: Math.floor(Math.random() * 300) + 5,
      watchTime: Math.floor(Math.random() * 80) + 20,
      ctr: Math.random() * 10 + 2,
      engagement: Math.random() * 8 + 1,
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
