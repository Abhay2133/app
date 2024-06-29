import { NextRequest, NextResponse } from "next/server";



export function middleware(request: NextRequest){
    const url  = new URL(request.url);
    if(url.pathname.startsWith("/counter")){
        return NextResponse.next()
    }
    console.log(url.href)
    if(url.pathname == ("/api"))
        return NextResponse.redirect(new URL("/api/users", request.url));

    return NextResponse.next();
}

export const config = {
    matcher : ['/(.*)', ]
}