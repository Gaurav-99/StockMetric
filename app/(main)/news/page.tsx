import NewsFeed from '@/components/NewsFeed'
import { getGlobalNews } from '@/lib/newsService'

export default async function NewsPage() {
    const news = await getGlobalNews()

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-white">Market News</h1>
            <NewsFeed initialNews={news} />
        </div>
    )
}
