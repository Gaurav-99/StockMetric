import { getGlobalNews } from '@/lib/newsService'
import Link from 'next/link'

export default async function NewsPage() {
    const news = await getGlobalNews()

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Market News</h1>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                    {news.map((article, idx) => (
                        <li key={idx}>
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="block hover:bg-gray-50">
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-blue-600 truncate">{article.source}</p>
                                        <div className="ml-2 flex-shrink-0 flex">
                                            <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${article.sentiment === 'POSITIVE' ? 'bg-green-100 text-green-800' :
                                                    article.sentiment === 'NEGATIVE' ? 'bg-red-100 text-red-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}>
                                                {article.sentiment}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-base font-semibold text-gray-900">
                                        {article.title}
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                            <p className="flex items-center text-sm text-gray-500">
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
        </div>
    )
}
