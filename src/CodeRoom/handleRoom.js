import axios from "axios";
import { useEffect,useState } from "react";
import { useParams } from "react-router";
import NotFound from "../components/notFoundHandle";
import Loader from "../components/loader";
import CodeRoom from './index.js';
import PassCheck from "../components/passCheck";
import { useRef } from "react";

export default function HandleRoom(){
    const param = useParams();
    const [notFound,setNotFound] = useState(false);
    const [loading,setLoading] = useState(true);
    const [passProtected,setProtected] = useState(false);
    const [roomID,setRoomID] = useState(null);
    const [title,setTitle] = useState('');
    const [codeData,setCodeData] = useState('');
    const [codeChanges,setCodeChanges] = useState('');
    const [roomLang,setRoomLang] = useState('');
    const [password,setPassword] = useState('');
    const [publicCheck,setPublicCheck] = useState(true);
    const passwordRef = useRef(null);

    const API = process.env.REACT_APP_serverAPI;

    useEffect(()=>{
        let roomID  = param.roomID;
        // send this to server to check;
        setNotFound(false);
        setLoading(true);
        setRoomID('');
        axios.get(`${API}rooms/${roomID}`).then(res=>{
            
            let body = res.data;
            // console.log(body[0]);
            setRoomID(body[0]._id);
            setCodeData(body[0].code);
            setTitle(body[0].title);
            setRoomLang(body[0].language);
            setPublicCheck(body[0].isPublic);
            document.title = body[0].title;
            setLoading(false);
            setNotFound(false);
        }).catch(e=>{

            let errorCode  = e.response.status;
            if(errorCode===404)
            {
                //room not found;
                setLoading(false);
                setNotFound(true);

            }
            else if(errorCode===403)
            {
                // password protected
                setLoading(false);
                setNotFound(false);
                setProtected(true);
            }
            else
            {
                console.log(e);
            }
        })
    },[param.roomID])

    const handleSave = async()=>{
        // upload code here;
        let data={
            title:title,
            code:codeChanges,
            language:roomLang,
            isPublic:publicCheck,
            password:password
        };
        return new Promise((resolve)=>{
            axios.put(`${API}rooms/${param.roomID}`,data).then(res=>{
                // data saved successfully;
                resolve(true);
            }).catch(error=>{
                console.log(error);
                resolve(true);
            })

        })
    }
    const handleCheck = (e)=>{
        e.preventDefault();
        let passwrd=passwordRef.current.value;
        let roomID=param.roomID;
        setLoading(true);
        setProtected(false);
        setPassword('');
        axios.get(`${API}rooms/${roomID}`,{params:{"password":passwrd}}).then((res)=>{
            let data=res.data;
            // console.log(data[0]);
            setRoomID(data[0]._id);
            setCodeData(data[0].code);
            setRoomLang(data[0].language);
            setPublicCheck(data[0].isPublic);
            setPassword(passwrd);
            document.title = data[0].title;
            setLoading(false);
            setNotFound(false);

        }).catch(e=>{
            // Password is wrong
            setLoading(false);
            setProtected(true);
            setNotFound(false);
            alert("Incorrect Password");
        })  
    }
    return (
        <>
            {loading && <Loader/>}
            {notFound && <NotFound/>}
            {passProtected && <PassCheck passRef={passwordRef} handleSubmit = {handleCheck}/>}
            {!loading && !notFound && !passProtected && <CodeRoom setCodeChanges={setCodeChanges}  uploadChange={handleSave} id={roomID} data={codeData} lang = {roomLang}/>}
        </>
    )
}