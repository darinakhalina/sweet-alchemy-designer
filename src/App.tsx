import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePageLayout from '@/components/HomePageLayout';
import ErrorBoundary from '@/components/ErrorBoundary';
import PrivateRoute from '@/components/PrivateRoute';
import Loader from '@/components/Loader';
import { ROUTES } from '@/constants/routes';

// Pages
const HomePage = lazy(() => import('@/pages/HomePage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
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
          <Route path={ROUTES.HOME} element={<HomePageLayout />}>
            <Route index element={<HomePage />} />

            <Route element={<PrivateRoute />}>
              <Route path={ROUTES.CONSTRUCTOR} element={<ConstructorPage />} />
              <Route path={ROUTES.SEARCH} element={<SearchPage />} />
              <Route path={ROUTES.MY_RECIPES} element={<MyRecipesPage />} />
              <Route path={ROUTES.RECIPE_DETAIL} element={<RecipeDetailPage />} />
              <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
              <Route path={ROUTES.PROFILE_EDIT} element={<ProfileEditPage />} />
            </Route>
          </Route>

          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.DEMO} element={<DemoPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
