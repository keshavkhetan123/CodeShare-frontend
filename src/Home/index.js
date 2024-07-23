import CodeInput from "../CodeInput"
import PasteOption from "../PasteOptions"
import PublicPaste from "../PublicPaste"
import { useEffect, useRef, useState } from "react"
import { RoomOption } from "../CodeRoom/RoomOption";
import { useNavigate } from "react-router";
import axios from "axios";
export default function Home() {
  const [language, setLanguage] = useState("javascript");
  let langData = ['plaintext', 'abap', 'apex', 'azcli', 'bat', 'bicep', 'cameligo', 'clojure', 'coffeescript', 'c', 'cpp', 'csharp', 'csp', 'css', 'cypher', 'dart', 'dockerfile', 'ecl', 'elixir', 'flow9', 'fsharp', 'freemarker2', 'freemarker2.tag-angle.interpolation-dollar', 'freemarker2.tag-bracket.interpolation-dollar', 'freemarker2.tag-angle.interpolation-bracket', 'freemarker2.tag-bracket.interpolation-bracket', 'freemarker2.tag-auto.interpolation-dollar', 'freemarker2.tag-auto.interpolation-bracket', 'go', 'graphql', 'handlebars', 'hcl', 'html', 'ini', 'java', 'javascript', 'julia', 'kotlin', 'less', 'lexon', 'lua', 'liquid', 'm3', 'markdown', 'mdx', 'mips', 'msdax', 'mysql', 'objective-c', 'pascal', 'pascaligo', 'perl', 'pgsql', 'php', 'pla', 'postiats', 'powerquery', 'powershell', 'proto', 'pug', 'python', 'qsharp', 'r', 'razor', 'redis', 'redshift', 'restructuredtext', 'ruby', 'rust', 'sb', 'scala', 'scheme', 'scss', 'shell', 'sol', 'aes', 'sparql', 'sql', 'st', 'swift', 'systemverilog', 'verilog', 'tcl', 'twig', 'typescript', 'vb', 'wgsl', 'xml', 'yaml', 'json'];
  const code = useRef(null);
  const navigate = useNavigate();
  const API = process.env.REACT_APP_serverAPI;
  useEffect(()=>{
    document.title = "CodeShare"
  },[])
  let pastePost = (e)=>{
    let title=e.target[0].value;
        let language=e.target[1].value;
        let password=e.target[2].value;
        let passCheck=e.target[3].checked;
        if(passCheck)
        {
            let data={"title":title,"language":language,"password":password,"isPublic":0,"code":code.current.getValue()};
            axios.post(`${API}`,data).then((res)=>{
                let body=res.data;
                navigate(`/${body.link}`)
            }).catch((e)=>console.log(e))
        }
        else
        {
            let data={"title":title,"language":language,"isPublic":1,"code":code.current.getValue()};
            axios.post(`${API}`,data).then((res)=>{
                let body=res.data;
                navigate(`/${body.link}`)
            }).catch((e)=>console.log(e))
        }
  }
  return (
    <div>
      <CodeInput language = {language} reference={code} />
      <div className='lg:flex-row mt-10 flex flex-col'>
        <PasteOption languages = {langData} setLanguage={setLanguage} postFunc = {pastePost} />
        <PublicPaste />
        <RoomOption/>
      </div>
    </div>
  )
}