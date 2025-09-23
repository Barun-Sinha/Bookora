import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditUserModal from "./EditUserModal";
import axios from "axios";
import { setAllUsers } from "../utils/allUserSlice";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const UserTable = () => {
  const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const users = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

 

const exportToExcel = () => {
  // Prepare data for Excel
  const data = filteredUsers.map((user, index) => ({
    "#": index + 1,
    "Username": user.username,
    "Email": user.email,
    "Role": user.role,
  }));

  // Create a worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

  // Generate Excel file and save
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(file, "users.xlsx");
};


  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  } 

  // Update user role
const handleUpdate = async (id, data) => {
  try {
     await axios.patch(
      `http://localhost:5000/api/admin/users/${id}/role`,
      { role: data.role },
      {withCredentials: true}
    );
    // Refresh user list after update
    const res = await axios.get("http://localhost:5000/api/admin/users/", {
      withCredentials: true,
    });
    dispatch(setAllUsers(res.data));
    setIsModalOpen(false);

  } catch (error) {
    console.error(error);
  }
};

const handelDelete = async (id) => {
    alert("Are you sure you want to delete this user?");
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        withCredentials: true,
      });   
        // Refresh user list after deletion
        const res = await axios.get("http://localhost:5000/api/admin/users/", {
          withCredentials: true,
        });
        dispatch(setAllUsers(res.data));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
}

  // Filter users by name or ID
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.id.toString().includes(search)
  );

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      {/* Search Input */}
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Search by ID or Username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
         <button
    onClick={exportToExcel}
    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
  >
    Export to Excel
  </button>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Table Head */}
          <thead className="bg-gray-200">
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user.id}>
                  <th>{index + 1}</th>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className="flex gap-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                    onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    onClick={() => handelDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500 text-sm"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
        {/* Edit User Modal */}
        <EditUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        onUpdate={handleUpdate}
      />

        {/* Pagination (if needed) */}
    </div>
  );
};

export default UserTable;
