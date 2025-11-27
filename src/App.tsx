import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import ProductForm from './pages/ProductForm';
import AuthGuard from './auth/AuthGuard';
import ProductEditForm from './pages/ProductEditForm';
import CategoryForm from './pages/CategoryForm';
import BulkProductTest from './pages/BulkProductTest';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route element={<AuthGuard />}>
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/edit/:id" element={<ProductEditForm />} />
          <Route path="/categories/new" element={<CategoryForm />} />
          <Route path="/products/bulk-test" element={<BulkProductTest />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
