import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const notebooks = [
    { id: 1, title: 'Design Assets', count: '12 Notes', icon: 'book', color: 'bg-primary-container', iconColor: 'text-on-primary-container' },
    { id: 2, title: 'Project Alpha', count: '5 Notes', icon: 'architecture', color: 'bg-tertiary-container', iconColor: 'text-on-primary-container' },
    { id: 3, title: 'Ideas & Goals', count: '28 Notes', icon: 'favorite', color: 'bg-error', iconColor: 'text-on-primary' },
    { id: 4, title: 'Work Log', count: '42 Notes', icon: 'work', color: 'bg-secondary', iconColor: 'text-on-secondary' },
    { id: 5, title: 'Archive 2023', count: '156 Notes', icon: 'inventory_2', color: 'bg-outline', iconColor: 'text-on-primary' },
    { id: 6, title: 'Garden Plans', count: '8 Notes', icon: 'eco', color: 'bg-[#4CAF50]', iconColor: 'text-white' },
  ];

  return (
    <div className="pt-8 pb-24 px-margin-mobile md:px-margin-desktop min-h-screen">
      <header className="mb-8">
        <h1 className="font-h1 text-h1 text-on-surface">Note Home</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Manage your thoughts and collections.</p>
      </header>

      <div className="masonry-grid">
        {notebooks.map((notebook) => (
          <div key={notebook.id} className="group cursor-pointer" onClick={() => navigate('/note/1')}>
            <div className={`aspect-square rounded-2xl ${notebook.color} flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow mb-3`}>
              <span className={`material-symbols-outlined text-[48px] ${notebook.iconColor}`} style={{ fontSize: '48px' }}>{notebook.icon}</span>
            </div>
            <div className="px-1 text-center">
              <h4 className="font-title-md text-title-md text-on-surface">{notebook.title}</h4>
              <p className="font-date-stamp text-date-stamp text-secondary">{notebook.count}</p>
            </div>
          </div>
        ))}
      </div>

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
                <input className="w-full bg-surface-container border-b-2 border-outline-variant focus:border-primary px-4 py-3 rounded-t-lg font-body-lg text-body-lg outline-none transition-colors" placeholder="Note Title" type="text"/>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-3 px-1">Choose a theme</p>
                <div className="flex flex-wrap gap-4 px-1">
                  <button className="w-10 h-10 rounded-full bg-primary-container border-4 border-surface shadow-sm ring-2 ring-primary transition-transform active:scale-95"></button>
                  <button className="w-10 h-10 rounded-full bg-error border-4 border-surface shadow-sm hover:ring-2 hover:ring-outline transition-transform active:scale-95"></button>
                  <button className="w-10 h-10 rounded-full bg-[#4CAF50] border-4 border-surface shadow-sm hover:ring-2 hover:ring-outline transition-transform active:scale-95"></button>
                  <button className="w-10 h-10 rounded-full bg-tertiary border-4 border-surface shadow-sm hover:ring-2 hover:ring-outline transition-transform active:scale-95"></button>
                  <button className="w-10 h-10 rounded-full bg-secondary border-4 border-surface shadow-sm hover:ring-2 hover:ring-outline transition-transform active:scale-95"></button>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-primary font-title-md text-title-md hover:bg-primary/5 rounded-lg transition-colors">Cancel</button>
                <button className="flex-1 py-3 bg-primary text-on-primary font-title-md text-title-md rounded-lg shadow-md hover:bg-primary-container transition-all">Create Note</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
