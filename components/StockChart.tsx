'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface StockChartProps {
    symbol: string
}

// Generate mock historical data
const generateData = () => {
    const data = []
    let price = 2400
    for (let i = 30; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        price = price * (1 + (Math.random() * 0.04 - 0.02))
        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            price: parseFloat(price.toFixed(2)),
        })
    }
    return data
}

export default function StockChart({ symbol }: StockChartProps) {
    const data = generateData()

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
