import React, { useState } from "react";
import axios from "axios";

const CreateAuthor = () => {
  const [authorData, setAuthorData] = useState({
    name: "",
    bio: "",
    birthDate: "",
    nationality: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthorData({ ...authorData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/authors/",
        authorData,
        { withCredentials: true }
      );

      setSuccessMessage("Author created successfully!");
      setAuthorData({
        name: "",
        bio: "",
        birthDate: "",
        nationality: "",
      });
    } catch (error) {
      console.error("Error creating author:", error);
      if (error.response && error.response.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Failed to create author. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Author</h2>

      {/* Success & Error Messages */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-300 rounded">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={authorData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            value={authorData.bio}
            onChange={handleChange}
            rows={4}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        {/* Birth Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Birth Date</label>
          <input
            type="date"
            name="birthDate"
            value={authorData.birthDate}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Nationality</label>
          <input
            type="text"
            name="nationality"
            value={authorData.nationality}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Create Author
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAuthor;
