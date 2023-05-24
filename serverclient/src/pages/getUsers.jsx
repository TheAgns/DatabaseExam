import React, { useState } from "react";
import { getUsers } from "../lib/sql";

const Users = () => {
  const [users, setUsers] = useState([]);

  const handleGetUsers = async () => {
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error retrieving users:", error);
    }
  };

  return (
    <div>
      <button onClick={handleGetUsers}>Get Users</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}{user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
