import { VideoScript, TrendingTopic } from './types';

const HOOK_TEMPLATES = [
  "Did you know that {fact}?",
  "This will blow your mind...",
  "Stop scrolling! Here's why {topic}",
  "The secret to {benefit} is...",
  "You won't believe what happens when...",
  "I tried {action} for 30 days and...",
  "This {thing} changed everything",
  "Want to {goal}? Watch this!",
];

const CTA_TEMPLATES = [
  "Follow for more {niche} tips!",
  "Like if you learned something new!",
  "Comment your favorite {topic}!",
  "Share this with someone who needs to see it!",
  "Save this for later!",
  "Try this and let me know the results!",
  "Subscribe for daily {niche} content!",
];

export async function generateScript(
  niche: string,
  duration: number,
  tone: string,
  trendingTopics?: TrendingTopic[]
): Promise<VideoScript> {
  // Simulate trending topic selection
  const topic = trendingTopics?.[0]?.keyword || generateNicheTopic(niche);

  const hook = HOOK_TEMPLATES[Math.floor(Math.random() * HOOK_TEMPLATES.length)]
    .replace('{topic}', topic)
    .replace('{fact}', `${niche} can improve your life`)
    .replace('{benefit}', `mastering ${niche}`)
    .replace('{action}', topic)
    .replace('{thing}', topic)
    .replace('{goal}', `learn ${niche}`);

  const content = await generateMainContent(niche, topic, duration, tone);

  const cta = CTA_TEMPLATES[Math.floor(Math.random() * CTA_TEMPLATES.length)]
    .replace('{niche}', niche.toLowerCase())
    .replace('{topic}', topic);

  const visualSuggestions = generateVisualSuggestions(niche, topic);
  const textOverlays = generateTextOverlays(hook, content, cta);

  return {
    id: `script-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    niche,
    hook,
    content,
    cta,
    estimatedDuration: duration,
    visualSuggestions,
    textOverlays,
    captions: generateCaptions(hook, content, cta),
    timestamp: new Date(),
  };
}

function generateNicheTopic(niche: string): string {
  const topics: Record<string, string[]> = {
    'Tech Tips': ['AI tools', 'productivity hacks', 'app reviews', 'coding tricks'],
    'Fitness': ['workout routines', 'nutrition tips', 'weight loss', 'muscle building'],
    'Finance': ['saving money', 'investing', 'passive income', 'budgeting'],
    'Education': ['study techniques', 'learning methods', 'career advice', 'skill development'],
    'Motivation': ['success habits', 'mindset shifts', 'goal setting', 'personal growth'],
  };

  const nicheTopics = topics[niche] || ['tips and tricks', 'best practices', 'common mistakes'];
  return nicheTopics[Math.floor(Math.random() * nicheTopics.length)];
}

async function generateMainContent(
  niche: string,
  topic: string,
  duration: number,
  tone: string
): Promise<string> {
  const wordCount = Math.floor((duration / 60) * 150); // ~150 words per minute

  const contentPieces = [
    `Here's everything you need to know about ${topic} in ${niche}.`,
    `First, understand the basics.`,
    `Most people make these common mistakes.`,
    `The key is consistency and practice.`,
    `Apply this technique daily for best results.`,
    `This method has helped thousands of people.`,
  ];

  return contentPieces.slice(0, Math.ceil(wordCount / 25)).join(' ');
}

function generateVisualSuggestions(niche: string, topic: string): string[] {
  return [
    `Stock footage of ${topic.toLowerCase()}`,
    `Animated text explaining key points`,
    `B-roll showing ${niche.toLowerCase()} examples`,
    `Trending visual effects and transitions`,
    `Eye-catching thumbnail with bold text`,
    `Dynamic motion graphics`,
  ];
}

function generateTextOverlays(hook: string, content: string, cta: string): string[] {
  return [
    hook,
    'Watch This 👇',
    'Key Point #1',
    'Key Point #2',
    'Key Point #3',
    cta,
  ];
}

function generateCaptions(hook: string, content: string, cta: string): string {
  return `${hook}\n\n${content}\n\n${cta}\n\n#shorts #viral #trending`;
}

export async function getTrendingTopics(niche: string): Promise<TrendingTopic[]> {
  // Simulate trending topics (in production, this would call YouTube/Google Trends API)
  const mockTopics: TrendingTopic[] = [
    { keyword: `${niche} tutorial`, volume: 125000, competition: 'medium', relevance: 0.95 },
    { keyword: `best ${niche} tips`, volume: 89000, competition: 'high', relevance: 0.88 },
    { keyword: `${niche} for beginners`, volume: 67000, competition: 'low', relevance: 0.82 },
    { keyword: `${niche} hacks 2024`, volume: 54000, competition: 'medium', relevance: 0.79 },
  ];

  return mockTopics;
}

export async function optimizeKeywords(
  title: string,
  niche: string
): Promise<{ title: string; tags: string[]; description: string }> {
  const trendingTopics = await getTrendingTopics(niche);

  const tags = [
    niche.toLowerCase(),
    'shorts',
    'viral',
    'trending',
    ...trendingTopics.slice(0, 10).map(t => t.keyword.toLowerCase()),
    'youtube shorts',
    'short video',
    'quick tips',
  ];

  const description = `${title}\n\n` +
    `🔥 Trending ${niche} content!\n\n` +
    `📌 Key Topics:\n${trendingTopics.slice(0, 3).map(t => `• ${t.keyword}`).join('\n')}\n\n` +
    `👍 Like, Comment, and Subscribe for more ${niche} content!\n\n` +
    `#${tags.slice(0, 15).join(' #')}`;

  return {
    title: `${title} | ${niche} Shorts`,
    tags: tags.slice(0, 30),
    description,
  };
}
