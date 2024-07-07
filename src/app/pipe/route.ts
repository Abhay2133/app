// export const dynamic = 'force-dynamic'

import { IncomingMessage } from "http";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const http = require("node:http")
const https = require("node:https")

const getClass = (url: string) => url.startsWith("https") ? https : http;

const getFilename = (url: string) => url.split("/").at(-1)?.split("?").at(0);

const getResponseStream = (url: string, maxRetries = 10, currentRetry = 0) => new Promise((resolve, reject) => {
    getClass(url).get(url, (res: any) => {
        if (res.headers['location']) {
            console.log(`redirecting to "${res.headers['location']}"`)
            return getResponseStream(res.headers['location']).then(
                function onFulfilled(stream) {
                    return resolve(stream);
                },
                function onrejected(reason: any) {
                    return reject(reason);
                }
            )
        }
        res.on("error", (err: Error) => {

            reject({ error: `internal error`, message: err.message });
        })
        // console.log(res.url)
        if (res.statusCode < 400) {
            // res.prototype.url = url;
            Object.defineProperty(res, "url", {
                value: url,
                writable: false
            })
            return resolve(res);
        } else {
            return reject(JSON.parse(JSON.stringify({ error: `status code >= 400`, statusCode: res.statusCode, status: res.statusMessage })))
        }
    }).on("error", (err: Error) => {
        if (currentRetry < maxRetries) {
            console.log(`retrying(${currentRetry + 1}) to "${url}"`)
            return getResponseStream(url, maxRetries, currentRetry + 1).then(
                function onFulfilled(stream) {
                    return resolve(stream);
                },
                function onrejected(reason: any) {
                    return reject(reason);
                }
            )
        }
        else {
            console.error(`getResponseStream() error : url "${url}"\n`, err)
            reject({ error: `Server Error`, message: `${err.message}` });
        }
    })
})

async function _get(request: NextRequest) {
    let _url = new URL(request?.url);
    let url = _url.searchParams.get('url');
    // console.log({ url })
    if (!url)
        return new Response("PIPE?url=<your-url>");

    try {
        let stream: any = await getResponseStream(url);
        const { headers } = stream;
        headers['content-disposition'] = headers['content-disposition'] || "attachment; filename=" + getFilename(stream.url);
        return new Response((stream as ReadableStream), { headers });
    } catch (err) {
        console.error(err);
        return NextResponse.json(err);
    }
}

export async function GET(request: NextRequest) {
    // const headersList = headers()
    // const referer = headersList.get('referer');
    // console.log({referer})
    try {
        return await _get(request);
    } catch (ee) {
        console.error(ee);
        return NextResponse.json(ee);
    }
}
