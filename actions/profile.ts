'use server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { revalidatePath } from 'next/cache'
import { RiskProfile, InvestmentHorizon } from '@prisma/client'

export async function updateProfile(formData: FormData) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
        throw new Error('Not authenticated')
    }

    const riskProfile = formData.get('riskProfile') as RiskProfile
    const investmentHorizon = formData.get('investmentHorizon') as InvestmentHorizon

    await prisma.user.update({
        where: { email: session.user.email },
        data: {
            riskProfile,
            investmentHorizon,
        },
    })

    revalidatePath('/profile')
    return { message: 'Profile updated successfully' }
}
