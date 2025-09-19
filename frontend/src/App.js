import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from './Components/Body';
import MainContainer from './Components/MainContainer';
import Login from './Components/Login';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import BookDetails from './Components/BookDetails';
import Cart from './Components/Cart';

function App() {
  return (
    <div className="App">
    <Provider store={appStore}>
     <BrowserRouter>
     <Routes>
        <Route path='/' element = {<Body/>}>
            <Route path='/' element = {<MainContainer/>}/>
            <Route path='/book/:id' element = {<BookDetails/>}/>
            <Route path='/cart' element = {<Cart/>}/>
            <Route path='/login' element = {<Login/>}/>
        </Route>
     </Routes>
     </BrowserRouter>
    </Provider>
    </div>
  );
}

export default App;

