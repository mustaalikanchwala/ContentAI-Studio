import { useState } from 'react';
import './NotesHistory.css';

const NotesHistory = ({ notes, onDeleteNote, onClearAll }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOperation, setFilterOperation] = useState('all');

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterOperation === 'all' || note.operation === filterOperation;
    return matchesSearch && matchesFilter;
  });

  const operations = ['all', ...new Set(notes.map(n => n.operation))];

  const handleCopyNote = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  if (notes.length === 0) {
    return (
      <div className="notes-empty">
        <span className="empty-icon">📝</span>
        <p>No saved notes yet. Process some content and save results as notes!</p>
      </div>
    );
  }

  return (
    <div className="notes-history-container">
      <div className="notes-header">
        <h2 className="notes-title">📚 Saved Notes ({filteredNotes.length})</h2>
        <button className="btn-clear-all" onClick={onClearAll}>
          🗑️ Clear All
        </button>
      </div>

      <div className="notes-filters">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-select"
          value={filterOperation}
          onChange={(e) => setFilterOperation(e.target.value)}
        >
          {operations.map(op => (
            <option key={op} value={op}>
              {op === 'all' ? 'All Operations' : op.replace(/_/g, ' ').toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="notes-grid">
        {filteredNotes.map((note) => (
          <div key={note.id} className="note-card">
            <div className="note-card-header">
              <h3 className="note-card-title">{note.title}</h3>
              <div className="note-actions">
                <button
                  className="note-btn"
                  onClick={() => handleCopyNote(note.content)}
                  title="Copy content"
                >
                  📋
                </button>
                <button
                  className="note-btn delete-btn"
                  onClick={() => onDeleteNote(note.id)}
                  title="Delete note"
                >
                  🗑️
                </button>
              </div>
            </div>
            <div className="note-meta">
              <span className="note-operation">{note.operation.replace(/_/g, ' ')}</span>
              <span className="note-date">{note.timestamp}</span>
            </div>
            <div className="note-content">
              {note.content.substring(0, 200)}
              {note.content.length > 200 && '...'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesHistory;
