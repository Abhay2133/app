import { NextRequest, NextResponse } from "next/server";



export type RouterCallback = (reqest: NextRequest, _next:Function) => NextResponse | Response
export type URLmatcher = (url:string) => {} | Boolean

/// method router.use , router.next(request)
export class Router{
    routeHandler:Array<Handler> = new Array<Handler>();;
    i:number=0;

    use(...args:Array<any>){
        if(args.length != 1 && args.length != 2) throw new Error(`'use' method of 'Router' can have only 1 (handler only) or 2 (url, handler) argument\nYou passed ${args.length}`);
        
        let handler:Handler = {url:args.length==2?args[0]:"", handler: args.length == 1 ? args[0]:args[1]};
        this.routeHandler.push(handler);
        return this;
    }

    next(reqest:NextRequest, _next:Function = ()=>{}){
        // for(let handler)
        if(this.i >= this.routeHandler.length){
            this.i = 0;
            return NextResponse.next();
        }
        let {url, handler} = this.routeHandler[this.i];
        handler
        this.i = 0;
        // if()
        return 
    }
}

interface Handler {
    url:string,
    handler:Function
    match:Function
}