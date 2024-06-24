import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GeneralLayout from './components/GeneralLayout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import ProductsPage from './pages/ProductsPage';
import Register from './pages/RegisterPage';
import CreateUserPage from './pages/CreateUserPage';
import UsersPage from './pages/UsersPage';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<GeneralLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/category' element={<CategoriesPage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/craete-user' element={<CreateUserPage />} />
          <Route path='/users' element={<UsersPage />} />
        </Route>
        <Route path='/login'  element={<LoginPage />}/>
        <Route path='register' element={<Register />} />
        <Route path='*'  element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
