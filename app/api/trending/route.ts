import { NextResponse } from 'next/server';
import { getTrendingTopics } from '@/lib/scriptGenerator';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const niche = searchParams.get('niche') || 'General';

    const topics = await getTrendingTopics(niche);

    return NextResponse.json({ topics });
  } catch (error) {
    console.error('Error fetching trending topics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trending topics' },
      { status: 500 }
    );
  }
}
