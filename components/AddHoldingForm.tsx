'use client'

import { addHolding } from '@/actions/portfolio'
import { useState } from 'react'

import { Holding } from '@prisma/client'

interface AddHoldingFormProps {
    onSuccess: () => void
    isGuest?: boolean
    onGuestAdd?: (holding: Holding) => void
}

export default function AddHoldingForm({ onSuccess, isGuest = false, onGuestAdd }: AddHoldingFormProps) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(event.currentTarget)
        const symbol = formData.get('symbol') as string
        const quantity = parseInt(formData.get('quantity') as string)
        const averageBuyPrice = parseFloat(formData.get('averageBuyPrice') as string)

        if (isGuest) {
            if (onGuestAdd) {
                const newHolding: Holding = {
                    id: Math.random().toString(36).substr(2, 9),
                    userId: 'guest',
                    symbol: symbol.toUpperCase(),
                    companyName: symbol.toUpperCase(), // Placeholder
                    quantity,
                    averageBuyPrice,
                    buyDate: new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
                onGuestAdd(newHolding)
                setLoading(false)
                onSuccess()
            }
            return
        }

        // Server Action for Authenticated Users
        try {
            const result = await addHolding(formData)
            if (result && !result.success) {
                setError(result.error || 'Something went wrong')
                setLoading(false)
                return
            }
            // Success
            onSuccess()
        } catch (e) {
            setError('An unexpected error occurred.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border border-gray-800 rounded-lg">
            <h3 className="text-lg font-medium leading-6 text-white mb-4">
                {isGuest ? 'Add Stock (Guest Mode)' : 'Add New Holding'}
            </h3>
            {isGuest && (
                <p className="text-sm text-gray-400 mb-4">
                    Data will be saved to your browser. <a href="/signup" className="text-green-400 underline">Sign up</a> to save to the cloud.
                </p>
            )}
            {error && (
                <div className="mb-4 bg-red-900/20 border-l-4 border-red-500 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            {/* Heroicon name: solid/exclamation */}
                            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-300">{error}</p>
                        </div>
                    </div>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="symbol" className="block text-sm font-medium text-gray-300">Stock Symbol (NSE)</label>
                        <input type="text" name="symbol" id="symbol" required placeholder="e.g. RELIANCE" className="mt-1 block w-full border border-gray-700 bg-gray-800 text-white rounded-md shadow-sm py-2 px-3 sm:text-sm focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-300">Quantity</label>
                        <input type="number" name="quantity" id="quantity" required min="1" className="mt-1 block w-full border border-gray-700 bg-gray-800 text-white rounded-md shadow-sm py-2 px-3 sm:text-sm focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div>
                        <label htmlFor="averageBuyPrice" className="block text-sm font-medium text-gray-300">Avg Buy Price (INR)</label>
                        <input type="number" name="averageBuyPrice" id="averageBuyPrice" required step="0.01" className="mt-1 block w-full border border-gray-700 bg-gray-800 text-white rounded-md shadow-sm py-2 px-3 sm:text-sm focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div>
                        <label htmlFor="buyDate" className="block text-sm font-medium text-gray-300">Buy Date (Optional)</label>
                        <input type="date" name="buyDate" id="buyDate" className="mt-1 block w-full border border-gray-700 bg-gray-800 text-white rounded-md shadow-sm py-2 px-3 sm:text-sm focus:ring-green-500 focus:border-green-500" />
                    </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:col-start-2 sm:text-sm transition-colors"
                    >
                        {loading ? 'Adding...' : 'Add Stock'}
                    </button>
                    <button
                        type="button"
                        onClick={onSuccess}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-gray-200 hover:bg-gray-700 focus:outline-none sm:mt-0 sm:col-start-1 sm:text-sm transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
