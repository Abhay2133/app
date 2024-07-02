import { NextRequest, NextResponse } from "next/server";

const counter = {value:0};
export const GET = async (reqest:NextRequest) =>{
    counter.value += 1;
    return NextResponse.json({"counter":counter.value})
}

// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic'