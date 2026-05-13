import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 bg-surface shadow-sm">
      <div className="flex items-center gap-4">
        <button className="material-symbols-outlined text-on-surface p-2 hover:bg-surface-container rounded-full transition-colors md:hidden">menu</button>
        <Link to="/" className="font-h2 text-h2 text-primary tracking-tight">MindMeld</Link>
      </div>

      {!isHome && (
        <div className="hidden md:flex items-center px-4 py-1.5 bg-surface-container rounded-full gap-2 border border-outline-variant">
          <span className="material-symbols-outlined text-primary text-[18px]">folder_open</span>
          <span className="font-title-md text-title-md text-on-surface">Q4 Project Strategy</span>
        </div>
      )}

      {isHome && (
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-4">
            <a className="text-primary font-bold border-b-2 border-primary py-1 font-title-lg text-title-lg" href="#">Home</a>
            <a className="text-on-surface-variant hover:bg-surface-container transition-colors py-1 font-title-lg text-title-lg px-2 rounded" href="#">Recent</a>
          </nav>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-surface-container transition-colors rounded-full">search</button>
        <button className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-surface-container transition-colors rounded-full">settings</button>
        <div className="h-8 w-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container ml-2">
          <span className="material-symbols-outlined">account_circle</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
