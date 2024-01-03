import React, { useState, useEffect } from "react";
import UserList from "../components/UserList";
import AddUserForm from "../components/AddUserForm";
import FilterOptions from "../components/FilterOptions";
import SearchBar from "../components/SearchBar";
import UserDetails from "../components/UserDetails";
import EditUserForm from "../components/EditUserForm";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("A-Z");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userForEditing, setUserForEditing] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const yourAuthToken = localStorage.getItem("authToken");

        const response = await fetch("http://localhost:5001/api/users/", {
          headers: {
            Authorization: `Bearer ${yourAuthToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }

        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  console.log(users);
  // Inside the useEffect for filtering and searching users
useEffect(() => {
  const filterAndSearchUsers = () => {
    let updatedUsers = [...users];

    // Filter based on searchQuery
    if (searchQuery) {
      updatedUsers = updatedUsers.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.phone.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort based on filterType
    switch (filterType) {
      case "A-Z":
        updatedUsers.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        updatedUsers.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredUsers(updatedUsers);
  };

  filterAndSearchUsers();
}, [searchQuery, filterType, users]);


  const addUser = async (newUser) => {
    const yourAuthToken = localStorage.getItem("authToken");

    try {
      const response = await fetch("http://localhost:5001/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${yourAuthToken}`,
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add user.");
      }

      const data = await response.json();
      setUsers([...users, data]);
      setFilteredUsers([...users, data]);
      setShowAddUserForm(false);
    } catch (error) {
      console.error("Error adding user:", error.message);
    }
  };

  const handleUserClick = async (userId) => {
    try {
      const yourAuthToken = localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:5001/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${yourAuthToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user details.");
      }

      const userData = await response.json();
      setSelectedUser(userData);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
    }
  };

  const goBackToList = () => {
    setSelectedUser(null);
  };

  const handleEdit = async (userId) => {
    try {
      const yourAuthToken = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:5001/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${yourAuthToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch user details for editing.");
      }
  
      const userToEdit = await response.json();
      setUserForEditing(userToEdit);
      setSelectedUser(userToEdit); // Setting selectedUser for immediate rendering
      setIsEditing(true);
    } catch (error) {
      console.error("Error fetching user details for editing:", error.message);
    }
  };
  

  const updateUser = async (updatedUser) => {
    try {
      const yourAuthToken = localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:5001/api/users/${updatedUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${yourAuthToken}`,
          },
          body: JSON.stringify(updatedUser),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to update user.");
      }
  
      const updatedUserData = await response.json();
  
      // Update the user state with the updated user data
      const updatedUsers = users.map((user) =>
        user._id === updatedUserData._id ? updatedUserData : user
      );
  
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setSelectedUser(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };
  

  const handleDelete = async (userId) => {
    try {
      const yourAuthToken = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:5001/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${yourAuthToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete user.");
      }
  
      // Filter out the deleted user from the users state
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };
  
  return (
    <div className="mx-auto py-8 px-16 bg-sky-200">
      <h1 className="text-[#1A1A89] text-3xl font-semibold mb-4">User Dashboard</h1>
      <div className="flex mb-4 justify-between">
       <div className="flex space-x-4">
       <FilterOptions setFilterType={setFilterType} />
        <SearchBar setSearchQuery={setSearchQuery} />
       </div>
        <div>
        <button onClick={() => setShowAddUserForm(true)} className="bg-[#fa7b7b] text-white text-base py-2 px-6 rounded-md">Add New User</button>
        </div>
      </div>
      {showAddUserForm && <AddUserForm addUser={addUser} />}
      {filteredUsers.length > 0 ? (
        <>
          {selectedUser && !isEditing ? (
            <UserDetails user={selectedUser} goBack={goBackToList} />
          ) : selectedUser && isEditing ? (
            <EditUserForm user={selectedUser} updateUser={updateUser} />
          ) : (
            <UserList
              users={filteredUsers}
              onUserClick={handleUserClick}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </>
      ) : (
        <div>No Data Found</div>
      )}
    </div>
  );
};

export default Dashboard;
