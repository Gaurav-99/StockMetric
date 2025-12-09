'use client'

import { useSession } from 'next-auth/react'

export default function TopBar() {
    const { data: session } = useSession()

    return (
        <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-gray-900 px-6 shadow-sm">
            <h1 className="text-xl font-semibold text-gray-100">NSE Portfolio Tracker</h1>
            <div className="flex items-center gap-4">
                <div className="text-sm text-gray-400">
                    Welcome, <span className="font-medium text-gray-200">{session?.user?.name || 'User'}</span>
                </div>
                {/* Placeholder for avatar or other top bar items */}
                <div className="h-8 w-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-green-500 font-bold">
                    {session?.user?.name?.[0] || 'U'}
                </div>
            </div>
        </header>
    )
}
