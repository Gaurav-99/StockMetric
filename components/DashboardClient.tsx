'use client'

import { Holding } from '@prisma/client'
import { useStockPrices } from '@/hooks/useStockPrices'
import PortfolioSummary from '@/components/PortfolioSummary'
import HoldingsTable from '@/components/HoldingsTable'
import { useState } from 'react'
import AddHoldingForm from '@/components/AddHoldingForm'
import { Plus } from 'lucide-react'

export default function DashboardClient({ initialHoldings }: { initialHoldings: Holding[] }) {
    // Use local state if we manipulate holdings client-side, 
    // but simpler to rely on server revalidation and just passing props.
    // However, initialHoldings are static props.
    // React Query could also fetch holdings, but server component + revalidatePath is cleaner for Next.js 14.
    // We'll trust that the parent page passes fresher holdings on revalidate.

    const symbols = Array.from(new Set(initialHoldings.map(h => h.symbol)))
    const { data: prices = [], isLoading } = useStockPrices(symbols)

    const [showAddForm, setShowAddForm] = useState(false)

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Portfolio Dashboard</h1>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                    <Plus className="mr-2 h-4 w-4" /> Add Stock
                </button>
            </div>

            {showAddForm && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowAddForm(false)}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <AddHoldingForm onSuccess={() => setShowAddForm(false)} />
                        </div>
                    </div>
                </div>
            )}

            <PortfolioSummary holdings={initialHoldings} prices={prices} isLoading={isLoading} />
            <HoldingsTable holdings={initialHoldings} prices={prices} />
        </div>
    )
}
