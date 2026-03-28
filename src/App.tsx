import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePageLayout from '@/components/HomePageLayout';
import ErrorBoundary from '@/components/ErrorBoundary';
import Loader from '@/components/Loader';

// Pages
const HomePage = lazy(() => import('@/pages/HomePage'));
const ConstructorPage = lazy(() => import('@/pages/ConstructorPage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const MyRecipesPage = lazy(() => import('@/pages/MyRecipesPage'));
const RecipeDetailPage = lazy(() => import('@/pages/RecipeDetailPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const ProfileEditPage = lazy(() => import('@/pages/ProfileEditPage'));
const DemoPage = lazy(() => import('@/pages/DemoPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const App = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePageLayout />}>
            <Route index element={<HomePage />} />
            <Route path="constructor" element={<ConstructorPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="my-recipes" element={<MyRecipesPage />} />
            <Route path="recipe/:id" element={<RecipeDetailPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="profile/edit" element={<ProfileEditPage />} />
          </Route>

          <Route path="/demo" element={<DemoPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
