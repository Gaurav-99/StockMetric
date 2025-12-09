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
    try {
        console.log("Starting addHolding action");
        const session = await getServerSession(authOptions)
        if (!session?.user?.email) {
            console.error("No session or email found");
            return { success: false, error: 'Unauthorized' };
        }

        const symbol = formData.get('symbol') as string
        const quantity = parseInt(formData.get('quantity') as string)
        const averageBuyPrice = parseFloat(formData.get('averageBuyPrice') as string)
        const buyDate = formData.get('buyDate') ? new Date(formData.get('buyDate') as string) : null

        if (!symbol || !quantity || !averageBuyPrice) {
            console.error("Missing required fields", { symbol, quantity, averageBuyPrice });
            return { success: false, error: 'Missing required fields' };
        }

        // In a real app, fetch company name from API
        const companyName = symbol // Placeholder

        const user = await prisma.user.findUnique({ where: { email: session.user.email } })
        if (!user) {
            console.error("User not found despite session", session.user.email);
            return { success: false, error: 'User not found' };
        }

        console.log("Creating holding for user", user.id);
        const newHolding = await prisma.holding.create({
            data: {
                userId: user.id,
                symbol: symbol.toUpperCase(),
                companyName,
                quantity,
                averageBuyPrice,
                buyDate,
            },
        })
        console.log("Holding created successfully", newHolding.id);

        revalidatePath('/dashboard')
        return { success: true };
    } catch (error) {
        console.error("Error in addHolding:", error);
        return { success: false, error: 'Failed to add holding. Please try again.' };
    }
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
