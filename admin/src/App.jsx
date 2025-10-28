
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import AddCategoryPage from './pages/Category/AddCategoryPage';
import AddSubCategoryPage from './pages/SubCategory/AddSubCategoryPage';
import AddSubSubCategoryPage from './pages/SubSubCategory/AddSubSubCategoryPage';
import CategoryListPage from './pages/Category/CategoryListPage';
import NotFound from './pages/NotFound';
import LoginPage from './pages/Auth/LoginPage';
import { useAuth } from './context/auth.context';
import UpdateCategoryPage from './pages/Category/UpdateCategoryPage';
import SubCategoryListPage from './pages/SubCategory/SubCategoryListPage';
import UpdateSubCategoryPage from './pages/SubCategory/UpdateSubCategoryPage';
import SubSubCategoryListPage from './pages/SubSubCategory/SubSubCategoryListPage';
import UpdateSubSubCategoryPage from './pages/SubSubCategory/UpdateSubSubCategoryPage';
import AddColorPage from './pages/Color/AddColorPage';
import ColorListPage from './pages/Color/ColorListPage';

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const handleToggleSidebar = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Routes>
      {!isLoggedIn ? (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Layout mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} handleToggleSidebar={handleToggleSidebar} />}>
            <Route index element={<Dashboard />} />
            <Route path="/category/list" element={<CategoryListPage />} />
            <Route path="/category/add" element={<AddCategoryPage />} />
            <Route path="/category/update/:id" element={<UpdateCategoryPage />} />

            <Route path="/sub-category/list" element={<SubCategoryListPage />} />
            <Route path="/sub-category/add" element={<AddSubCategoryPage />} />
            <Route path="/sub-category/update/:id" element={<UpdateSubCategoryPage />} />

            <Route path="/sub-sub-category/list" element={<SubSubCategoryListPage />} />
            <Route path="/sub-sub-category/add" element={<AddSubSubCategoryPage />} />
            <Route path="/sub-sub-category/update/:id" element={<UpdateSubSubCategoryPage />} />

            <Route path="/color/list" element={<ColorListPage />} />
            <Route path="/color/add" element={<AddColorPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </>
      )}
    </Routes>
  );
};

export default App;
