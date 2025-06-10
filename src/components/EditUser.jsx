import React, { useState } from 'react';

function EditUser({ user, onSave, onClose }) {
  const [form, setForm] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-full max-w-md p-8 bg-white border border-gray-300 rounded-xl shadow-lg"
      >
        <h2 className="text-4xl font-bold text-center mb-4">Edit User</h2>

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="password"
          type="text"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md"
          >
            Save
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg shadow-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;