'use client';
import { METHODS } from 'http';
import React, { useState } from 'react';

async function getUser() {
  const res = await fetch('http://localhost:3000/api/user');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  console.log(res);
  return res.json();
}

async function createUser(userData) {
  try {
    const res = await fetch('http://localhost:3000/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error('Failed to create user');
    }

    return await res.json();
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export default async function Page() {
  const data = await getUser();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    address: '',
  });

  function handleInputChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createUserData(formData);
      // Optionally, you can handle success, e.g., show a success message
      console.log('User created successfully');
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error('Error creating user:', error);
    }
  }

  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Full Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user) => (
              <tr
                key={user.id}
                className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {user.full_name}
                </th>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.address}</td>
                <a href="">
                  <td className="px-6 py-4">Delete</td>
                </a>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-9">
        <form>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            placeholder="Full Name"
          />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            onChange={handleInputChange}
            placeholder="Password"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </>
  );
}
