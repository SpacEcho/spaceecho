import React from 'react';
import BottomNav from '@/components/navigation/BottomNav';

export default function Layout({ children, currentPageName }) {
  const showNav = ['Home', 'Design', 'Profile'].includes(currentPageName);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {children}
      {showNav && <BottomNav currentPage={currentPageName} />}
    </div>
  );
}