import React, { useState, useEffect, useCallback } from 'react';
import './notes.css';

const Notes = () => {
  // State management
  const [notes, setNotes] = useState([]);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [showAlert, setShowAlert] = useState({ show: false, message: '', type: '' });
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    color: '#FFF9C4'
  });

  // Load notes from localStorage on component mount
  useEffect(() => {
    loadNotesFromStorage();
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0 || localStorage.getItem('stickyNotesApp')) {
      persistNotes();
    }
  });

  // Auto-hide alert after 3 seconds
  useEffect(() => {
    if (showAlert.show) {
      const timer = setTimeout(() => {
        setShowAlert({ show: false, message: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  // Helper: get consistent rotation based on note ID
  const getRotationFromId = (id) => {
    const seed = (id % 19) / 10;
    const angle = (seed - 0.9) * 3.2;
    return angle.toFixed(1);
  };

  // Save notes to localStorage
  const persistNotes = useCallback(() => {
    localStorage.setItem('stickyNotesApp', JSON.stringify(notes));
  }, [notes]);

  // Load notes from localStorage or default samples
  const loadNotesFromStorage = () => {
    const stored = localStorage.getItem('stickyNotesApp');
    if (stored) {
      const parsedNotes = JSON.parse(stored);
      setNotes(parsedNotes.map(n => ({ ...n, color: n.color || '#FFF9C4' })));
    } else {
      // Default demo notes
      const defaultNotes = [
        {
          id: Date.now() + 101,
          title: '✨ Welcome to Sticky Notes!',
          content: 'Create, edit or delete notes. They are saved automatically. Pick a color!',
          color: '#FFF9C4',
          createdAt: new Date().toISOString()
        },
        {
          id: Date.now() + 102,
          title: '📌 Project ideas',
          content: 'Finish the Bootstrap sticky notes dashboard, add drag & drop later. Also add more stickers!',
          color: '#C8E6C9',
          createdAt: new Date().toISOString()
        },
        {
          id: Date.now() + 103,
          title: '🛒 Shopping list',
          content: 'Milk, eggs, avocado, bread, and coffee ☕',
          color: '#B3E5FC',
          createdAt: new Date().toISOString()
        }
      ];
      setNotes(defaultNotes);
    }
  };

  // Filter notes based on search query
  const getFilteredNotes = () => {
    if (!searchQuery.trim()) return [...notes];
    const query = searchQuery.trim().toLowerCase();
    return notes.filter(note => 
      note.title.toLowerCase().includes(query) || 
      note.content.toLowerCase().includes(query)
    );
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id === 'noteTitle' ? 'title' : id === 'noteContent' ? 'content' : 'color']: value
    }));
  };

  // Reset form to create mode
  const resetFormToCreateMode = () => {
    setCurrentEditId(null);
    setFormData({
      title: '',
      content: '',
      color: '#FFF9C4'
    });
  };

  // Show custom alert
  const showCustomAlert = (message, type = 'error') => {
    setShowAlert({ show: true, message, type });
  };

  // Save or update note
  const saveNote = () => {
    const { title, content, color } = formData;
    
    if (!title.trim()) {
      showCustomAlert('Please add a title for your sticky note!', 'error');
      return false;
    }
    if (!content.trim()) {
      showCustomAlert('Please write some content for your note!', 'error');
      return false;
    }
    
    if (currentEditId !== null) {
      // UPDATE mode
      setNotes(prevNotes => 
        prevNotes.map(note => 
          note.id === currentEditId 
            ? {
                ...note,
                title: title.trim(),
                content: content.trim(),
                color: color,
                updatedAt: new Date().toISOString()
              }
            : note
        )
      );
      showCustomAlert('Note updated successfully!', 'success');
    } else {
      // CREATE mode
      const newNote = {
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
        color: color,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setNotes(prevNotes => [newNote, ...prevNotes]);
      showCustomAlert('Note created successfully!', 'success');
    }
    
    resetFormToCreateMode();
    return true;
  };

  // Start editing a note
  const startEditNote = (id) => {
    const noteToEdit = notes.find(n => n.id === id);
    if (!noteToEdit) return;
    
    setCurrentEditId(noteToEdit.id);
    setFormData({
      title: noteToEdit.title,
      content: noteToEdit.content,
      color: noteToEdit.color || '#FFF9C4'
    });
    
    // Scroll to form smoothly
    document.querySelector('.form-card')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
  };

  // Show delete confirmation modal
  const confirmDeleteNote = (id) => {
    setNoteToDelete(id);
    setShowDeleteModal(true);
  };

  // Delete a single note
  const deleteNoteById = () => {
    setNotes(prevNotes => prevNotes.filter(n => n.id !== noteToDelete));
    
    if (currentEditId === noteToDelete) {
      resetFormToCreateMode();
    }
    
    setShowDeleteModal(false);
    setNoteToDelete(null);
    showCustomAlert('Note deleted successfully!', 'success');
  };

  // Show delete all confirmation modal
  const confirmDeleteAllNotes = () => {
    if (notes.length === 0) {
      showCustomAlert('No notes to delete!', 'error');
      return;
    }
    setShowDeleteAllModal(true);
  };

  // Delete all notes
  const deleteAllNotes = () => {
    setNotes([]);
    resetFormToCreateMode();
    setShowDeleteAllModal(false);
    showCustomAlert('All notes deleted successfully!', 'success');
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
  };

  // Escape HTML for XSS prevention
  const escapeHtml = (str) => {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  };

  const filteredNotes = getFilteredNotes();

  return (
    <div className="container my-4">
      {/* Custom Alert Toast */}
      {showAlert.show && (
        <div className={`alert alert-${showAlert.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`} 
             style={{ zIndex: 9999, minWidth: '300px' }} 
             role="alert">
          <span className="me-2">{showAlert.type === 'success' ? '✅' : '⚠️'}</span>
          {showAlert.message}
          <button type="button" className="btn-close" onClick={() => setShowAlert({ show: false, message: '', type: '' })}></button>
        </div>
      )}

      {/* Delete Single Note Modal */}
      {showDeleteModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <span className="text-danger me-2">🗑️</span>
                  Delete Note
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this sticky note?</p>
                <p className="text-muted small">This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={deleteNoteById}>
                  <span className="me-1">🗑️</span> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete All Notes Modal */}
      {showDeleteAllModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <span className="text-warning me-2">⚠️</span>
                  Delete All Notes
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteAllModal(false)}></button>
              </div>
              <div className="modal-body">
                <p className="fw-bold">⚠️ Warning: This action cannot be undone!</p>
                <p>Are you sure you want to delete all your sticky notes?</p>
                <p className="text-muted small">This will permanently remove {notes.length} note{notes.length !== 1 ? 's' : ''}.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteAllModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={deleteAllNotes}>
                  <span className="me-1">🗑️</span> Delete All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold">
          <span className="text-warning me-2">📝</span> Sticky Notes CRUD
        </h1>
        <p className="lead text-muted">Create, Read, Update, Delete — your colorful sticky notes</p>
      </div>

      {/* Form Card: Create / Edit Note */}
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="card form-card p-3 p-md-4">
            <div className="card-body">
              <h5 className="card-title mb-3">
                <span className="me-2 text-primary">✏️</span>
                <span>{currentEditId ? 'Editing note' : 'Create new note'}</span>
              </h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">📝 Title</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="noteTitle" 
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Grocery list" 
                    maxLength="60"
                  />
                  <div className="form-text">Max 60 characters</div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">🎨 Color theme</label>
                  <select 
                    className="form-select" 
                    id="noteColor"
                    value={formData.color}
                    onChange={handleInputChange}
                  >
                    <option value="#FFF9C4">💛 Soft Yellow</option>
                    <option value="#C8E6C9">🍃 Mint Green</option>
                    <option value="#B3E5FC">💧 Sky Blue</option>
                    <option value="#E1BEE7">🌸 Lavender</option>
                    <option value="#FFCCBC">🍑 Coral Peach</option>
                    <option value="#FFE0B5">🧡 Warm Apricot</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">📄 Content</label>
                  <textarea 
                    className="form-control" 
                    id="noteContent" 
                    rows="3" 
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Write your sticky note idea here..." 
                    maxLength="500"
                  ></textarea>
                  <div className="form-text">Max 500 characters</div>
                </div>
                <div className="col-12 d-flex gap-2 justify-content-end">
                  {currentEditId && (
                    <button 
                      className="btn btn-secondary" 
                      onClick={resetFormToCreateMode}
                      type="button"
                    >
                      <span className="me-1">❌</span> Cancel
                    </button>
                  )}
                  <button 
                    className={`btn ${currentEditId ? 'btn-warning' : 'btn-primary'} px-4`} 
                    onClick={saveNote}
                  >
                    <span className="me-1">💾</span> 
                    {currentEditId ? 'Update Note' : 'Add Note'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Actions Row */}
      <div className="row align-items-center my-3 gy-2">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white">🔍</span>
            <input 
              type="text" 
              className="form-control" 
              placeholder="🔍 Search sticky notes (title or content)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-secondary" onClick={clearSearch} type="button">
              Clear
            </button>
          </div>
        </div>
        <div className="col-md-6 text-md-end">
          <button className="btn btn-danger" onClick={confirmDeleteAllNotes}>
            <span className="me-1">🗑️</span> Delete All Notes
          </button>
        </div>
      </div>

      {/* Sticky Notes Grid */}
      <div className="row" id="notesGrid">
        {filteredNotes.length === 0 ? (
          <div className="col-12">
            <div className="empty-notes">
              <span className="display-1 mb-3">📝</span>
              <h5>No sticky notes found</h5>
              <p className="mb-0">
                {searchQuery ? 'Try a different search term' : 'Create your first sticky note using the form above!'}
              </p>
            </div>
          </div>
        ) : (
          filteredNotes.map(note => {
            const rotation = getRotationFromId(note.id);
            const bgColor = note.color || '#FFF9C4';
            const safeTitle = escapeHtml(note.title);
            const safeContent = escapeHtml(note.content).replace(/\n/g, '<br>');
            
            return (
              <div className="col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch" key={note.id}>
                <div 
                  className="sticky-card w-100" 
                  style={{ backgroundColor: bgColor, transform: `rotate(${rotation}deg)` }}
                >
                  <div className="sticky-title">{safeTitle}</div>
                  <div className="sticky-content" dangerouslySetInnerHTML={{ __html: safeContent || '<em class="text-muted">(empty note)</em>' }} />
                  <div className="sticky-footer">
                    <button 
                      className="btn-sticky-icon edit-btn" 
                      onClick={() => startEditNote(note.id)}
                      title="Edit note"
                    >
                      ✏️
                    </button>
                    <button 
                      className="btn-sticky-icon delete-btn" 
                      onClick={() => confirmDeleteNote(note.id)}
                      title="Delete note"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Notes;