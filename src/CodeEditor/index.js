import hljs from "highlight.js";
import 'highlight.js/styles/base16/monokai.css'
import { useEffect,useState } from "react";
import { useRef } from "react";
export default function CodeEditor(props){
    const codeRef=useRef(null);
    const [number,setNumber]=useState([]);
    useEffect(()=>{
        if(codeRef.current)
        {
            setNumber([]);
            hljs.highlightElement(codeRef.current);
            // const content = codeRef.current.textContent;
            // const lineCount = (content.match(/\n/g)).length + 1;
            const lineheight=parseFloat(getComputedStyle(codeRef.current).lineHeight)
            const lineCount=codeRef.current.offsetHeight/lineheight
            for(let i=1;i<=lineCount;i++)
            {
                setNumber((numb)=>[...numb,<div key={i}>{i}</div>])
            }
            // let x= getComputedStyle(codeRef.current).lineHeight;
        }
    },[])
    
    return (
        <div className="m-4 min-w-[50%] min-h-[100px] border-[.1px] border-[#646464] h-fit text-sm rounded-lg overflow-clip bg-[#272822]">
            <div className="text-white border-b-[#646464] border-b-[.1px] px-6 py-1 text-xl flex justify-between">
                <div>{props.title}</div>
                <div className="hover:outline px-2 outline-[1px] outline-gray-500 select-none cursor-pointer rounded-sm text-base flex justify-center items-center"
                onClick={(e)=>{
                    if(navigator.clipboard && navigator.clipboard.writeText)
                    {
                        navigator.clipboard.writeText(codeRef.current.textContent).then(()=>{
                            e.target.innerText="Copied"
                            setTimeout(()=>{
                                e.target.innerText="Copy"
                            },1000)
                        }).catch((e)=>alert("Internal Error"));
                    }
                    else
                    {
                        const tempInput = document.createElement('input');
                        tempInput.value = codeRef.current.textContent;
                        document.body.appendChild(tempInput);
                        tempInput.select();
                        document.execCommand('copy');
                        document.body.removeChild(tempInput);
                        e.target.innerText="Copied"
                        setTimeout(()=>{
                            e.target.innerText="Copy"
                        },1000)
                    }

                }}
                >Copy</div>
            </div>
            <pre className="whitespace-pre-wrap flex">
            <div className=" text-[#bebebe] border-r-[#646464] border-r-[.1px] px-2 flex flex-col items-center">
                {number}   
            </div>  
            <code ref={codeRef} className="!py-0 !px-2">
                {props.code}
            </code> 
            </pre> 
        </div>
    )
}