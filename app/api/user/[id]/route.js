import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { NextResponse } from 'next/server';

export async function GET(request, {params}) {
    try {
        const id = params.id 
        const user = await prisma.user.findUnique({
            where: {
                id: id 
            }
        });

        if (user) {
            return NextResponse.json({
                message: "ok",
                user
            });
        } else {
            return NextResponse.json({
                message: "error",
                error: "User not found"
            });
        }
    } catch(error) {
        return NextResponse.json({
            message: "error",
            error
        });
    }
}

export async function PUT(request, {params}){
    try{
        const id = params.id
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            }
        })
        if (user) {
            const data = await request.json()
            const {email, address} = data
            await prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    email: email,
                    address: address
                }
            })
            return NextResponse.json(
                {
                    message: "updated"
                }
            )
        } else {
            return NextResponse.json(
                {
                    message: "User not found",
                }
            )
        }
    } catch (error) {
        return NextResponse.json({
            message: "error",
            error
        });
    }
}


export async function DELETE(request, {params}){
    try{
        const id = params.id
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            }
        })
        if (user) {
            await prisma.user.delete({
                where: {
                    id: id,
                }
            })
            return NextResponse.json(
                {
                    message: "deleted"
                }
            )
        } else {
            return NextResponse.json(
                {
                    message: "User not found",
                }
            )
        }
    } catch (error) {
        return NextResponse.json({
            message: "error",
            error
        });
    }
}
