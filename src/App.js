import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GeneralLayout from './components/GeneralLayout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import ProductsPage from './pages/ProductsPage';
import Register from './pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<GeneralLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/category' element={<CategoriesPage />} />
          <Route path='/products' element={<ProductsPage />} />
        </Route>
        <Route path='/login'  element={<LoginPage />}/>
        <Route path='register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
