import {io} from 'socket.io-client';
import { useRef,useEffect,useState } from 'react';
import TextEditor from '../CodeEditor/newEditor';
import { RiSaveFill } from "react-icons/ri";
import Participants from './participants';
import EnterName from '../components/enterName';
// import Loader from '../components/loader';
export default function CodeRoom(props){

    const [editorMounted,setEditorMount] = useState(false);
    const [editorLocked,setLocked] = useState(false);
    const [userName,setUserName] = useState(null);
    const nameRef = useRef(null);
    const [socket,setSocket] = useState(null);
    const [saving,setSaving]  = useState(false);
    const editorRef = useRef(null);
    const [roomID,setRoomID] = useState(props.id);
    const [participantsData,setParticipantsData] = useState([]);
    const API = process.env.REACT_APP_serverAPI;
    const timerRef = useRef(null);
    const TIMER_TIMEOUT = 2000; // 5 seconds;
   useEffect(()=>{
    const  newsocket = io(`${API}`);
    setSocket(newsocket);

    newsocket.on('code-update', (updatedCode) => {
        editorRef.current.setValue(updatedCode);
        // editorRef.current.updateOptions({ readOnly: true });
        // setLocked(true);
        props.setCodeChanges(updatedCode);
      });
    newsocket.on('participants-update',(updatedParticipantsList)=>{
        setParticipantsData(updatedParticipantsList);
        console.log(updatedParticipantsList);
    }) 
    newsocket.on('lock-freed',()=>{
        setLocked(false);
    })
    newsocket.on('lock-acquired',()=>{
        setLocked(true);
    })
    return ()=> newsocket.close();
},[])
useEffect(()=>{
    if(editorRef.current && editorMounted)
        {
            editorRef.current.onKeyUp((e)=>{
                if(editorRef.current.getRawOptions().readOnly===false)
                    {
                        // emit here that lock is acquired
                        console.log(editorLocked);
                        socket.emit('lock-acquired',roomID);
                        const newCode = editorRef.current.getValue();
                        socket.emit('code-change',roomID, newCode);
                        props.setCodeChanges(newCode);
                        
                        // here start a countdown to free the lock 
                        clearTimeout(timerRef.current);
                        timerRef.current = setTimeout(freeLock, TIMER_TIMEOUT);
                    }
                    
                })
            }
        },[editorMounted, editorLocked, roomID, socket, props])
        useEffect(()=>{
            setRoomID(props.id);
            if(socket && props.id && userName)
                {
                    socket.emit('joinRoom',props.id,userName);
                }
            },[socket,props.id,userName])
            
            const saveChange = async ()=>{
                
                setSaving(true);
                await props.uploadChange();
                setSaving(false);
            }
            const handleName = (e)=>{
                e.preventDefault();
                if(nameRef.current)
                    {
                        if(nameRef.current.value.trim()==='')
                            return;
                        setUserName(nameRef.current.value.trim());
                    }
                    
                }
                const freeLock = ()=>{
        socket.emit('lock-freed',roomID);

        // auto-saved
        saveChange();
    }
    return (
        <div className='h-[90vh]'>
            <TextEditor setMounted={setEditorMount} reference = {editorRef} language={props.lang} code={props.data} editorLocked={editorLocked}/>
            <div className='flex relative justify-center items-center'>
                <div onClick={saveChange} className='rounded-[100%] transition-all hover:bg-green-700 cursor-pointer  p-4 bg-green-600 text-white absolute text-4xl'>
                    {saving && 
                    
                        <div>
                            <svg aria-hidden="true" className="w-6 h-6 text-white animate-spin  fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                        </div>}
                    {!saving && <RiSaveFill/>}
                </div>
            </div>
           {!userName &&  <div className='absolute top-0 h-full w-full backdrop-blur-sm z-10 flex justify-center items-center'>
                <EnterName nameRef={nameRef} handleSubmit={handleName}/>
            </div>}
            <div className='absolute right-0 bottom-0'>
                <Participants participantsData={participantsData}/>
            </div>
        </div>
    )
}