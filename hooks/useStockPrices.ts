'use client'

import { useQuery } from '@tanstack/react-query'
import { getStockPrices } from '@/lib/stockService'

export function useStockPrices(symbols: string[]) {
    return useQuery({
        queryKey: ['stockPrices', symbols],
        queryFn: () => getStockPrices(symbols),
        refetchInterval: 30000, // 30 seconds
        enabled: symbols.length > 0,
        staleTime: 10000,
    })
}
