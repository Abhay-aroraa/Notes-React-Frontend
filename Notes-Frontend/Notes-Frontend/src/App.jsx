import { useState } from 'react';
import './index.css';
import Home from './pages/home';
import Archieve from './pages/archieve';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Trash from './pages/trash';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      {/* Place Toaster here */}
      <Toaster position="bottom-left" reverseOrder={false} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/archieve" element={<Archieve />} />
      </Routes>
    </Router>
  );
}

export default App;
