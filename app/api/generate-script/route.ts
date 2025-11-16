import { NextResponse } from 'next/server';
import { generateScript, getTrendingTopics } from '@/lib/scriptGenerator';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { niche, duration, tone } = body;

    if (!niche || !duration || !tone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const trendingTopics = await getTrendingTopics(niche);
    const script = await generateScript(niche, duration, tone, trendingTopics);

    return NextResponse.json({ script });
  } catch (error) {
    console.error('Error generating script:', error);
    return NextResponse.json(
      { error: 'Failed to generate script' },
      { status: 500 }
    );
  }
}
