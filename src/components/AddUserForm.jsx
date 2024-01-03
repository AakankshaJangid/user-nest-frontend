import React, { useState } from 'react';

const AddUserForm = ({ addUser }) => {
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!user.name || !user.email || !user.phone) {
      setError('All fields are mandatory');
      return;
    }

    try {
      await addUser(user);
      setUser({ name: '', email: '', phone: '' });
      setError('');
    } catch (error) {
      setError('Failed to add user. Please try again.');
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className='bg-white shadow-md p-4 rounded-md bg-opacity-50 flex flex-col w-2/4 my-4'>
      <h2 className='text-[#1A1A89]'>Add User</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} className='flex flex-col gap-2 justify-center items-center'>
        <input
          type="text"
          placeholder="Username"
          name="name"
          value={user.name}
          onChange={handleChange}
          className="w-full border-b-2 border-gray-300 p-2 bg-transparent outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className="w-full border-b-2 border-gray-300 p-2 bg-transparent outline-none"
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          className="w-full border-b-2 border-gray-300 p-2 bg-transparent outline-none"
        />
        <button type="submit" className="bg-[#3030aa] hover:bg-[#1A1A89] text-white w-2/4 py-1 rounded-sm">Save</button>
      </form>
    </div>
  );
};

export default AddUserForm;
