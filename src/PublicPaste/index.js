import axios from "axios";
import { useEffect,useState } from "react"
import PublicItem from "../components/publicitems"
import Loader from '../components/loader'
export default function PublicPaste(){
    const [items,setItems]=useState([]);
    const [loading,setLoading]=useState(true);
    const API = process.env.REACT_APP_serverAPI;
    useEffect(()=>{
        axios.get(`${API}`).then(res=>{
            setLoading(false);
            let data=res.data;
            data.sort((a,b)=>{
                if(a.createdAt>b.createdAt)
                {
                    return -1;
                }
                else
                {
                    return 1;

                }
            });
            console.log(data);

            for(let i=0;i<data.length;i++)
            {
                setItems(item=>[...item,<PublicItem key={i} link={data[i].link} title={data[i].title} language={data[i].language} date={data[i].createdAt.substring(0,10)}/>])
            }
        }).catch(e=>console.log(e));
    },[])
    return (
        <div className="text-white border-[0.1px] rounded-sm border-[#646464]
        m-4 p-2 h-[300px] min-w-[200px] flex flex-col">
            <div className="outlin text-xl px-2 py-1 pb-2">
                Public Archive
            </div>
            <div className="overflow-scroll h-full">
                {loading && 
                    <div className="h-full flex justify-center items-center">
                        <Loader/>
                    </div>
                }
                {!loading && items}
            </div>
        </div>

    )
}