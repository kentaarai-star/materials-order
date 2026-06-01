import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState('bg-primary-container');
  const navigate = useNavigate();
  const isInitialMount = useRef(true);

  const fetchNotes = useCallback(() => {
    setLoading(true);
    if (typeof google !== 'undefined' && google.script && google.script.run) {
      google.script.run
        .withSuccessHandler((result: Note[]) => {
          setNotes(result);
          setLoading(false);
        })
        .withFailureHandler((error: Error) => {
          console.error('Failed to fetch notes:', error);
          setLoading(false);
        })
        .getNotes();
    } else {
      // Mock data for local development
      setTimeout(() => {
        setNotes([
          { id: '1', title: 'Design Assets (Mock)', icon: 'book', color: 'bg-primary-container', iconColor: 'text-on-primary-container', userEmail: 'mock@example.com', createdAt: new Date().toString() },
          { id: '2', title: 'Project Alpha (Mock)', icon: 'architecture', color: 'bg-tertiary-container', iconColor: 'text-on-primary-container', userEmail: 'mock@example.com', createdAt: new Date().toString() },
        ]);
        setLoading(false);
      }, 500);
    }
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchNotes();
    }
  }, [fetchNotes]);

  const handleCreateNote = () => {
    if (!newNoteTitle.trim()) return;

    if (typeof google !== 'undefined' && google.script && google.script.run) {
      google.script.run
        .withSuccessHandler(() => {
          setIsModalOpen(false);
          setNewNoteTitle('');
          fetchNotes();
        })
        .withFailureHandler((error: Error) => {
          console.error('Failed to create note:', error);
        })
        .createNote({
          title: newNoteTitle,
          color: selectedColor,
          icon: 'book',
          iconColor: 'text-on-primary-container'
        });
    } else {
      // Mock creation
      const newNote: Note = {
        id: Math.random().toString(),
        title: newNoteTitle,
        icon: 'book',
        color: selectedColor,
        iconColor: 'text-on-primary-container',
        userEmail: 'mock@example.com',
        createdAt: new Date().toString()
      };
      setNotes(prev => [...prev, newNote]);
      setIsModalOpen(false);
      setNewNoteTitle('');
    }
  };

  return (
    <div className="pt-8 pb-24 px-margin-mobile md:px-margin-desktop min-h-screen">
      <header className="mb-8">
        <h1 className="font-h1 text-h1 text-on-surface">Note Home</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Manage your thoughts and collections.</p>
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-on-surface-variant">Loading notes...</p>
        </div>
      ) : notes.length === 0 ? (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">note_stack</span>
          <p className="text-on-surface-variant font-body-lg">No notes yet. Create your first one!</p>
        </div>
      ) : (
        <div className="masonry-grid">
          {notes.map((note) => (
            <div key={note.id} className="group cursor-pointer" onClick={() => navigate(`/note/${note.id}`)}>
              <div className={`aspect-square rounded-2xl ${note.color} flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow mb-3`}>
                <span className={`material-symbols-outlined text-[48px] ${note.iconColor}`} style={{ fontSize: '48px' }}>{note.icon}</span>
              </div>
              <div className="px-1 text-center">
                <h4 className="font-title-md text-title-md text-on-surface">{note.title}</h4>
                <p className="font-date-stamp text-date-stamp text-secondary">{new Date(note.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-margin-mobile right-margin-mobile md:bottom-margin-desktop md:right-margin-desktop w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary text-on-primary shadow-lg flex items-center justify-center z-40 active:scale-90 transition-transform hover:shadow-xl group"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-on-background/40 backdrop-blur-[4px]">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-xl shadow-2xl p-6 transform transition-all scale-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-h2 text-h2 text-on-surface">New Note</h2>
              <button onClick={() => setIsModalOpen(false)} className="material-symbols-outlined text-on-surface-variant p-1 hover:bg-surface-container rounded-full">close</button>
            </div>
            <div className="space-y-6">
              <div className="relative">
                <input
                  className="w-full bg-surface-container border-b-2 border-outline-variant focus:border-primary px-4 py-3 rounded-t-lg font-body-lg text-body-lg outline-none transition-colors"
                  placeholder="Note Title"
                  type="text"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                />
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-3 px-1">Choose a theme</p>
                <div className="flex flex-wrap gap-4 px-1">
                  <button
                    onClick={() => setSelectedColor('bg-primary-container')}
                    className={`w-10 h-10 rounded-full bg-primary-container border-4 border-surface shadow-sm ${selectedColor === 'bg-primary-container' ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-outline'} transition-transform active:scale-95`}
                  ></button>
                  <button
                    onClick={() => setSelectedColor('bg-error')}
                    className={`w-10 h-10 rounded-full bg-error border-4 border-surface shadow-sm ${selectedColor === 'bg-error' ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-outline'} transition-transform active:scale-95`}
                  ></button>
                  <button
                    onClick={() => setSelectedColor('bg-[#4CAF50]')}
                    className={`w-10 h-10 rounded-full bg-[#4CAF50] border-4 border-surface shadow-sm ${selectedColor === 'bg-[#4CAF50]' ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-outline'} transition-transform active:scale-95`}
                  ></button>
                  <button
                    onClick={() => setSelectedColor('bg-tertiary-container')}
                    className={`w-10 h-10 rounded-full bg-tertiary-container border-4 border-surface shadow-sm ${selectedColor === 'bg-tertiary-container' ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-outline'} transition-transform active:scale-95`}
                  ></button>
                  <button
                    onClick={() => setSelectedColor('bg-secondary')}
                    className={`w-10 h-10 rounded-full bg-secondary border-4 border-surface shadow-sm ${selectedColor === 'bg-secondary' ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-outline'} transition-transform active:scale-95`}
                  ></button>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-primary font-title-md text-title-md hover:bg-primary/5 rounded-lg transition-colors">Cancel</button>
                <button
                  onClick={handleCreateNote}
                  disabled={!newNoteTitle.trim()}
                  className="flex-1 py-3 bg-primary text-on-primary font-title-md text-title-md rounded-lg shadow-md hover:bg-primary-container transition-all disabled:opacity-50"
                >
                  Create Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
