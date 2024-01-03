const UserList = ({ users, onUserClick, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {users.map((user) => (
        <div key={user._id} className="bg-white shadow-md p-4 rounded-md">
          <h2 className="text-lg font-semibold text-[#1A1A89]">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.phone}</p>
          <div className="flex gap-6 my-2">
            <button onClick={() => onUserClick(user._id)} className="bg-emerald-400 py-1 px-3 rounded-sm text-white">View</button>
            <button onClick={() => onEdit(user._id)} className="bg-[#fa7b7b] py-1 px-3 rounded-sm text-white">Edit</button>
            <button onClick={() => onDelete(user._id)} className="bg-red-600 py-1 px-3 rounded-sm text-white">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
