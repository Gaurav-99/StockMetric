'use client'

import { useSession } from 'next-auth/react'

export default function TopBar() {
    const { data: session } = useSession()

    return (
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
            <h1 className="text-xl font-semibold text-gray-800">NSE Portfolio Tracker</h1>
            <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                    Welcome, <span className="font-medium text-gray-900">{session?.user?.name || 'User'}</span>
                </div>
                {/* Placeholder for avatar or other top bar items */}
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    {session?.user?.name?.[0] || 'U'}
                </div>
            </div>
        </header>
    )
}
