'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export interface ChartData {
    date: string
    price: number
}

interface StockChartProps {
    symbol: string
    data: ChartData[]
}

export default function StockChart({ symbol, data }: StockChartProps) {
    if (!data || data.length === 0) {
        return (
            <div className="h-64 w-full bg-gray-900 border border-gray-800 p-4 rounded-lg shadow flex items-center justify-center text-gray-400">
                No chart data available
            </div>
        )
    }

    return (
        <div className="h-64 w-full bg-gray-900 border border-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4 text-white">{symbol} Price History (30 Days)</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                    <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={{ stroke: '#4b5563' }} />
                    <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={{ stroke: '#4b5563' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }} />
                    <Line type="monotone" dataKey="price" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
