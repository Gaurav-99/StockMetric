import { getHoldings } from '@/actions/portfolio'
import DashboardClient from '@/components/DashboardClient'

export default async function DashboardPage() {
    const holdings = await getHoldings()

    return <DashboardClient initialHoldings={holdings} />
}
