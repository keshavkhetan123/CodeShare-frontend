import {Editor,useMonaco} from "@monaco-editor/react"
import { useEffect ,useState} from "react";
export default function TextEditor(props){
    let monaco = useMonaco();
    let [mounted,setMounted] = useState(false);
    useEffect(() => {
        if (monaco) {
        import('monaco-themes/themes/Monokai Bright.json')
            .then(data => {
            monaco.editor.defineTheme('monokai-bright', data);
            })
            .then(_ => monaco.editor.setTheme('monokai-bright'))
        // monaco.editor.defineTheme("monokai-bright").then(_ => monaco.editor.setMonacoTheme("monokai-bright"));
        }
    }, [monaco,mounted]);
    useEffect(()=>{
        if(props.language)
        {
            handleLangChange(props.language);
        }
    },[props.language,mounted])
    let handleMount = (editor,monaco)=>{
        props.reference.current = editor;
        setMounted(true);
        if(props.setMounted)
            props.setMounted(true);
        // editor.onDidAttemptReadOnlyEdit(() => {
        //     alert("Custom error message: This editor is in read-only mode.");
        //     });
    }
    let handleLangChange = (language)=>{
        if(monaco && props.reference.current)
        {
            let model = props.reference.current.getModel();
            monaco.editor.setModelLanguage(model,language);
        }
    }
    return(
        <div className={`relative h-full py-2 ${props.readOnly?'':'outline'} outline-[#ffffff33] rounded-lg overflow-clip`}>
            <Editor
            className="" 
            defaultLanguage="javascript"
            value={props.code}
            onMount={handleMount}
            options={{
                readOnly:props.readOnly || props.editorLocked
            }}
            />
            { props.editorLocked && 
            <div className="absolute z-10 top-0 right-10 py-3 px-4 border-b-2 border-green-500 backdrop-blur-md rounded-sm">
                Someone else is typing...
            </div>}
        </div>
    )
}
TextEditor.defaultProps= {
    readOnly:false,
    code:"",
    language:"javascript"
}