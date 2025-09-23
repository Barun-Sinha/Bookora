import { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers } from "../utils/allUserSlice";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.user.user?.role === "admin");
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch all users
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

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Protect route: redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate("/"); // redirect to home or login
    }
  }, [isAdmin, navigate]);

  // Optionally, you can show a loading state until check is complete
  if (!isAdmin) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex min-h-screen">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Right side content */}
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
