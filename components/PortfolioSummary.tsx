'use client'

import { Holding } from '@prisma/client'
import { StockPrice } from '@/lib/stockService'
import { useMemo } from 'react'

interface PortfolioSummaryProps {
    holdings: Holding[]
    prices: StockPrice[]
    isLoading: boolean
}

export default function PortfolioSummary({ holdings, prices, isLoading }: PortfolioSummaryProps) {
    const summary = useMemo(() => {
        let totalInvested = 0
        let currentValue = 0

        holdings.forEach(h => {
            totalInvested += h.quantity * h.averageBuyPrice
            const price = prices.find(p => p.symbol === h.symbol)?.currentPrice || h.averageBuyPrice
            currentValue += h.quantity * price
        })

        const pnl = currentValue - totalInvested
        const pnlPercent = totalInvested > 0 ? (pnl / totalInvested) * 100 : 0

        return { totalInvested, currentValue, pnl, pnlPercent }
    }, [holdings, prices])

    if (isLoading && holdings.length > 0 && prices.length === 0) {
        return <div className="animate-pulse h-32 bg-gray-200 rounded-lg mb-8"></div>
    }

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="bg-gray-900 border border-gray-800 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <dt className="text-sm font-medium text-gray-400 truncate">Total Value</dt>
                    <dd className="mt-1 text-3xl font-semibold text-white">₹{summary.currentValue.toLocaleString()}</dd>
                </div>
            </div>
            <div className="bg-gray-900 border border-gray-800 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <dt className="text-sm font-medium text-gray-400 truncate">Invested Amount</dt>
                    <dd className="mt-1 text-3xl font-semibold text-white">₹{summary.totalInvested.toLocaleString()}</dd>
                </div>
            </div>
            <div className="bg-gray-900 border border-gray-800 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <dt className="text-sm font-medium text-gray-400 truncate">Overall P&L</dt>
                    <dd className={`mt-1 text-3xl font-semibold ${summary.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {summary.pnl >= 0 ? '+' : ''}₹{summary.pnl.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </dd>
                </div>
            </div>
            <div className="bg-gray-900 border border-gray-800 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <dt className="text-sm font-medium text-gray-400 truncate">Return %</dt>
                    <dd className={`mt-1 text-3xl font-semibold ${summary.pnlPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {summary.pnlPercent > 0 ? '+' : ''}{summary.pnlPercent.toFixed(2)}%
                    </dd>
                </div>
            </div>
        </div>
    )
}
