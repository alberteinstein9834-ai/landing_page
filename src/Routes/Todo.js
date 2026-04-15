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
    console.log("Add User function called");
    console.log("Username value:", username);
    console.log("Age value:", age);
    
    if (username.trim() && age.trim()) {
      const newUser = {
        username: username,
        age: parseInt(age),
      };
      
      console.log("New user to add:", newUser);
      console.log("Current users array before add:", users);
      
      setUsers([...users, newUser]);
      
      console.log("Users array after add:", [...users, newUser]);
      
      setUsername('');
      setAge('');
      
      console.log("Form cleared");
    } else {
      console.log("Validation failed - username or age is empty");
      alert("Please fill in both fields!");
    }
  };

  // Update - Edit user by index
  const updateUser = (index, newUsername, newAge) => {
    console.log("Update User function called");
    console.log("Updating index:", index);
    console.log("New username:", newUsername);
    console.log("New age:", newAge);
    console.log("Current users:", users);
    
    const updatedUsers = [...users];
    updatedUsers[index] = {
      username: newUsername,
      age: parseInt(newAge)
    };
    
    console.log("Updated users array:", updatedUsers);
    
    setUsers(updatedUsers);
    setEditIndex(null);
    setEditUsername('');
    setEditAge('');
    
    console.log("Edit mode cleared");
  };

  // Delete - Remove user by index
  const deleteUser = (index) => {
    console.log("Delete User function called");
    console.log("Deleting index:", index);
    console.log("Current users:", users);
    
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter((_, i) => i !== index);
      console.log("Users after deletion:", updatedUsers);
      setUsers(updatedUsers);
    } else {
      console.log("Deletion cancelled");
    }
  };

  // Start editing
  const startEdit = (user, index) => {
    console.log("Start Edit function called");
    console.log("Editing user:", user);
    console.log("At index:", index);
    
    setEditIndex(index);
    setEditUsername(user.username);
    setEditAge(user.age);
    
    console.log("Edit mode set with:", {
      editIndex: index,
      editUsername: user.username,
      editAge: user.age
    });
  };

  // Log whenever users array changes
  React.useEffect(() => {
    console.log("Users state changed! Current users:", users);
  }, [users]);

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
                    console.log("Username input changed:", e.target.value);
                    if (editIndex !== null) {
                      setEditUsername(e.target.value);
                    } else {
                      setUsername(e.target.value);
                    }
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      console.log("Enter key pressed in username field");
                      if (editIndex !== null) {
                        updateUser(editIndex, editUsername, editAge);
                      } else {
                        addUser();
                      }
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
                    console.log("Age input changed:", e.target.value);
                    if (editIndex !== null) {
                      setEditAge(e.target.value);
                    } else {
                      setAge(e.target.value);
                    }
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      console.log("Enter key pressed in age field");
                      if (editIndex !== null) {
                        updateUser(editIndex, editUsername, editAge);
                      } else {
                        addUser();
                      }
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
                      onClick={() => {
                        console.log("Update button clicked");
                        updateUser(editIndex, editUsername, editAge);
                      }}
                    >
                      Update User
                    </button>
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => {
                        console.log("Cancel button clicked");
                        setEditIndex(null);
                        setEditUsername('');
                        setEditAge('');
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className="btn btn-primary w-100" onClick={() => {
                    console.log("Add button clicked");
                    addUser();
                  }}>
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
                                onClick={() => {
                                  console.log("Edit button clicked for user:", user);
                                  startEdit(user, index);
                                }}
                              >
                                Edit
                              </button>
                              <button 
                                className="btn btn-danger" 
                                onClick={() => {
                                  console.log("Delete button clicked for index:", index);
                                  deleteUser(index);
                                }}
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