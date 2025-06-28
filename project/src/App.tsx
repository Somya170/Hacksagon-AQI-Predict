import React, { useState, useEffect } from 'react';
import InitialForm from './components/InitialForm';
import LoginPage from './components/LoginPage';
import LoadingScreen from './components/LoadingScreen';
import LoadingAnimation from './components/LoadingAnimation';
import Dashboard from './components/Dashboard';
import { User } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'loading' | 'form' | 'login' | 'dashboard'>('loading');
  const [user, setUser] = useState<User & { age?: number }>({ name: 'Guest User', city: 'Delhi' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showInitialLoading, setShowInitialLoading] = useState(true);

  const handleInitialLoadingComplete = () => {
    setShowInitialLoading(false);
    setCurrentView('dashboard');
  };

  const handleFormSubmit = (userData: User) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogin = (userData: { name: string; email: string; age: number }) => {
    setUser({ name: userData.name, city: user?.city || 'Delhi', age: userData.age });
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleShowLogin = () => {
    setCurrentView('login');
  };

  const handleCancelLogin = () => {
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({ name: 'Guest User', city: user?.city || 'Delhi' });
  };

  // Show initial loading animation on first load
  if (showInitialLoading) {
    return <LoadingAnimation onComplete={handleInitialLoadingComplete} />;
  }

  if (currentView === 'form') {
    return <InitialForm onSubmit={handleFormSubmit} />;
  }

  if (currentView === 'login') {
    return <LoginPage onLogin={handleLogin} onCancel={handleCancelLogin} />;
  }

  if (currentView === 'dashboard' && user) {
    return (
      <Dashboard 
        user={user} 
        isLoggedIn={isLoggedIn}
        onLogin={handleShowLogin}
        onLogout={handleLogout}
      />
    );
  }

  return null;
}

export default App;