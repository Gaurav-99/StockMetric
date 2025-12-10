'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

const POPULAR_STOCKS = [
    'RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK', 'SBIN', 'ITC', 'BHARTIARTL'
]

export default function StocksPage() {
    const [symbol, setSymbol] = useState('')
    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (symbol.trim()) {
            router.push(`/stocks/${symbol.trim().toUpperCase()}`)
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-white">Market Research</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Analyze stock performance, view charts, and get AI-powered recommendations based on your risk profile.
                </p>
            </div>

            <div className="max-w-xl mx-auto">
                <form onSubmit={handleSearch} className="relative">
                    <input
                        type="text"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        placeholder="Enter Stock Symbol (e.g. TATASTEEL)"
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none shadow-lg text-lg placeholder-gray-500"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                    <button
                        type="submit"
                        disabled={!symbol}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white rounded-lg px-6 py-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Search
                    </button>
                </form>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-300">Popular Stocks</h2>
                <div className="flex flex-wrap gap-3">
                    {POPULAR_STOCKS.map((stock) => (
                        <button
                            key={stock}
                            onClick={() => router.push(`/stocks/${stock}`)}
                            className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-700"
                        >
                            {stock}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
