import { RiskProfile, InvestmentHorizon } from '@prisma/client'
import { StockPrice } from './stockService'
import { NewsArticle } from './newsService'

export type Recommendation = 'BUY' | 'SELL' | 'HOLD' | 'WATCHLIST'

export interface RecommendationResult {
    action: Recommendation
    reason: string
}

export function getRecommendation(
    stock: StockPrice,
    news: NewsArticle[],
    userProfile: { riskProfile: RiskProfile; investmentHorizon: InvestmentHorizon }
): RecommendationResult {
    // Simple heuristic logic (Educational Purpose Only)

    const newsSentimentScore = news.reduce((acc, article) => {
        if (article.sentiment === 'POSITIVE') return acc + 1
        if (article.sentiment === 'NEGATIVE') return acc - 1
        return acc
    }, 0)

    const isBullish = stock.changePercent > 0 && newsSentimentScore >= 0
    const isBearish = stock.changePercent < -2 || newsSentimentScore < -1

    // Conservative Logic
    if (userProfile.riskProfile === 'CONSERVATIVE') {
        if (isBearish) return { action: 'SELL', reason: 'High volatility and negative sentiment detected.' }
        if (stock.changePercent > 1 && newsSentimentScore > 0) return { action: 'HOLD', reason: 'Steady gains, but caution advised.' }
        return { action: 'HOLD', reason: 'Market is stable, hold current position.' }
    }

    // Aggressive Logic
    if (userProfile.riskProfile === 'AGGRESSIVE') {
        if (isBullish) return { action: 'BUY', reason: 'Momentum is strong and news is positive.' }
        if (isBearish) return { action: 'SELL', reason: 'Trend reversal detected.' }
    }

    // Moderate / Default
    if (stock.changePercent >= 5) return { action: 'SELL', reason: 'Take profit on recent rally.' }
    if (stock.changePercent <= -5 && newsSentimentScore >= 0) return { action: 'BUY', reason: 'Buy the dip opportunity.' }

    return { action: 'HOLD', reason: 'No clear signal. Maintain position.' }
}
