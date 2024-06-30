"use client"

import styles from "./page.module.css"
import Input1 from "@/ui/input1"
import { PrimaryButton } from "@/ui/buttons";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function FileDownloader(props: any) {
    const router = useRouter();
    const [url, setUrl] = useState("");

    function handleSubmit (e: any)  {
        e.preventDefault();
        // router.push("/pipe?url="+url);
        if(typeof window != undefined){
            window.location.assign("/pipe?url="+url)
        }
    }
    // "use server"
    return (<>
        <header className="h-[50px] leading-[50px] bdr-btm">
            <h1 className="mx-5 my-0">File Downloader</h1>
        </header>
        <section className="flex justify-center" >
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input1 label="Enter URL" oninput={setUrl} id="url-input" />
                <PrimaryButton text="Submit" style={{ margin: `10px` }} />
            </form>
        </section>
    </>)
}
