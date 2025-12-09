'use client'

import { addHolding } from '@/actions/portfolio'
import { useState } from 'react'

export default function AddHoldingForm({ onSuccess }: { onSuccess: () => void }) {
    const [loading, setLoading] = useState(false)

    async function clientAction(formData: FormData) {
        setLoading(true)
        await addHolding(formData)
        setLoading(false)
        onSuccess()
    }

    return (
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Add New Holding</h3>
            <form action={clientAction}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="symbol" className="block text-sm font-medium text-gray-700">Stock Symbol (NSE)</label>
                        <input type="text" name="symbol" id="symbol" required placeholder="e.g. RELIANCE" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                        <input type="number" name="quantity" id="quantity" required min="1" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="averageBuyPrice" className="block text-sm font-medium text-gray-700">Avg Buy Price (INR)</label>
                        <input type="number" name="averageBuyPrice" id="averageBuyPrice" required step="0.01" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="buyDate" className="block text-sm font-medium text-gray-700">Buy Date (Optional)</label>
                        <input type="date" name="buyDate" id="buyDate" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm" />
                    </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:col-start-2 sm:text-sm"
                    >
                        {loading ? 'Adding...' : 'Add Stock'}
                    </button>
                    <button
                        type="button"
                        onClick={onSuccess}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:col-start-1 sm:text-sm"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
