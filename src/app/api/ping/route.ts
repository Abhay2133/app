import exp from "constants";
import { NextRequest, NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

let id: any;
const sec = 300;

function handle(request: NextRequest) {
    let url = request.url;
    if (id) clearTimeout(id);
    // console.log(request.method, request.url);
    if ((process.env.PING_URL || "").startsWith("http")) {
        id = setTimeout(() => {
            fetch((process.env.PING_URL as string))
                .then(res => res.json()).then(console.log).catch(console.error)
        }, sec * 1000);

        // (!process.env?.NODE_ENV?.startsWith("production")) && 1
        // console.log(`\nping : '${process.env.PING_URL}' after ${sec} sec\n`);
    }

    return NextResponse.json({ status: 'OK', id: id + "", url })
}

export { handle as GET, handle as POST }