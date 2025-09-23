import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from './Components/Body';
import MainContainer from './Components/MainContainer';
import Login from './Components/Login';
import { useDispatch } from 'react-redux';
import BookDetails from './Components/BookDetails';
import Cart from './Components/Cart'; 
import Profile from './Components/Profile';
import AdminDashboard from './Admin/AdminDashboard.jsx';
import { useEffect } from 'react';
import {setLoading , login , logout } from './utils/userSlice.js'
import axios from 'axios';
import UserTable from './Admin/UserTable.js';
import AddBookForm from './Admin/AddBookForm.js';
import AdminLayout from './Admin/AdminLayout.js';
import CreateAuthor from './Admin/CreateAuthor.js';

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
            <Route path='/admin' element = {<AdminLayout/>}>
              <Route index element = {<AdminDashboard/>}/> 
              <Route path='/admin/users' element = {<UserTable/>}/>
              <Route path='/admin/books' element = {<AddBookForm/>}/>
              <Route path='/admin/authors' element = {<CreateAuthor/>}/>
            </Route>
           
        </Route>
        <Route path='*' element = {<h1 className='text-center mt-20 text-3xl'>404 - Page Not Found</h1>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

