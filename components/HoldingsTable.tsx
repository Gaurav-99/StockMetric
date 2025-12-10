'use client'

import type { Holding } from '@prisma/client'
import { StockPrice } from '@/lib/stockService'
import { Trash2 } from 'lucide-react'
import { deleteHolding } from '@/actions/portfolio'
import { getRecommendation } from '@/lib/recommendations'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface HoldingsTableProps {
    holdings: Holding[]
    prices: StockPrice[]
    onGuestDelete?: (id: string) => void
}

export default function HoldingsTable({ holdings, prices, onGuestDelete }: HoldingsTableProps) {
    const { data: session } = useSession()

    // Safe defaults if session not fully loaded
    // @ts-ignore
    const riskProfile = session?.user?.riskProfile || 'MODERATE'
    // @ts-ignore
    const investmentHorizon = session?.user?.investmentHorizon || 'MEDIUM_TERM'

    return (
        <div className="bg-gray-900 shadow overflow-hidden sm:rounded-lg border border-gray-800">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-800">
                <h3 className="text-lg leading-6 font-medium text-white">Holdings</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Symbol</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Qty</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Avg Price</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">LTP</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">P&L</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Suggestion</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-900 divide-y divide-gray-800">
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
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                        <Link href={`/stocks/${holding.symbol}`} className="hover:text-green-400 hover:underline">
                                            {holding.symbol}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 text-right">{holding.quantity}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 text-right">₹{holding.averageBuyPrice.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white text-right font-semibold">
                                        {priceData ? `₹${ltp.toFixed(2)}` : 'Loading...'}
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {pnl >= 0 ? '+' : ''}₹{pnl.toFixed(2)} <span className="text-xs">({pnlPercent.toFixed(1)}%)</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${recommendation === 'BUY' ? 'bg-green-900/50 text-green-300' :
                                            recommendation === 'SELL' ? 'bg-red-900/50 text-red-300' :
                                                'bg-yellow-900/50 text-yellow-300'
                                            }`}>
                                            {recommendation}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => onGuestDelete ? onGuestDelete(holding.id) : deleteHolding(holding.id)} className="text-red-400 hover:text-red-300">
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
