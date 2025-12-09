// Mock News Service

export interface NewsArticle {
    title: string
    source: string
    publishedAt: string
    summary: string
    url: string
    sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'
}

const MOCK_NEWS = [
    {
        title: 'Market hits fresh highs led by banking stocks',
        source: 'Financial Times',
        summary: 'Indian indices surged today with Nifty crossing 20k mark.',
        sentiment: 'POSITIVE' as const,
    },
    {
        title: 'Inflation concerns loom over global markets',
        source: 'Market Watch',
        summary: 'Rising oil prices might trigger another round of inflation.',
        sentiment: 'NEGATIVE' as const,
    },
    {
        title: 'Quarterly results preview: IT sector likely to remain muted',
        source: 'Tech Daily',
        summary: 'Analysts expect flat growth for major IT giants.',
        sentiment: 'NEUTRAL' as const,
    },
]

export async function getStockNews(symbol: string): Promise<NewsArticle[]> {
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Return random subset + symbol specific (mocked)
    const articles = [
        {
            title: `${symbol} announces new strategic partnership`,
            source: 'Business Standard',
            publishedAt: new Date().toISOString(),
            summary: `${symbol} shares rose after the announcement.`,
            url: '#',
            sentiment: 'POSITIVE' as const,
        },
        ...MOCK_NEWS.map(n => ({ ...n, publishedAt: new Date().toISOString(), url: '#' }))
    ]

    return articles
}

export async function getGlobalNews(): Promise<NewsArticle[]> {
    return MOCK_NEWS.map(n => ({ ...n, publishedAt: new Date().toISOString(), url: '#' }))
}
