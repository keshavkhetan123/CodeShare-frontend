import PasteOption from '../PasteOptions'
import axios from 'axios';
import { useNavigate } from 'react-router';
export default function CreateRoom()
{
    const navigate = useNavigate();
const API = process.env.REACT_APP_serverAPI;
console.log(API)
let roomPost = (e)=>{
            let title=e.target[0].value;
            let language=e.target[1].value;
            let password=e.target[2].value || "";
            let passCheck=e.target[3].checked;
            // console.log(passCheck);
            let data={"title":title,"language":language,"password":password,"isPublic":(passCheck?false:true),"code":" "};
            
            axios.post(`${API}rooms/`,data).then((res)=>{
                let body=res.data;
                navigate(`/rooms/${body.link}`)
            }).catch((e)=>console.log(e))
      }
    return (
        <div className='flex items-center justify-center h-[95vh]'>
            <PasteOption postFunc = {roomPost}/>
        </div>
    )
}