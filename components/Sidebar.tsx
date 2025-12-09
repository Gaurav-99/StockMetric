'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PieChart, TrendingUp, Newspaper, User, Settings, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

const navigation = [
    { name: 'Portfolio', href: '/dashboard', icon: PieChart },
    { name: 'Stocks', href: '/stocks', icon: TrendingUp },
    { name: 'News', href: '/news', icon: Newspaper },
    { name: 'Profile', href: '/profile', icon: User },
    // { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex h-full w-64 flex-col bg-gray-900 text-white">
            <div className="flex h-16 items-center px-6 font-bold text-xl">
                StockMetric
            </div>
            <nav className="flex-1 space-y-1 px-4 py-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>
            <div className="border-t border-gray-800 p-4">
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </div>
    )
}
