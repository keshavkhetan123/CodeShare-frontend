import axios from "axios";
import { useEffect,useState } from "react";
export default function ServerStatus(){

    const [serverOnline,setServerOnline] = useState(false);
    const API = process.env.REACT_APP_serverAPI;

    useEffect(()=>{
        setServerOnline(false);
        axios.get(`${API}`).then(res=>{
            setServerOnline(true);
        })
    },[])
    return (
        <div className="absolute right-10  z-[1000]">
            <div  className={`h-2 w-2  transition-all rounded-full ${serverOnline?'bg-green-400 shadow-green-400':'bg-yellow-400 shadow-yellow-400'} shadow-[0_0_5px_2px] `}></div>

            {/* <div className="text-sm absolute">
                Server Offline
            </div> */}
        </div>
    )
}