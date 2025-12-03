import { useState } from 'react';
import Header from './components/Header';
import ContentInput from './components/ContentInput';
import ResultDisplay from './components/ResultDisplay';
import NotesHistory from './components/NotesHistory';
import { useLocalStorage } from './hooks/useLocalStorage';
import { processContent } from './services/api';
import './App.css';

function App() {
  const [notes, setNotes] = useLocalStorage('contentai-notes', []);
  const [result, setResult] = useState(null);
  const [currentOperation, setCurrentOperation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleProcess = async (content, operation, targetLanguage, tone) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await processContent(content, operation, targetLanguage, tone);
      setResult(response);
      setCurrentOperation(operation);
    } catch (err) {
      setError(err.message || 'Failed to process content. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNote = (title, content, operation) => {
    const newNote = {
      id: Date.now(),
      title,
      content,
      operation,
      timestamp: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
      })
    };
    setNotes([newNote, ...notes]);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all notes?')) {
      setNotes([]);
    }
  };

  const handleCloseResult = () => {
    setResult(null);
    setCurrentOperation('');
    setError(null);
  };

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <ContentInput 
            onProcess={handleProcess} 
            isLoading={isLoading}
          />

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          {result && (
            <ResultDisplay
              result={result}
              operation={currentOperation}
              onSaveNote={handleSaveNote}
              onClose={handleCloseResult}
            />
          )}

          <NotesHistory
            notes={notes}
            onDeleteNote={handleDeleteNote}
            onClearAll={handleClearAll}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
