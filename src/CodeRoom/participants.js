import { useEffect } from "react";
import { useState } from "react"
import ParticipantItem from "./participantItem";
export default function Participants({
    participantsData
}){

    const [showParticipants,setShowParticipants] = useState(true);
    const [participantsList,setParticipantsList] = useState([]);
    let handleParticipantVisibility = ()=>{
        setShowParticipants(!showParticipants);
    }
    useEffect(()=>{
        let newList = participantsData.map(item=><ParticipantItem username={item.username} online/>)
        console.log(newList)
        setParticipantsList(newList);
    },[participantsData])
    return (
        <div className="bg-[#272822] px-3 py-2 relative rounded-lg outline outline-[#414141] w-[250px] mx-5 my-2">
            {/* Participants List */}
            {showParticipants && <div className="max-h-[400px] overflow-scroll absolute bottom-[100%] w-[90%] px-5 my-2 py-2 bg-[#383931] rounded-md">
                {participantsList}
            </div>}
            {/* Heading Part */}
            <div onClick={handleParticipantVisibility} className="select-none outlin cursor-pointer font-semibold items-center px-5 flex text-lg justify-center">
                    {showParticipants?"Hide":"Show"} Participants
            </div>

        </div>
    )
}