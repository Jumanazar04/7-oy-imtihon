import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import GeneralLayout from './components/GeneralLayout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<GeneralLayout />}>
          <Route index element={<HomePage />} />
          
        </Route>
        <Route path='/login'  element={<LoginPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
