import { getAuthSession } from "@/app/utils/auth"
import prisma from "@/app/utils/connect"
import { NextResponse } from "next/server"

export const GET = async (req)=>{
    const { searchParams } = new URL(req.url)
    const page = searchParams.get("page")
    const cat = searchParams.get("cat")
    const POST_PER_PAGE = 4
    const query = {take: POST_PER_PAGE, skip: POST_PER_PAGE * (page - 1), where: {...(cat && {catgSlug: cat})}, orderBy: { createdAt: 'desc' }}
    try {
        const [posts, count] = await prisma.$transaction([
            prisma.post.findMany(query),
            prisma.post.count({where: query.where}),
        ])
        return new NextResponse(
            JSON.stringify({posts, count}, {status: 200})
        )
    } catch (error) {
        return new NextResponse(
            JSON.stringify({message: "somthing went wrong"}, {status: 500})
        )
    }
}

export const POST = async (req)=>{
    const session = await getAuthSession()
    if (!session){
        return new NextResponse(JSON.stringify({message: "you are not authorized to do this"}, {status: 401}))
    }

    try {
        const body = await req.json()
        const post = await prisma.post.create({
            data: {...body, userEmail : session.user.email}
        })
        return new NextResponse(JSON.stringify(comment, {status: 200}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({message: "somthing went wrong"}, {status: 500}))
    }
}