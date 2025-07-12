import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

// Page Components
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import ThankYouPage from './pages/ThankYouPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
