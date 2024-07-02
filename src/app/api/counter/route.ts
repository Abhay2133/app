import { NextRequest, NextResponse } from "next/server";

const counter = {value:0};
export const GET = async (reqest:NextRequest) =>{
    counter.value += 1;
    return NextResponse.json({"counter":counter.value})
}

export function POST(reqest:NextRequest){
    counter.value += 1;
    return NextResponse.json({"counter": counter.value})
}