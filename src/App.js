import React from 'react';
import { BrowserRouter as Router, Route, Routes ,Navigate } from 'react-router-dom';
import Login from './screens/LoginScreen';
import Signup from './screens/SignupScreen';
import SearchScreen from './screens/SearchScreen';
import ListingScreen from './screens/ListingScreen'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/loginscreen" element={<Login />} />
          <Route path="/searchScreen" element={<SearchScreen />} />
          <Route path="/ListingScreen" element={<ListingScreen />} />

          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;