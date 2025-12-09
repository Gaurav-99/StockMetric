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
        <div className="h-64 w-full bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">{symbol} Price History (30 Days)</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
