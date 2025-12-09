'use client'

import { Holding } from '@prisma/client'
import { StockPrice } from '@/lib/stockService'
import { Trash2 } from 'lucide-react'
import { deleteHolding } from '@/actions/portfolio'
import { getRecommendation } from '@/lib/recommendations'
import { useSession } from 'next-auth/react'

interface HoldingsTableProps {
    holdings: Holding[]
    prices: StockPrice[]
}

export default function HoldingsTable({ holdings, prices }: HoldingsTableProps) {
    const { data: session } = useSession()

    // Safe defaults if session not fully loaded
    // @ts-ignore
    const riskProfile = session?.user?.riskProfile || 'MODERATE'
    // @ts-ignore
    const investmentHorizon = session?.user?.investmentHorizon || 'MEDIUM_TERM'

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Holdings</h3>
            </div>
            <div className="border-t border-gray-200 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Price</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">LTP</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">P&L</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Suggestion</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {holdings.map((holding) => {
                            const priceData = prices.find(p => p.symbol === holding.symbol)
                            const ltp = priceData?.currentPrice || holding.averageBuyPrice
                            const currentValue = holding.quantity * ltp
                            const invested = holding.quantity * holding.averageBuyPrice
                            const pnl = currentValue - invested
                            const pnlPercent = (pnl / invested) * 100

                            // Calculate recommendation (No news for dashboard view for performance)
                            let recommendation = 'HOLD'
                            if (priceData) {
                                const res = getRecommendation(priceData, [], { riskProfile, investmentHorizon })
                                recommendation = res.action
                            }

                            return (
                                <tr key={holding.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{holding.symbol}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{holding.quantity}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">₹{holding.averageBuyPrice.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-semibold">
                                        {priceData ? `₹${ltp.toFixed(2)}` : 'Loading...'}
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {pnl >= 0 ? '+' : ''}₹{pnl.toFixed(2)} <span className="text-xs">({pnlPercent.toFixed(1)}%)</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${recommendation === 'BUY' ? 'bg-green-100 text-green-800' :
                                                recommendation === 'SELL' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {recommendation}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => deleteHolding(holding.id)} className="text-red-600 hover:text-red-900">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                        {holdings.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                                    No holdings found. Add a stock to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
