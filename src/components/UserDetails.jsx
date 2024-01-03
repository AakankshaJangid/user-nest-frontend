import React from "react";

const UserDetails = ({ user, goBack }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-md w-2/4">
      <div className="flex justify-between">
        <h2 className="text-[#1A1A89]">User Details</h2>
        <button onClick={goBack} className="bg-emerald-400 py-1 px-3 text-white rounded-sm">Go Back</button>
      </div>
      <div>
        <p className="text-[#fc6262]">ID: <span className="text-gray-600">{user._id}</span></p>
        <p className="text-[#fc6262]">Username: <span className="text-gray-600">{user.name}</span></p>
        <p className="text-[#fc6262]">Email: <span className="text-gray-600">{user.email}</span></p>
        <p className="text-[#fc6262]">Phone: <span className="text-gray-600">{user.phone}</span></p>
      </div>
    </div>
  );
};

export default UserDetails;
