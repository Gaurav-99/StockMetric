'use client'

import type { Holding } from '@prisma/client'
import { useStockPrices } from '@/hooks/useStockPrices'
import PortfolioSummary from '@/components/PortfolioSummary'
import HoldingsTable from '@/components/HoldingsTable'
import { useState, useEffect } from 'react'
import AddHoldingForm from '@/components/AddHoldingForm'
import { Plus } from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function DashboardClient({ initialHoldings }: { initialHoldings: Holding[] }) {
    const { data: session, status } = useSession()

    // State to manage holdings (initially from server, or local if guest)
    const [holdings, setHoldings] = useState<Holding[]>(initialHoldings)
    const [isGuest, setIsGuest] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)

    useEffect(() => {
        if (status === 'unauthenticated') {
            setIsGuest(true)
            const stored = localStorage.getItem('guestHoldings')
            if (stored) {
                setHoldings(JSON.parse(stored))
            } else {
                setHoldings([])
            }
        } else if (status === 'authenticated') {
            setIsGuest(false)
            // CRITICAL: Update local state when server props change (after revalidatePath)
            setHoldings(initialHoldings)
        }
    }, [status, initialHoldings])

    const handleGuestAdd = (newHolding: Holding) => {
        const updated = [newHolding, ...holdings]
        setHoldings(updated)
        localStorage.setItem('guestHoldings', JSON.stringify(updated))
    }

    const handleGuestDelete = (id: string) => {
        const updated = holdings.filter(h => h.id !== id)
        setHoldings(updated)
        localStorage.setItem('guestHoldings', JSON.stringify(updated))
    }

    const symbols = Array.from(new Set(holdings.map(h => h.symbol)))
    const { data: prices = [], isLoading } = useStockPrices(symbols)

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-100">Portfolio Dashboard</h1>
                    {isGuest && <p className="text-sm text-gray-400">Guest Mode (Local Storage)</p>}
                </div>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 transition-colors"
                >
                    <Plus className="mr-2 h-4 w-4" /> Add Stock
                </button>
            </div>

            {showAddForm && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowAddForm(false)}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-gray-700">
                            <AddHoldingForm
                                onSuccess={() => setShowAddForm(false)}
                                isGuest={isGuest}
                                onGuestAdd={handleGuestAdd}
                            />
                        </div>
                    </div>
                </div>
            )}

            <PortfolioSummary holdings={holdings} prices={prices} isLoading={isLoading} />
            <HoldingsTable
                holdings={holdings}
                prices={prices}
                onGuestDelete={isGuest ? handleGuestDelete : undefined}
            />
        </div>
    )
}
