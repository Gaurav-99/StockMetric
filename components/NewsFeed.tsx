'use client'

import { useState } from 'react'
import type { NewsArticle } from '@/lib/newsService'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface NewsFeedProps {
    initialNews: NewsArticle[]
}

import AutoRefresh from '@/components/AutoRefresh'

export default function NewsFeed({ initialNews }: NewsFeedProps) {
    const ITEMS_PER_PAGE = 10
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(initialNews.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentNews = initialNews.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(p => p + 1)
    }

    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage(p => p - 1)
    }

    if (initialNews.length === 0) {
        return <div className="text-center text-gray-500 py-10">No news articles found.</div>
    }

    return (
        <div className="space-y-6">
            <AutoRefresh intervalMs={3600000} />
            <div className="bg-gray-900 border border-gray-800 shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-800">
                    {currentNews.map((article, idx) => (
                        <li key={idx}>
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="block hover:bg-gray-800 transition-colors">
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-green-400 truncate">{article.source}</p>
                                        <div className="ml-2 flex-shrink-0 flex">
                                            <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${article.sentiment === 'POSITIVE' ? 'bg-green-900/50 text-green-300' :
                                                article.sentiment === 'NEGATIVE' ? 'bg-red-900/50 text-red-300' :
                                                    'bg-gray-800 text-gray-300'
                                                }`}>
                                                {article.sentiment}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-base font-semibold text-gray-100">
                                        {article.title}
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                            <p className="flex items-center text-sm text-gray-400">
                                                {article.summary}
                                            </p>
                                        </div>
                                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                            <p>
                                                {new Date(article.publishedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-gray-800 pt-4">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button
                            onClick={goToPrevPage}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-400">
                                Showing <span className="font-medium text-white">{startIndex + 1}</span> to <span className="font-medium text-white">{Math.min(startIndex + ITEMS_PER_PAGE, initialNews.length)}</span> of <span className="font-medium text-white">{initialNews.length}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button
                                    onClick={goToPrevPage}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 disabled:opacity-50"
                                >
                                    <span className="sr-only">Previous</span>
                                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                                </button>
                                {/* Simple page counter for now to avoid complexity */}
                                <span className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-900 text-sm font-medium text-gray-300">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={goToNextPage}
                                    disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 disabled:opacity-50"
                                >
                                    <span className="sr-only">Next</span>
                                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
