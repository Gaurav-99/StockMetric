'use client'

import { registerUser } from '@/actions/auth'
import Link from 'next/link'
import { useState } from 'react'

export default function SignupPage() {
    const [error, setError] = useState('')

    async function clientAction(formData: FormData) {
        try {
            const res = await registerUser(formData)
            if (res?.error) {
                setError(res.error)
            }
        } catch (e) {
            setError('Something went wrong. Please try again.')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-8 bg-gray-900 rounded-lg shadow-xl border border-gray-800">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Create your account</h2>
                </div>
                <form className="mt-8 space-y-6" action={clientAction}>
                    {error && <div className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded border border-red-900/50">{error}</div>}
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="name" className="sr-only">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Full Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <Link href="/login" className="text-sm text-green-400 hover:text-green-300">
                        Already have an account? Sign in
                    </Link>
                </div>
            </div>
        </div>
    )
}
