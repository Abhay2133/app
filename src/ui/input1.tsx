"use client"

import { useState } from "react";
import styles from "./input1.module.css";

export default function Input1(
    { id, label, oninput, type = "text" }: { type ?: string, id: string, label: string, oninput: Function }
) {
    const [state, setState] = useState("");

    const handleInput = (e:any) =>{
        setState(e.target.value);
        oninput(e.target.value);
    }
    return (
        <div className={styles['material-input-box']}>
            <input id={id} type={type} value={state} onChange={handleInput} required/>
            <label htmlFor={id}>{label}</label>
        </div>
    )
}