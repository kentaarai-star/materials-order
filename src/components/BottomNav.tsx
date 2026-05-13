import React from 'react';
import { useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="fixed bottom-0 left-0 w-full md:hidden flex justify-around items-center h-16 pb-safe bg-surface border-t border-outline-variant z-50">
      <div className={`flex flex-col items-center justify-center px-4 py-1 ${isHome ? 'bg-primary-container text-on-primary-container rounded-2xl' : 'text-on-surface-variant'}`}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: isHome ? "'FILL' 1" : "" }}>home</span>
        <span className="font-label-sm text-label-sm">Home</span>
      </div>
      <div className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1">
        <span className="material-symbols-outlined">search</span>
        <span className="font-label-sm text-label-sm">Search</span>
      </div>
      {!isHome && (
        <div className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-2xl px-4 py-1">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
          <span className="font-label-sm text-label-sm">Notes</span>
        </div>
      )}
      {isHome && (
        <div className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1">
          <span className="material-symbols-outlined">star</span>
          <span className="font-label-sm text-label-sm">Favorites</span>
        </div>
      )}
      <div className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1">
        <span className="material-symbols-outlined">person</span>
        <span className="font-label-sm text-label-sm">Profile</span>
      </div>
    </nav>
  );
};

export default BottomNav;
