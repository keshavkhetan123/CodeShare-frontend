import { useRef } from "react";
import { useNavigate } from "react-router"
export function RoomOption(){
    const navigate = useNavigate();
    const roomID = useRef(null);
    const handleVis = ()=>{
        navigate('/newRoom');
    }
    const handleClick = (e)=>{
        e.preventDefault();
        navigate('/rooms/'+roomID.current.value);
    }
    return (
        <div className="border-[0.1px] rounded-sm border-[#646464]
        m-4 p-16 lg:w-full  flex relative justify-center items-center">
            <div className="absolute top-0 text-3xl my-3 font-semibold">
                Code<div className="inline text-green-600">Room</div>
            </div>
            <div className="outlin flex flex-col items-center">
                <button onClick={handleVis} className="font-bold transition-all w-[160px] md:w-[100px] md:text-xs bg-green-600 hover:bg-green-700 rounded-sm text-sm py-2 px-2 outline-none">
                    Create Room
                </button>
                <div className="w-[80%] my-5 outlin gap-2 flex items-center">
                    <div className="w-full border-[.1px] border-[#646464]"></div>
                    <div className="text-[#acacac]">OR</div>
                    <div className="w-full border-[.1px] border-[#646464]"></div>
                </div>
                <form onSubmit={handleClick} className="flex gap-2">
                    <input  required ref={roomID} placeholder="Enter RoomID" className="bg-inherit outline-none border-[.1px] border-[#646464] p-2 text-sm md:text-xs rounded-sm"  type="text" />
                    <button type="submit"
                    className="md:w-[100px] md:text-xs font-bold transition-all w-[160px] bg-green-600 hover:bg-green-700 rounded-sm text-sm py-2 px-2 outline-none">
                    Join Room
                </button>
                </form>
            </div>
        </div>
    )
}