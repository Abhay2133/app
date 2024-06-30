import styles from "./buttons.module.css"

export function PrimaryButton({ style={}, id = `${Math.floor(Math.random() * 10)}`, text, onclick=()=>{} }: { style?:Object, id?: string, text: string, onclick?: Function }) {
    function handleClick(e:any){
        onclick(e);
    }
    return (
        <button
            className={styles.primary_btn}
            id={id}
            style={style}
            onClick={handleClick}>
            {text}
        </button>)
}