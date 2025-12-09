// Mock Stock Data Service

export interface StockPrice {
    symbol: string
    currentPrice: number
    change: number
    changePercent: number
    lastUpdated: string
}

const MOCK_PRICES: Record<string, number> = {
    RELIANCE: 2450.0,
    TCS: 3600.0,
    HDFCBANK: 1650.0,
    INFY: 1500.0,
    ICICIBANK: 950.0,
}

// Simulate market movement
function randomizePrice(basePrice: number) {
    const variation = basePrice * 0.005 // 0.5% fluctuation
    return basePrice + (Math.random() * variation * 2 - variation)
}

export async function getStockPrice(symbol: string): Promise<StockPrice> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const base = MOCK_PRICES[symbol] || 100.0
    const current = randomizePrice(base)
    const prevClose = base // Simplified
    const change = current - prevClose
    const changePercent = (change / prevClose) * 100

    return {
        symbol,
        currentPrice: parseFloat(current.toFixed(2)),
        change: parseFloat(change.toFixed(2)),
        changePercent: parseFloat(changePercent.toFixed(2)),
        lastUpdated: new Date().toISOString(),
    }
}

export async function getStockPrices(symbols: string[]): Promise<StockPrice[]> {
    const promises = symbols.map((s) => getStockPrice(s))
    return Promise.all(promises)
}
