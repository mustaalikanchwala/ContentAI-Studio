import { useState } from 'react';
import { OPERATIONS } from '../utils/constants';
import './ContentInput.css';

const ContentInput = ({ onProcess, isLoading }) => {
  const [content, setContent] = useState('');
  const [selectedOperation, setSelectedOperation] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [tone, setTone] = useState('professional');

  const toneOptions = [
    { value: 'professional', label: 'Professional', icon: '💼' },
    { value: 'casual', label: 'Casual', icon: '😊' },
    { value: 'formal', label: 'Formal', icon: '🎩' },
    { value: 'friendly', label: 'Friendly', icon: '🤝' },
    { value: 'technical', label: 'Technical', icon: '🔧' },
    { value: 'creative', label: 'Creative', icon: '🎨' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() && selectedOperation) {
      onProcess(content, selectedOperation, targetLanguage, tone);
    }
  };

  const handleClear = () => {
    setContent('');
    setSelectedOperation('');
    setTargetLanguage('');
    setTone('professional');
  };

  return (
    <div className="content-input-container">
      <form onSubmit={handleSubmit}>
        <div className="input-section">
          <label htmlFor="content" className="input-label">
            📄 Your Content
          </label>
          <textarea
            id="content"
            className="content-textarea"
            placeholder="Paste or type your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            required
          />
          <div className="char-count">
            {content.length} characters
          </div>
        </div>

        <div className="operations-section">
          <label className="input-label">🎯 Select Operation</label>
          <div className="operations-grid">
            {OPERATIONS.map((op) => (
              <div
                key={op.value}
                className={`operation-card ${selectedOperation === op.value ? 'selected' : ''}`}
                onClick={() => setSelectedOperation(op.value)}
                role="button"
                tabIndex={0}
              >
                <span className="op-icon">{op.icon}</span>
                <span className="op-label">{op.label}</span>
                <span className="op-description">{op.description}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="tone-section">
          <label className="input-label">🎭 Select Tone</label>
          <div className="tone-grid">
            {toneOptions.map((toneOption) => (
              <div
                key={toneOption.value}
                className={`tone-option ${tone === toneOption.value ? 'selected' : ''}`}
                onClick={() => setTone(toneOption.value)}
                role="button"
                tabIndex={0}
              >
                <span className="tone-icon">{toneOption.icon}</span>
                <span className="tone-label">{toneOption.label}</span>
              </div>
            ))}
          </div>
        </div>

        {selectedOperation === 'translate' && (
          <div className="translate-section">
            <label htmlFor="targetLang" className="input-label">
              🌐 Target Language
            </label>
            <input
              type="text"
              id="targetLang"
              className="language-input"
              placeholder="e.g., Spanish, French, Hindi, German"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              required
            />
          </div>
        )}

        <div className="action-buttons">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!content.trim() || !selectedOperation || isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : (
              <>
                ⚡ Process Content
              </>
            )}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClear}
            disabled={isLoading}
          >
            🗑️ Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContentInput;
