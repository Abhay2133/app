import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const counter = {value:0};
export const GET = async (reqest:NextRequest) =>{
    counter.value += 1;
    return NextResponse.json({"counter":counter.value})
}

interface counterRow {
    id:number;
    value:number;
}

export async function POST(request:NextRequest) {
    let data;
    try{
        data = await prisma.counter.findFirst();
        if(data == null){
            await prisma.counter.create({data:{id:1, value:1}})
            data = {id:1, value:0}
        } else {   
            data = data as counterRow;
            await prisma.counter.update({where:{id:1}, data:{value: data.value+1 }})
        }
    }
    catch(e:any){
        const error = {
            "error-code": 500,
            "message" : e.message
        }
        console.error(e);
        return new Response(JSON.stringify(error), {
            status: 500,
            statusText: "Server-Error",
            headers : {
                "content-type":"application/json"
            }
        })
    }
    return NextResponse.json({counter: data.value+1})
}

// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic'