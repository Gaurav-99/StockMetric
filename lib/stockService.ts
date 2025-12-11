'use server'

import yahooFinance from 'yahoo-finance2'

export interface StockPrice {
    symbol: string
    currentPrice: number
    change: number
    changePercent: number
    lastUpdated: string
}

export async function getStockPrice(symbol: string): Promise<StockPrice> {
    try {
        // Ensure symbol has .NS suffix for Indian stocks if not present
        // This is a simple heuristic; might need refinement if US stocks are supported later
        const lookupSymbol = symbol.endsWith('.NS') ? symbol : `${symbol}.NS`

        const quote = await yahooFinance.quote(lookupSymbol) as any

        if (!quote) {
            throw new Error(`No data found for symbol: ${symbol}`)
        }

        return {
            symbol: symbol.toUpperCase().replace('.NS', ''), // Return clean symbol
            currentPrice: quote.regularMarketPrice || 0,
            change: quote.regularMarketChange || 0,
            changePercent: quote.regularMarketChangePercent || 0,
            lastUpdated: new Date().toISOString(),
        }
    } catch (error) {
        console.error(`Error fetching price for ${symbol}:`, error)
        // Return a safe fallback to prevent page crash, or rethrow if strict
        return {
            symbol: symbol.toUpperCase(),
            currentPrice: 0,
            change: 0,
            changePercent: 0,
            lastUpdated: new Date().toISOString(),
        }
    }
}

export async function getStockPrices(symbols: string[]): Promise<StockPrice[]> {
    // yahoo-finance2 does not support batch requests well for free tier without issues sometimes, 
    // so parallel requests are safer for small numbers.
    const promises = symbols.map((s) => getStockPrice(s))
    return Promise.all(promises)
}

export async function getStockHistory(symbol: string) {
    try {
        const lookupSymbol = symbol.endsWith('.NS') ? symbol : `${symbol}.NS`
        const queryOptions = { period1: '1mo', interval: '1d' as const } // 1 month history, daily interval
        const result = await yahooFinance.historical(lookupSymbol, queryOptions) as any

        return result.map((quote: any) => ({
            date: new Date(quote.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            price: quote.close
        }))
    } catch (error) {
        console.error(`Error fetching history for ${symbol}:`, error)
        return []
    }
}
