// import { metadata } from "../layout";
import { Metadata } from "next";

var count = 0;

export const metadata:Metadata = {
    title : "Hit Counter"
}

export default function Counter (){
    count += 1;
    return (<section className="flex justify-center items-center min-h-[100vh]">
        Hit Counter : {count}
    </section>)
}