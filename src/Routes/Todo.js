import React, { useState } from 'react';

function Todo() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editUsername, setEditUsername] = useState('');
  const [editAge, setEditAge] = useState('');

  // Create - Add new user
  const addUser = () => {
    if (username.trim() && age.trim()) {
      const newUser = {
        username: username,
        age: parseInt(age),
      };
      setUsers([...users, newUser]);
      setUsername('');
      setAge('');
    }
  };

  // Update - Edit user by index
  const updateUser = (index, newUsername, newAge) => {
    const updatedUsers = [...users];
    updatedUsers[index] = {
      username: newUsername,
      age: parseInt(newAge)
    };
    setUsers(updatedUsers);
    setEditIndex(null);
    setEditUsername('');
    setEditAge('');
  };

  // Delete - Remove user by index
  const deleteUser = (index) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter((_, i) => i !== index);
      setUsers(updatedUsers);
    }
  };

  // Start editing
  const startEdit = (user, index) => {
    setEditIndex(index);
    setEditUsername(user.username);
    setEditAge(user.age);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <h1 className="text-center mb-4 text-primary">User Management CRUD</h1>
        
        {/* First Card - Input Form */}
        <div className="col-md-5 mb-4">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">{editIndex !== null ? 'Edit User' : 'Add New User'}</h3>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={editIndex !== null ? editUsername : username}
                  onChange={(e) => {
                    if (editIndex !== null) {
                      setEditUsername(e.target.value);
                    } else {
                      setUsername(e.target.value);
                    }
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && editIndex !== null) {
                      updateUser(editIndex, editUsername, editAge);
                    } else if (e.key === 'Enter') {
                      addUser();
                    }
                  }}
                  placeholder="Enter username..."
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="age" className="form-label">Age</label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  value={editIndex !== null ? editAge : age}
                  onChange={(e) => {
                    if (editIndex !== null) {
                      setEditAge(e.target.value);
                    } else {
                      setAge(e.target.value);
                    }
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && editIndex !== null) {
                      updateUser(editIndex, editUsername, editAge);
                    } else if (e.key === 'Enter') {
                      addUser();
                    }
                  }}
                  placeholder="Enter age..."
                />
              </div>
              
              <div className="d-flex gap-2">
                {editIndex !== null ? (
                  <>
                    <button 
                      className="btn btn-success" 
                      onClick={() => updateUser(editIndex, editUsername, editAge)}
                    >
                      Update User
                    </button>
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => {
                        setEditIndex(null);
                        setEditUsername('');
                        setEditAge('');
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className="btn btn-primary w-100" onClick={addUser}>
                    Add User
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Second Card - Display Output */}
        <div className="col-md-7">
          <div className="card shadow-lg">
            <div className="card-header bg-success text-white">
              <h3 className="mb-0">User List ({users.length})</h3>
            </div>
            <div className="card-body">
              {users.length === 0 ? (
                <div className="alert alert-info text-center mb-0">
                  No users added yet. Add your first user!
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Age</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={index}>
                          {/* Display array index (starting from 1) */}
                          <td>
                            <span className="badge bg-secondary">{index + 1}</span>
                          </td>
                          <td>
                            <strong>{user.username}</strong>
                          </td>
                          <td>
                            <span className="badge bg-info">{user.age} years</span>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button 
                                className="btn btn-warning" 
                                onClick={() => startEdit(user, index)}
                              >
                                Edit
                              </button>
                              <button 
                                className="btn btn-danger" 
                                onClick={() => deleteUser(index)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;