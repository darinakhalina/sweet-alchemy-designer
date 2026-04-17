import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import Loader from '@/components/Loader';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import AuthStatus from '@/components/AuthStatus';
import AuthModalProvider from '@/components/AuthModal';

const HomeLayout = () => {
  return (
    <AuthModalProvider>
      <div className="home-layout">
        <div className="home-layout__toolbar">
          <AuthStatus />
          <LanguageSwitcher />
        </div>
        <div className="f-container">
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </div>
    </AuthModalProvider>
  );
};

export default HomeLayout;
