import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex pt-16 min-h-screen">
        <Sidebar />
        <main className="flex-1 md:ml-[280px]">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
};

export default Layout;
