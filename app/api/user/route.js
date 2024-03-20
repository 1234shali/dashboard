import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'; 
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function POST(request){
    try{
        const data = await request.json()
        const {full_name, email, password, address} = data
        const hashedPassword = await bcrypt.hash(password, 10)
        await prisma.user.create({
            data: {
                full_name,
                email,
                password: hashedPassword,
                address
            }
        })
        return NextResponse.json(
            {
                message: "created",
            }
        )
    } catch(error){
        return NextResponse.json(
            {
                message: "error",
                error
            }
        )
    }
}

export async function GET(){
    try{
        const users = await prisma.user.findMany()
        return NextResponse.json(
            {
                message: "ok",
                users
            }
        )
    } catch(error){
        return NextResponse.json(
            {
                message: "error",
                error
            }
        )
    }
}