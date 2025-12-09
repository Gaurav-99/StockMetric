'use client'

import { updateProfile } from '@/actions/profile'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
    const { data: session, update } = useSession()
    const router = useRouter()
    const [success, setSuccess] = useState('')

    async function clientAction(formData: FormData) {
        const res = await updateProfile(formData)
        if (res?.message) {
            setSuccess(res.message)
            // Update session to reflect changes if needed, though session usually persists
            // A force update might be needed or re-login.
            // Next Auth v4 update() is available
            await update({
                ...session,
                user: {
                    ...session?.user,
                    riskProfile: formData.get('riskProfile'),
                    investmentHorizon: formData.get('investmentHorizon')
                }
            })
            router.refresh()
        }
    }

    // @ts-ignore
    const riskProfile = session?.user?.riskProfile || 'MODERATE'
    // @ts-ignore
    const investmentHorizon = session?.user?.investmentHorizon || 'MEDIUM_TERM'

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Your Profile</h1>

            <div className="bg-white shadow rounded-lg p-6">
                <div className="mb-6">
                    <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
                    <p className="text-sm text-gray-500">Update your investment preferences.</p>
                </div>

                {success && (
                    <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-md">
                        {success}
                    </div>
                )}

                <form action={clientAction} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                disabled
                                value={session?.user?.name || ''}
                                className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="text"
                                disabled
                                value={session?.user?.email || ''}
                                className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="riskProfile" className="block text-sm font-medium text-gray-700">Risk Profile</label>
                            <select
                                id="riskProfile"
                                name="riskProfile"
                                defaultValue={riskProfile}
                                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="CONSERVATIVE">Conservative (Low Risk)</option>
                                <option value="MODERATE">Moderate (Balanced)</option>
                                <option value="AGGRESSIVE">Aggressive (High Risk)</option>
                            </select>
                            <p className="mt-1 text-xs text-gray-500">Helps us suggest buy/sell actions.</p>
                        </div>

                        <div>
                            <label htmlFor="investmentHorizon" className="block text-sm font-medium text-gray-700">Investment Horizon</label>
                            <select
                                id="investmentHorizon"
                                name="investmentHorizon"
                                defaultValue={investmentHorizon}
                                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="SHORT_TERM">Short Term (&lt; 1 Yr)</option>
                                <option value="MEDIUM_TERM">Medium Term (1-3 Yrs)</option>
                                <option value="LONG_TERM">Long Term (3+ Yrs)</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
