import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Logo Icon */}
            <div className="h-8 w-8 bg-green-500 rounded flex items-center justify-center">
              <span className="text-gray-950 font-bold text-xl">$</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">StockMetric</span>
          </div>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2 rounded-lg border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-medium transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">

        {/* Background decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl -z-10 translate-x-20 -translate-y-20"></div>

        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">StockMetric</span>
        </h1>

        <h2 className="text-2xl md:text-3xl font-light text-gray-300 mb-8 max-w-3xl">
          Track your NSE Portfolio with <span className="text-green-400 font-semibold">AI-driven insights</span>.
        </h2>

        <p className="max-w-xl mx-auto text-gray-400 text-lg mb-12">
          Real-time updates, news integration, and smart suggestions specifically tailored for the modern Indian investor.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/dashboard" className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors">
            Get Started (No Login Required)
          </Link>
          <Link href="/login" className="text-sm font-semibold leading-6 text-white hover:text-green-400 transition-colors">
            Log in <span aria-hidden="true">→</span>
          </Link>
        </div>

      </main>

      {/* Footer (Simplified) */}
      <footer className="py-6 text-center text-gray-600 text-sm">
        &copy; 2025 StockMetric. Built for Indian Investors.
      </footer>
    </div>
  )
}
