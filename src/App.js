import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AdminScreen from './screens/AdminScreen';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="App-header">
          <Link to="/">React Shopping Cart</Link>
          <Link to="/admin">Admin</Link>
        </header>
        <main>
          <Routes>
            <Route path="/admin" element={<AdminScreen />} exact />
            <Route path="/" element={<HomeScreen />} exact />
          </Routes>
        </main>
        <footer>
          All rights reserved.
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
