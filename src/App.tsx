import { useState } from 'react';
import './App.css';
import Forecast from './components/Forecast';
import Search from './components/Search';

function App() {
  const [searchCity, setSearchCity] = useState("");
    return (
        <>
      <Search onSearch={setSearchCity} />
      <Forecast city={searchCity} />
        </>
    );
}

export default App;
