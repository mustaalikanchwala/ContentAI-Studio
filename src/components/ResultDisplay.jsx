import { useState } from 'react';
import './ResultDisplay.css';

const ResultDisplay = ({ result, operation, onSaveNote, onClose }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [showSaveForm, setShowSaveForm] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleSave = () => {
    if (noteTitle.trim()) {
      onSaveNote(noteTitle, result, operation);
      setNoteTitle('');
      setShowSaveForm(false);
    }
  };

  const operationLabel = operation.replace(/_/g, ' ').toUpperCase();

  return (
    <div className="result-display-container">
      <div className="result-header">
        <h2 className="result-title">✨ Result</h2>
        <div className="result-actions">
          <span className="operation-badge">{operationLabel}</span>
          <button className="icon-btn" onClick={handleCopy} title="Copy to clipboard">
            {isCopied ? '✅' : '📋'}
          </button>
          <button className="icon-btn" onClick={() => setShowSaveForm(!showSaveForm)} title="Save as note">
            💾
          </button>
          <button className="icon-btn close-btn" onClick={onClose} title="Close">
            ❌
          </button>
        </div>
      </div>

      {showSaveForm && (
        <div className="save-form">
          <input
            type="text"
            className="note-title-input"
            placeholder="Enter note title..."
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
          />
          <button className="btn btn-save" onClick={handleSave}>
            Save Note
          </button>
        </div>
      )}

      <div className="result-content">
        <pre className="result-text">{result}</pre>
      </div>

      {isCopied && (
        <div className="toast">
          ✅ Copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
