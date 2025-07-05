import { useState } from 'react';

import './index.css';
import Home from './pages/home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
     
        <Route path="/" element={<Home/>} />
  
      </Routes>
    </Router>
  );
}

export default App;
