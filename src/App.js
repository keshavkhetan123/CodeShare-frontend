import './App.css';
import Home from './Home';
import PublicLink from './PublicLinks';
import {Routes,Route} from 'react-router'
import Navbar from './components/navbar';
import CreateRoom from './CodeRoom/createRoom';
import HandleRoom from './CodeRoom/handleRoom';
import CodeRoom from './CodeRoom';
function App() {
  
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/:link" element={<PublicLink/>}/>
      <Route path="/newRoom" element={<CreateRoom/>}/>
      <Route path="/rooms/:roomID" element={<HandleRoom/>}/>
      <Route path='/dev' element={<CodeRoom/>}/>
    </Routes>
    {/* <CodeRoom/> */}
    </>
  );
}

export default App;
