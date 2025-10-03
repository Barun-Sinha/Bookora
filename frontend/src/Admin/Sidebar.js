import { Home, Users, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import UserTable from "./UserTable";
import AddBookForm from "./AddBookForm";
import CreateAuthor from "./CreateAuthor";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers } from "../utils/allUserSlice";
import AllBooks from "./AllBooks";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = useSelector((state) => state.user?.user?.role);

 

  const links = [
    { name: "Dashboard", path: "/admin", icon: <Home size={20} />, component: <AdminDashboard /> },
    { name: "All Users", path: "/admin/users", icon: <Users size={20} />, component: <UserTable /> },
    { name: "Add Books", path: "/admin/books", icon: <BookOpen size={20} />, component: <AddBookForm /> },
    { name: "Add Authors", path: "/admin/authors", icon: <BookOpen size={20} />, component: <CreateAuthor /> },
    { name: "All Books", path: "/admin/authors", icon: <BookOpen size={20} />, component: <AllBooks/> },
  ];

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  const fetchAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users/", {
        credentials: "include",
      }); 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }   
      const data = await response.json();
      dispatch(setAllUsers(data));
    } catch (error) { 
      console.error("Error fetching users:", error);
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchAllUsers();
  }, []);

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

   if (role !== "admin") {
  // redirect or show "No access"
  navigate("/");
  return;
  }


  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Left */}
      <div className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <nav className="flex flex-col gap-2">
          {links.map((link, index) => (
            <div
              key={link.name}
              className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer hover:bg-gray-700 ${
                currentIndex === index ? "bg-gray-700" : ""
              }`}
              onClick={() => handleClick(index)}
            >
              {link.icon}
              <span>{link.name}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Content - Right */}
      <div className="flex-1 p-6 bg-gray-100">
        {links[currentIndex].component}
      </div>
    </div>
  );
};

export default Sidebar;
