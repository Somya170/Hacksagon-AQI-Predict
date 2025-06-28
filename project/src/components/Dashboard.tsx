import React, { useState, useEffect } from 'react';
import { User, AQIData } from '../types';
import Sidebar from './Sidebar';
import CityDropdown from './CityDropdown';
import AQIDetails from './AQIDetails';
import EnhancedForecastGraph from './EnhancedForecastGraph';
import AIPredictor from './AIPredictor';
import AboutPage from './AboutPage';
import WeatherDashboard from './WeatherDashboard';
import Analytics from './Analytics';
import LeafletMap from './LeafletMap';
import AQICalculator from './AQICalculator';
import LoadingScreen from './LoadingScreen';
import Chatbot from './Chatbot';
import { getAQIData, topCities } from '../data/mockData';
import { Search, User as UserIcon, Wind, Zap, Sparkles, LogIn, LogOut, Menu, X } from 'lucide-react';

interface DashboardProps {
  user: User & { age?: number };
  isLoggedIn?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, isLoggedIn = false, onLogin, onLogout }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedCity, setSelectedCity] = useState(user.city);
  const [aqiData, setAqiData] = useState<AQIData>(getAQIData(user.city));
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [targetView, setTargetView] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setAqiData(getAQIData(city));
    setSearchQuery('');
    setShowSearchResults(false);
    setIsMobileMenuOpen(false);
  };

  const handleViewChange = async (view: string) => {
    // If trying to access AI Health Assistant without login, redirect to login
    if (view === 'ai-predictor' && !isLoggedIn && onLogin) {
      onLogin();
      return;
    }

    // No loading screen for About, Calculator, and Weather
    if (view === 'about' || view === 'calculator' || view === 'weather') {
      setActiveView(view);
      setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (view !== activeView) {
      setTargetView(view);
      setIsLoading(true);
      setIsMobileMenuOpen(false);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLoadingComplete = () => {
    setActiveView(targetView);
    setIsLoading(false);
  };

  const filteredCities = topCities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAQIColorDot = (aqi: number) => {
    if (aqi <= 50) return 'bg-green-500';
    if (aqi <= 100) return 'bg-yellow-500';
    if (aqi <= 150) return 'bg-orange-500';
    if (aqi <= 200) return 'bg-red-500';
    return 'bg-purple-500';
  };

  // Show loading screen when switching views (except About, Calculator, and Weather)
  if (isLoading) {
    return <LoadingScreen user={user} targetView={targetView} onComplete={handleLoadingComplete} />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'ai-predictor':
        if (!isLoggedIn) {
          return (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LogIn className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Login Required</h3>
                <p className="text-gray-600 mb-4">Please login to access AI Health Assistant</p>
                <button
                  onClick={onLogin}
                  className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-700 transition-all duration-200"
                >
                  Login Now
                </button>
              </div>
            </div>
          );
        }
        return <AIPredictor data={aqiData} user={user} />;
      case 'analytics':
        return <Analytics data={aqiData} />;
      case 'weather':
        return <WeatherDashboard city={selectedCity} />;
      case 'calculator':
        return <AQICalculator />;
      case 'about':
        return <AboutPage />;
      default:
        return (
          <div className="space-y-6">
            {/* Leaflet Map */}
            <LeafletMap selectedCity={selectedCity} onCitySelect={handleCityChange} />
            
            {/* AQI Details - Remove Temperature and Humidity */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 overflow-hidden relative">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-full translate-y-12 -translate-x-12 opacity-30"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Wind className="w-6 h-6 text-purple-600" />
                      <h2 className="text-3xl font-bold text-gray-800">{aqiData.city}</h2>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="text-sm">Last updated: {aqiData.lastUpdated}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${
                      aqiData.aqi <= 50 ? 'from-green-400 to-green-600' :
                      aqiData.aqi <= 100 ? 'from-yellow-400 to-yellow-600' :
                      aqiData.aqi <= 150 ? 'from-orange-400 to-orange-600' :
                      aqiData.aqi <= 200 ? 'from-red-400 to-red-600' :
                      'from-purple-400 to-purple-600'
                    } text-white shadow-lg`}>
                      <span className="font-semibold text-lg">{aqiData.quality}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-r ${
                      aqiData.aqi <= 50 ? 'from-green-400 to-green-600' :
                      aqiData.aqi <= 100 ? 'from-yellow-400 to-yellow-600' :
                      aqiData.aqi <= 150 ? 'from-orange-400 to-orange-600' :
                      aqiData.aqi <= 200 ? 'from-red-400 to-red-600' :
                      'from-purple-400 to-purple-600'
                    } mb-6 shadow-xl relative`}>
                      <span className="text-5xl font-bold text-white">{aqiData.aqi}</span>
                    </div>
                    <p className="text-xl font-semibold text-gray-700 mb-2">Air Quality Index</p>
                    <p className="text-sm text-gray-500 mb-4">Current AQI Level</p>
                    
                    {/* Analysis Button */}
                    <button
                      onClick={() => handleViewChange('analytics')}
                      className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 mx-auto shadow-lg"
                    >
                      <Sparkles className="w-5 h-5" />
                      View Analysis
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Wind className="w-5 h-5 text-blue-600" />
                        Health Recommendation
                      </h4>
                      <p className="text-gray-700 leading-relaxed">{aqiData.recommendation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Forecast Graph */}
            <EnhancedForecastGraph city={selectedCity} />
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar activeView={activeView} onViewChange={handleViewChange} isLoggedIn={isLoggedIn} />
      </div>
      
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-200 px-4 lg:px-8 py-4 relative z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {activeView === 'dashboard' && 'Dashboard'}
                {activeView === 'ai-predictor' && 'AI Health Assistant'}
                {activeView === 'analytics' && 'Analytics & Trends'}
                {activeView === 'weather' && 'Weather Dashboard'}
                {activeView === 'calculator' && 'AQI Calculator'}
                {activeView === 'about' && 'About Our Team'}
              </h1>
              {activeView !== 'about' && activeView !== 'calculator' && activeView !== 'weather' && (
                <div className="hidden sm:block">
                  <CityDropdown selectedCity={selectedCity} onCityChange={handleCityChange} />
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 lg:gap-4">
              {activeView !== 'about' && activeView !== 'calculator' && activeView !== 'weather' && (
                <div className="relative hidden md:block">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search cities..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSearchResults(e.target.value.length > 0);
                    }}
                    onFocus={() => setShowSearchResults(searchQuery.length > 0)}
                    className="pl-10 pr-4 py-2 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm w-48 lg:w-64"
                  />
                  
                  {/* Search Results Dropdown */}
                  {showSearchResults && filteredCities.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50 max-h-80 overflow-y-auto">
                      {filteredCities.map((city) => (
                        <button
                          key={city.name}
                          onClick={() => handleCityChange(city.name)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-150 text-left"
                        >
                          <div className={`w-3 h-3 rounded-full ${getAQIColorDot(city.aqi)}`}></div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{city.name}</p>
                            <p className="text-sm text-gray-500">AQI: {city.aqi} - {city.quality}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* User Profile / Login Button */}
              <div className="flex items-center gap-3">
                {isLoggedIn ? (
                  <div className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 bg-white/70 rounded-xl border border-gray-200 backdrop-blur-sm">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                      <UserIcon className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-700 text-sm lg:text-base hidden sm:block">{user.name}</span>
                    <button
                      onClick={onLogout}
                      className="ml-1 lg:ml-2 p-1 text-gray-500 hover:text-red-600 transition-colors"
                      title="Logout"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={onLogin}
                    className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-700 transition-all duration-200 shadow-lg text-sm lg:text-base"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="hidden sm:inline">Login</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile City Dropdown */}
          {activeView !== 'about' && activeView !== 'calculator' && activeView !== 'weather' && (
            <div className="mt-4 sm:hidden">
              <CityDropdown selectedCity={selectedCity} onCityChange={handleCityChange} />
            </div>
          )}
        </header>

        {/* Content */}
        <main className="p-4 lg:p-8 overflow-y-auto h-[calc(100vh-80px)] lg:h-[calc(100vh-96px)] bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30">
          {renderContent()}
        </main>
      </div>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Dashboard;