import React, { useEffect, useState } from "react";
import StatsCard from "./StatusCard";
import { useSelector } from "react-redux";
import axios from "axios";



const AdminDashboard = () => {
  const [authors, setAuthors] = useState(null);
 
 
  const allUsers = useSelector((state) => state.allUsers); // read from Redux 
  const allBooks = useSelector((state) => state.allBooks); // read from Redux


  const getAuthor  = async() => {
    // Fetch authors from backend if needed
    const response = await axios.get("http://localhost:5000/api/admin/authors", {
      withCredentials: true
    });
    setAuthors(response.data);
    
  }

  useEffect(() => { 
    getAuthor();
  }, [])
  const totalBooks = allBooks.length;
  const totalUsers = allUsers.length;
  const totalAuthors = authors ? authors.length : 0;

  return (
    <div className="flex">
      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-3 gap-6">
          <StatsCard title="Total Users" value={totalUsers} />
          <StatsCard title="Total Books" value= {totalBooks} />
          <StatsCard title="Total Authors" value= {totalAuthors} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
