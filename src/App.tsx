import { useState } from 'react';
import './App.css';
import Forecast from './components/Forecast';
import Search from './components/Search';

function App() {
  const [searchCity, setSearchCity] = useState("London");
    return (
        <>
      <Search onSearch={setSearchCity} />
      <Forecast city={searchCity} />
      <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-8">
        <aside>
          <p>Weather data provided by <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="link link-hover">Open-Meteo API</a></p>
        </aside>
      </footer>
        </>
    );
}

export default App;
