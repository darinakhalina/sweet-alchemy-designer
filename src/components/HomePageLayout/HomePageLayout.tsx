import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import Loader from '@/components/Loader';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const HomeLayout = () => {
  return (
    <div className="home-layout">
      <LanguageSwitcher />
      <div className="f-container">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </div>
  );
};

export default HomeLayout;
