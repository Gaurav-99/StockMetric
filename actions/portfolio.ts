'use server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { revalidatePath } from 'next/cache'

export async function getHoldings() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return []

    return prisma.holding.findMany({
        where: { user: { email: session.user.email } },
        orderBy: { createdAt: 'desc' },
    })
}

export async function addHolding(formData: FormData) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) throw new Error('Unauthorized')

    const symbol = formData.get('symbol') as string
    const quantity = parseInt(formData.get('quantity') as string)
    const averageBuyPrice = parseFloat(formData.get('averageBuyPrice') as string)
    const buyDate = formData.get('buyDate') ? new Date(formData.get('buyDate') as string) : null

    // In a real app, fetch company name from API
    const companyName = symbol // Placeholder

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) throw new Error('User not found')

    await prisma.holding.create({
        data: {
            userId: user.id,
            symbol: symbol.toUpperCase(),
            companyName,
            quantity,
            averageBuyPrice,
            buyDate,
        },
    })

    revalidatePath('/dashboard')
}

export async function deleteHolding(id: string) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) throw new Error('Unauthorized')

    await prisma.holding.deleteMany({
        where: {
            id,
            user: { email: session.user.email }, // Ensure ownership
        },
    })

    revalidatePath('/dashboard')
}
