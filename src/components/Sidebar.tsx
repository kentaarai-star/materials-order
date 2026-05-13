import React from 'react';
import { useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  if (isHome) {
    return (
      <aside className="hidden md:flex flex-col py-unit gap-1 fixed left-0 top-16 h-[calc(100vh-64px)] w-[280px] bg-surface-container-low">
        <div className="px-6 py-4">
          <h3 className="font-title-md text-title-md text-on-surface">My Workspace</h3>
          <p className="text-label-sm font-label-sm text-secondary">Premium Plan</p>
        </div>
        <nav className="flex flex-col gap-1 pr-4">
          <a className="flex items-center gap-3 py-3 px-6 bg-secondary-container text-on-secondary-container rounded-r-full mr-4 transition-all" href="#">
            <span className="material-symbols-outlined">description</span>
            <span className="font-body-md text-body-md">All Notes</span>
          </a>
          <a className="flex items-center gap-3 py-3 px-6 text-on-surface-variant hover:bg-surface-container-high rounded-r-full mr-4 transition-all" href="#">
            <span className="material-symbols-outlined">star</span>
            <span className="font-body-md text-body-md">Favorites</span>
          </a>
          <a className="flex items-center gap-3 py-3 px-6 text-on-surface-variant hover:bg-surface-container-high rounded-r-full mr-4 transition-all" href="#">
            <span className="material-symbols-outlined">folder</span>
            <span className="font-body-md text-body-md">Notebooks</span>
          </a>
          <a className="flex items-center gap-3 py-3 px-6 text-on-surface-variant hover:bg-surface-container-high rounded-r-full mr-4 transition-all" href="#">
            <span className="material-symbols-outlined">sell</span>
            <span className="font-body-md text-body-md">Tags</span>
          </a>
          <a className="flex items-center gap-3 py-3 px-6 text-on-surface-variant hover:bg-surface-container-high rounded-r-full mr-4 transition-all" href="#">
            <span className="material-symbols-outlined">delete</span>
            <span className="font-body-md text-body-md">Trash</span>
          </a>
        </nav>
        <div className="mt-auto px-6 pb-8">
          <button className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-on-primary rounded-full shadow-md hover:bg-primary-container transition-all active:scale-95">
            <span className="material-symbols-outlined">add</span>
            <span className="font-title-md text-title-md">New Folder</span>
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="hidden md:flex flex-col py-unit gap-1 fixed left-0 top-16 h-[calc(100vh-64px)] w-[280px] bg-surface-container-low border-r border-outline-variant">
      <div className="px-6 py-4">
        <h3 className="font-title-md text-title-md text-on-surface">Notebook Sections</h3>
        <p className="font-label-sm text-label-sm text-on-surface-variant">Q4 Project Strategy</p>
      </div>
      <nav className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        <div className="space-y-1">
          <a className="flex items-center gap-3 px-6 py-3 bg-secondary-container text-on-secondary-container rounded-r-full mr-4 transition-all duration-200" href="#">
            <span className="material-symbols-outlined">description</span>
            <span className="font-body-md text-body-md truncate">Executive Summary</span>
          </a>
          <a className="flex items-center gap-3 px-6 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-r-full mr-4 transition-all duration-200" href="#">
            <span className="material-symbols-outlined">description</span>
            <span className="font-body-md text-body-md truncate">Market Analysis</span>
          </a>
          {/* ... other items ... */}
        </div>
      </nav>
      <div className="p-4 border-t border-outline-variant">
        <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary text-on-primary rounded-xl font-title-md text-title-md shadow-sm hover:shadow-md transition-all active:scale-95">
          <span className="material-symbols-outlined">add</span>
          <span>New Section</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
