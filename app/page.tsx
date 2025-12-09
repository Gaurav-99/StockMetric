import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-blue-600 mb-8 lg:mb-0">StockMetric</h1>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <div className="flex gap-4">
            <Link href="/login" className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
              Login
            </Link>
            <Link href="/signup" className="px-6 py-3 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition">
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Track your NSE Portfolio with AI-driven insights.</h2>
        <p className="max-w-md mx-auto text-gray-600">
          Real-time updates, news integration, and smart suggestions for the modern Indian investor.
        </p>
      </div>
    </main>
  )
}
