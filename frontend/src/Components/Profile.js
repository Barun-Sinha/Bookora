
import React from "react";
import { UserCircle, Heart, LogOut, Edit } from "lucide-react";

const Profile = () => {



  return (
    <div className="flex justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
            <UserCircle size={80} className="text-blue-600" />
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">Barun</h2>
          <p className="text-gray-500">Frontend Developer</p>
        </div>

        {/* Stats */}
        <div className="flex justify-around mt-6">
          <div className="text-center">
            <p className="text-xl font-bold text-gray-800">24</p>
            <p className="text-sm text-gray-500">Wishlist</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-gray-800">12</p>
            <p className="text-sm text-gray-500">Orders</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-gray-800">5</p>
            <p className="text-sm text-gray-500">Reviews</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 space-y-3">
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium transition">
            <Edit size={20} /> Edit Profile
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 font-medium transition">
            <Heart size={20} /> Wishlist
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-medium transition">
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
