import TextEditor from "../CodeEditor/newEditor"

export default function CodeInput(props){
    // let heightAdjust=(e)=>{
    //     e.target.style.height=`${e.target.scrollHeight}px`
    // }
    return (
        <div className="outlin h-[40vh] text-white mx-4 mt-5">
            {/* <div className="px-1 my-1 text-lg font-bold text-white">New Paste</div> */}
            {/* <textarea ref={props.reference} placeholder="Paste/Enter Here..." className="
            bg-[#363735]  text-white w-full resize-none min-h-[300px] rounded-md
            py-3 px-4 outline-none
            " onInput={heightAdjust}>
            </textarea> */}
            <TextEditor language = {props.language} reference = {props.reference}/>
        </div>
    )
}