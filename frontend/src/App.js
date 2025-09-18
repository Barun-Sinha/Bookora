import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from './Components/Body';
import MainContainer from './Components/MainContainer';
import Login from './Components/Login';

function App() {
  return (
    <div className="App">

     <BrowserRouter>
     <Routes>
        <Route path='/' element = {<Body/>}>
            <Route path='/' element = {<MainContainer/>}/>
            <Route path='/login' element = {<Login/>}/>
        </Route>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

