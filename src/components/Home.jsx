import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EditUser from './EditUser';

function Home() {
  const location = useLocation();
  const { user = { username: 'Guest' } } = location.state || {};


  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const submit = () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = '/login';
  };

  const handleDelete = (userToDelete) => {
    const updatedUsers = users.filter((u) => u.email !== userToDelete.email);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedUser(users[index]);
    setShowModel(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = (updatedUser) => {
  const updatedUsers = [...users];
  updatedUsers[editingIndex] = updatedUser;
  localStorage.setItem('users', JSON.stringify(updatedUsers));
  setUsers(updatedUsers);
  setShowModel(false);
  setEditingIndex(null);
};

  const handleCancel = () => {
    setShowModel(false);
    setEditingIndex(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Welcome, {user?.username}</h2>
        <button
          onClick={submit}
          className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-200 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">No.</th>
              <th className="px-6 py-3">User Name</th>
              <th className="px-6 py-3">User Email</th>
              <th className="px-6 py-3">User Password</th>
              <th className="px-6 py-3">Delete</th>
              <th className="px-6 py-3">Edit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((u, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4">{index + 1}</td>

                {editingIndex === index ? (
                  <>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        name="username"
                        value={editedUser.username}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="email"
                        name="email"
                        value={editedUser.email}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        name="password"
                        value={editedUser.password}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="px-6 py-4" colSpan={2}>
                      <button
                        onClick={() => handleSave(index)}
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4">{u.username}</td>
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4">{u.password}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(u)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleEditClick(index)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModel && (
  <EditUser
    user={editedUser}
    onSave={(updatedUser) => handleSave(updatedUser)}
    onClose={handleCancel}
  />
)}

    </div>
  );
}

export default Home;