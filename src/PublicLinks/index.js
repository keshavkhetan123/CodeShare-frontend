import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import CodeEditor from "../CodeEditor/newEditor";
import Loader from "../components/loader";
import NotFound from "../components/notFoundHandle";
import PassCheck from "../components/passCheck";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleBackClick}
        >
            Back to Home
        </button>
    );
};

export default function PublicLink() {
    const [loading, setLoading] = useState(true);
    const [code, setCode] = useState('');
    const [title, setTitle] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [available, setAvailable] = useState(false);
    const [isPublic, setIsPublic] = useState(false);
    const param = useParams();
    const pass = useRef(null);
    const editorRef = useRef(null);
    const API = process.env.REACT_APP_serverAPI;

    useEffect(() => {
        let link = param.link;
        axios.get(`${API}${link}`).then((res) => {
            let data = res.data;
            setLanguage(data[0].language);
            setCode(data[0].code);
            setTitle(data[0].title);
            setLoading(false);
            setAvailable(true);
            setIsPublic(true);
            document.title = data[0].title + " | CodeShare";
        }).catch((e) => {
            if (e.response.status === 403) {
                // Requires password
                setLoading(false);
                setIsPublic(false);
                setAvailable(true);
            } else {
                // Not found
                setLoading(false);
                setIsPublic(false);
                setAvailable(false);
            }
        })
    }, []);

    let handleSubmit = (e) => {
        e.preventDefault();
        let passwrd = pass.current.value;
        let link = param.link;
        setLoading(true);
        axios.get(`${API}${link}`, { params: { "password": passwrd } }).then((res) => {
            let data = res.data;
            setCode(data[0].code);
            setLanguage(data[0].language);
            setTitle(data[0].title);
            setLoading(false);
            setAvailable(true);
            setIsPublic(true);
            document.title = data[0].title;
        }).catch(e => {
            // Password is wrong
            setLoading(false);
            alert("Incorrect Password");
        })
    };

    if (loading) {
        return (
            <Loader />
        );
    }

    if (available) {
        // Two options: Either link is public or link is password protected.
        if (isPublic) {
            // Return CodeEditor with the paste that came from Backend
            return (
                <div className="h-[90vh]">
                    <CodeEditor reference={editorRef} code={code} language={language} readOnly={true} />
                    <BackButton /> {/* Include BackButton */}
                </div>
            );
        } else {
            // Return a component that would take password.
            return (
                <>
                    <PassCheck passRef={pass} handleSubmit={handleSubmit} />
                    <BackButton /> {/* Include BackButton */}
                </>
            );
        }
    } else {
        // Code for link not available
        return (
            <>
                <NotFound />
                <BackButton /> {/* Include BackButton */}
            </>
        );
    }
}
