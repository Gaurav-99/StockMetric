import { getStockPrice } from '@/lib/stockService'
import { getStockNews } from '@/lib/newsService'
import StockChart from '@/components/StockChart'
import { ArrowUp, ArrowDown, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { getRecommendation } from '@/lib/recommendations'
import { RiskProfile, InvestmentHorizon } from '@prisma/client'

export default async function StockDetailPage({ params }: { params: { symbol: string } }) {
    try {
        const symbol = params.symbol.toUpperCase()
        const price = await getStockPrice(symbol)
        const news = await getStockNews(symbol)
        const session = await getServerSession(authOptions)

        // @ts-ignore
        const riskProfile = session?.user?.riskProfile || 'MODERATE' as RiskProfile
        // @ts-ignore
        const investmentHorizon = session?.user?.investmentHorizon || 'MEDIUM_TERM' as InvestmentHorizon

        const recommendation = getRecommendation(price, news, { riskProfile, investmentHorizon })

        const isPositive = price.change >= 0

        return (
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">{symbol}</h1>
                    <div className="text-right">
                        <div className="text-3xl font-bold">₹{price.currentPrice.toLocaleString()}</div>
                        <div className={`flex items-center justify-end text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                            {Math.abs(price.change)} ({Math.abs(price.changePercent)}%)
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <StockChart symbol={symbol} />

                        <div className={`p-4 rounded-lg border-l-4 ${recommendation.action === 'BUY' ? 'bg-green-50 border-green-500' :
                            recommendation.action === 'SELL' ? 'bg-red-50 border-red-500' :
                                'bg-yellow-50 border-yellow-500'
                            }`}>
                            <div className="flex items-start">
                                <Lightbulb className={`h-5 w-5 mr-3 ${recommendation.action === 'BUY' ? 'text-green-600' :
                                    recommendation.action === 'SELL' ? 'text-red-600' :
                                        'text-yellow-600'
                                    }`} />
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        AI Suggestion: <span className="font-bold">{recommendation.action}</span>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-700">{recommendation.reason}</p>
                                    <p className="mt-2 text-xs text-gray-500 italic">
                                        Note: This is based on your {riskProfile} risk profile and {investmentHorizon} horizon. Not financial advice.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Latest News</h3>
                            <div className="space-y-4">
                                {news.map((article, idx) => (
                                    <div key={idx} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="block hover:bg-gray-50 -mx-2 p-2 rounded">
                                            <h4 className="text-sm font-bold text-gray-900">{article.title}</h4>
                                            <p className="text-xs text-gray-500 mt-1">{article.source} • {new Date(article.publishedAt).toLocaleDateString()}</p>
                                            <p className="text-sm text-gray-600 mt-2">{article.summary}</p>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Key Metrics</h3>
                            {/* Placeholder metrics */}
                            <dl className="grid grid-cols-1 gap-4 text-sm">
                                <div className="flex justify-between border-b pb-2">
                                    <dt className="text-gray-500">Market Cap</dt>
                                    <dd className="font-medium">₹15.4T</dd>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <dt className="text-gray-500">52W High</dt>
                                    <dd className="font-medium">₹2,850</dd>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <dt className="text-gray-500">52W Low</dt>
                                    <dd className="font-medium">₹2,200</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-500">P/E Ratio</dt>
                                    <dd className="font-medium">24.5</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        )
    } catch (error) {
        console.error('Stock Detail Error:', error)
        return (
            <div className="p-8 text-center text-red-500">
                <h1 className="text-xl font-bold">Error loading stock details</h1>
                <p>Please try again later or check the symbol.</p>
            </div>
        )
    }
}
