// src/App.tsx
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';

import MainLayout from './components/layouts/MainLayout';
import AuthLayout from './components/layouts/AuthLayout';
import AdminLayout from './components/layouts/AdminLayout';

import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import LoginFail from './pages/LoginFail';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
        {/* Main layout - Single page với sections */}
        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
        </Route>
        
        {/* Auth layout routes */}
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<LoginFail />} />
        </Route>

        {/* Admin layout routes */}
        <Route element={<AdminLayout />}>
          <Route path='/admin' element={<AdminDashboard />} />
        </Route>

      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;