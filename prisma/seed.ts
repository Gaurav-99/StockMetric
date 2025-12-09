import { PrismaClient, RiskProfile, InvestmentHorizon } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.upsert({
        where: { email: 'demo@example.com' },
        update: {},
        create: {
            email: 'demo@example.com',
            password: 'password123', // In real app, hash this!
            name: 'Demo User',
            riskProfile: RiskProfile.MODERATE,
            investmentHorizon: InvestmentHorizon.MEDIUM_TERM,
            holdings: {
                create: [
                    {
                        symbol: 'RELIANCE',
                        companyName: 'Reliance Industries',
                        quantity: 10,
                        averageBuyPrice: 2400.0,
                        buyDate: new Date('2023-01-15'),
                    },
                    {
                        symbol: 'TCS',
                        companyName: 'Tata Consultancy Services',
                        quantity: 5,
                        averageBuyPrice: 3500.0,
                        buyDate: new Date('2023-02-20'),
                    },
                ],
            },
        },
    })
    console.log({ user })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
