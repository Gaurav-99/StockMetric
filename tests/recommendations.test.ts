import { getRecommendation } from '@/lib/recommendations'
import { RiskProfile, InvestmentHorizon } from '@prisma/client'
import { StockPrice } from '@/lib/stockService'
import { NewsArticle } from '@/lib/newsService'

describe('Recommendation Engine', () => {
    const mockStock: StockPrice = {
        symbol: 'TEST',
        currentPrice: 100,
        change: 5,
        changePercent: 5,
        lastUpdated: new Date().toISOString(),
    }

    const mockNews: NewsArticle[] = [
        {
            title: 'Good News',
            sentiment: 'POSITIVE',
            source: 'Test',
            publishedAt: new Date().toISOString(),
            summary: 'Test',
            url: 'Test',
        },
    ]

    it('suggests SELL for Moderate profile when price rises > 5%', () => {
        const result = getRecommendation(mockStock, mockNews, {
            riskProfile: RiskProfile.MODERATE,
            investmentHorizon: InvestmentHorizon.MEDIUM_TERM,
        })
        expect(result.action).toBe('SELL')
        expect(result.reason).toContain('Take profit')
    })

    it('suggests BUY for Aggressive profile when trend is bullish', () => {
        const result = getRecommendation(mockStock, mockNews, {
            riskProfile: RiskProfile.AGGRESSIVE,
            investmentHorizon: InvestmentHorizon.MEDIUM_TERM,
        })
        expect(result.action).toBe('BUY')
        expect(result.reason).toContain('Momentum is strong')
    })

    it('suggests HOLD for Conservative profile despite gains', () => {
        const conservativeStock = { ...mockStock, changePercent: 1.5 }
        const result = getRecommendation(conservativeStock, mockNews, {
            riskProfile: RiskProfile.CONSERVATIVE,
            investmentHorizon: InvestmentHorizon.MEDIUM_TERM,
        })
        expect(result.action).toBe('HOLD')
        expect(result.reason).toContain('Steady gains')
    })
})
