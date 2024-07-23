import { useRef,useEffect,useState } from "react"
import langData from '../CodeEditor/langData.json';
import Loader from "../components/loader";
export default function PasteOption(props)
{
    const passCheck=useRef(null);
    const passLabel=useRef(null);
    const [langList,setlangList] = useState([]);
    const [loading,setLoading] = useState(false);
    let handleSubmit=(e)=>{
        setLoading(true);
        e.preventDefault();
        props.postFunc(e);
    }
    let handleLanguageChange = (event)=>{
        // console.log(event.target.value);
        if(event.target.value && props.setLanguage)
            props.setLanguage(event.target.value)
    }
    useEffect(() => {
        setLoading(false);
        langData.forEach(lang=>{
            setlangList(list=>[...list,<option className="bg-[#272822]" key={list.length} value={lang.id}>{lang.name}</option>])
        })
    }, [])
    
    return (
        <div className="outlin m-4 flex lg:w-fit justify-center items-center border-[.1px] rounded-sm border-[#646464] text-white">
            <form className="outlin md:text-xs text-sm my-3 flex flex-col" onSubmit={handleSubmit}>
            {/* <div className="outlin px-4 my-2 text-2xl">Options</div> */}
                <div className="outlin m-3">
                        <label className="outlin w-[70px] inline-block mx-2 ">
                            Title
                        </label>
                        <input className="w-[160px] md:w-[120px] rounded-sm py-2 px-2 bg-inherit outline-none border-[.1px] border-[#646464]" required type="text" name="title"/>
                </div>
                <div className="m-3">
                        <label className="w-[70px] inline-block mx-2">
                            Language
                        </label>
                        <select onChange={handleLanguageChange} className="w-[160px] md:w-[120px] rounded-sm py-2 px-2 bg-inherit outline-none border-[.1px] border-[#646464]" name="language">
                            {langList}
                        </select>
                </div>
                <div className="m-3 w-fit flex justify-center items-center outlin ">
                        <label className="w-[70px] inline-block mx-2">
                            Password
                        </label>
                        <input ref={passCheck} disabled className="w-[160px] md:w-[120px] cursor-not-allowed rounded-sm py-2 px-2 outline-none border-[.1px] border-[#646464]" required type="password" name="title"/>
                        <input type="checkbox" className="h-[15px] w-[15px] outlin mx-2  bg-black" name="passwordcheck"
                        onChange={(e)=>{
                            if(e.target.checked)
                            { 
                                passCheck.current.disabled=false;
                                passCheck.current.classList.remove("cursor-not-allowed")
                                passCheck.current.classList.add("bg-inherit")
                                passLabel.current.classList.add("text-green-500")
                                passLabel.current.textContent="Enabled"
                            }
                            else
                            {
                                passCheck.current.disabled=true;
                                passLabel.current.classList.remove("text-green-500")
                                passCheck.current.classList.add("cursor-not-allowed")
                                passCheck.current.classList.remove("bg-inherit")
                                passLabel.current.textContent="Disabled"
                            }
                        }} 
                        />
                        <label ref={passLabel} className="w-[60px]" >
                            Disabled
                        </label>
                </div>
                <div className="outlin items-center  m-3">
                        <label className="outlin w-[70px] inline-block mx-2 text-sm"/>
                        <button className="font-bold w-[160px] md:w-[120px] bg-green-600 rounded-sm py-2 px-2 outline-none" type="submit">
                            {loading && "Creating Link..."}
                            {!loading && "Get Link"}
                        </button>
                </div>
            </form>
        </div>
    )
}