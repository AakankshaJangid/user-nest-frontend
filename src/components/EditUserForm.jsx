import { useState } from "react";

const EditUserForm = ({ user, updateUser }) => {
  const [editedUser, setEditedUser] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(editedUser);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-2/4 bg-white shadow-md p-4 rounded-md bg-opacity-50 justify-center items-center">
      <input
        title="name"
        type="text"
        name="name"
        value={editedUser.name}
        onChange={handleInputChange}
        className="w-full border-b-2 border-gray-300 p-2 bg-transparent outline-none"
      />
      <input
        title="email"
        type="email"
        name="email"
        value={editedUser.email}
        onChange={handleInputChange}
        className="w-full border-b-2 border-gray-300 p-2 bg-transparent outline-none"
      />
      <input
        title="phone"
        type="text"
        name="phone"
        value={editedUser.phone}
        onChange={handleInputChange}
        className="w-full border-b-2 border-gray-300 p-2 bg-transparent outline-none"
      />
      <button type="submit" className="bg-[#3030aa] hover:bg-[#1A1A89] text-white w-2/4 py-1 rounded-sm">Save Changes</button>
    </form>
  );
};

export default EditUserForm;
