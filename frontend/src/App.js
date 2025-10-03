import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from './Components/Body';
import MainContainer from './Components/MainContainer';
import Login from './Components/Login';
import { useDispatch } from 'react-redux';
import BookDetails from './Components/BookDetails';
import Cart from './Components/Cart'; 
import Profile from './Components/Profile';
import Sidebar from './Admin/Sidebar.js';
import { useEffect } from 'react';
import {setLoading , login , logout } from './utils/userSlice.js'
import axios from 'axios';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async ()=>{
      dispatch(setLoading(true));
      try {
        
        const res = await axios.get('http://localhost:5000/api/auth/me',{
          withCredentials: true
        });
        if (res.data?.user) {
          console.log(res.data.user);
        dispatch(login(res.data.user));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
      } finally {
        dispatch(setLoading(false));
      }
    };
    checkAuth();
  }, [dispatch]);


  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
        <Route path='/' element = {<Body/>}>
            <Route path='/' element = {<MainContainer/>}/>
            <Route path='/profile' element = {<Profile/>}/>
            <Route path='/book/:id' element = {<BookDetails/>}/>
            <Route path='/cart' element = {<Cart/>}/>
            <Route path='/login' element = {<Login/>}/>
            <Route path='/admin' element = {<Sidebar/>}/>
            
           
        </Route>
        <Route path='*' element = {<h1 className='text-center mt-20 text-3xl'>404 - Page Not Found</h1>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

