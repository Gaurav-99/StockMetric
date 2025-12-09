'use server'

import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { redirect } from 'next/navigation'

export async function registerUser(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string

    if (!email || !password) {
        throw new Error('Missing fields')
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return { error: 'User already exists' }
        }

        const hashedPassword = await hash(password, 10)

        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        })
    } catch (error) {
        console.error('Registration Error:', error)
        return { error: 'Registration failed. Please try again.' }
    }

    redirect('/login?registered=true')
}
