import { Home, Users, BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const links = [
    { name: "Dashboard", path: "/admin", icon: <Home size={20} /> },
    { name: "All Users", path: "/admin/users", icon: <Users size={20} /> },
    { name: "Add Books", path: "/admin/books", icon: <BookOpen size={20} />},
    { name: "Add Authors", path: "/admin/authors", icon: <BookOpen size={20} /> }
  ];

 

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${
              location.pathname === link.path ? "bg-gray-700" : ""
            }`}
          >
            {link.icon}
            <span>{link.name}</span>
        
          </Link>

        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
