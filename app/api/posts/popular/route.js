import prisma from "@/app/utils/connect"
import { NextResponse } from "next/server"

export const GET = async ()=>{
    const POST_PER_PAGE = 4
    const query = {take: POST_PER_PAGE, orderBy: { views: 'desc' }, include: {user: true}}
    try {
        const posts = await  prisma.post.findMany(query)
        return new NextResponse(
            JSON.stringify(posts, {status: 200})
        )
    } catch (error) {
        return new NextResponse(
            JSON.stringify({message: "somthing went wrong"}, {status: 500})
        )
    }
}