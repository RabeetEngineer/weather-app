import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  const api_key = "7ee565136d49b93a2def96656f3c04e4";

  return (
    <>
      <Routes>
        {/* Pass the api_key prop to the Home component */}
        <Route path='/' element={<Home api_key={api_key} />} />
      </Routes>
    </>
  );
}

export default App;
