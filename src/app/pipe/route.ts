import { IncomingMessage } from "http";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const http = require("node:http")
const https = require("node:https")

const getClass = (url: string) => url.startsWith("https") ? https : http;

const getFilename = (url: string) => url.split("/").at(-1)?.split("?").at(0);

export async function GET(request: NextRequest) {
    let _url = new URL(request.url);
    let url = _url.searchParams.get('url');
    console.log({ url })
    if (!url)
        return new Response("PIPE?url=<your-url>");

    try {
        let stream: ReadableStream = await new Promise((resolve, reject) => {
            getClass(url).get(url, (res: any) => {
                console.log(res.url)
                if (res.statusCode == 200) {
                    return resolve(res);
                } else {
                    return reject({error : `status code is not 200`, statusCode : res.statusCode})
                }
                res.on("error", (err: Error) => {
                    reject(err);
                })
            })
        });
        let a: any = stream;
        const headers = { ...a.headers };
        headers['content-disposition'] = "attachment; filename=" + getFilename(url);
        return new Response(stream, { headers });
    } catch (err) {
        console.error(err);
        return NextResponse.json(err);
    }
}