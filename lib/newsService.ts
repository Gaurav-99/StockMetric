'use server'

import YahooFinance from 'yahoo-finance2'
const yahooFinance = new YahooFinance()

export interface NewsArticle {
    title: string
    source: string
    publishedAt: string
    summary: string
    url: string
    sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'
}

// Helper to map Yahoo News result to our NewsArticle interface
function mapYahooNewsToArticle(newsItem: any): NewsArticle {
    return {
        title: newsItem.title,
        source: newsItem.publisher || 'Yahoo Finance',
        publishedAt: newsItem.providerPublishTime ? new Date(newsItem.providerPublishTime).toISOString() : new Date().toISOString(),
        summary: 'Click to read full article...', // Yahoo search result doesn't always have a summary/snippet
        url: newsItem.link,
        sentiment: 'NEUTRAL', // Yahoo doesn't provide sentiment, defaulting to Neutral
    }
}

export async function getStockNews(symbol: string): Promise<NewsArticle[]> {
    try {
        // Search for the symbol to get related news
        const result = await yahooFinance.search(symbol, { newsCount: 5 })

        if (result.news && result.news.length > 0) {
            return result.news.map(mapYahooNewsToArticle)
        }

        return []
    } catch (error) {
        console.error(`Error fetching news for ${symbol}:`, error)
        return []
    }
}

export async function getGlobalNews(): Promise<NewsArticle[]> {
    try {
        const queries = [
            'Indian Stock Market',
            'Nifty 50',
            'Sensex',
            'Bank Nifty',
            'Indian Economy',
            'RBI India'
        ]

        // Run searches in parallel
        const results = await Promise.all(
            queries.map(q => yahooFinance.search(q, { newsCount: 10 }))
        )

        // Aggregated news
        let allNews: any[] = []
        results.forEach(res => {
            if (res.news) {
                allNews = [...allNews, ...res.news]
            }
        })

        // Deduplicate by title to avoid repeats
        const seen = new Set()
        const uniqueNews: NewsArticle[] = []

        for (const item of allNews) {
            if (!seen.has(item.title)) {
                seen.add(item.title)
                uniqueNews.push(mapYahooNewsToArticle(item))
            }
        }

        // Sort by date descending
        return uniqueNews.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    } catch (error) {
        console.error('Error fetching global news:', error)
        return []
    }
}
