import { FaUser } from "react-icons/fa";
export default function ParticipantItem(props){

    return(
        <div className="outlin relative py-2 flex items-center">
           <div>
                <FaUser/>
           </div>
           <div className="mx-2 text-sm">
                {props.username}
           </div>
           <div className={`text-xs ${props.online?"text-green-400":"text-[#999999]"}   right-0 absolute`}>
                {props.online?"Online":"Offline"}
           </div>
        </div>
    )
}