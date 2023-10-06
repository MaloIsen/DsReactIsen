import { useState } from 'react'
import React from "react";
import './App.css'

import sunLogo from './myIcons/soleil.svg'
import rainLogo from './myIcons/pluie.svg'
import cloudLogo from './myIcons/nuage.svg'
import windLogo from './myIcons/vent.svg'
import stormLogo from './myIcons/orage.svg'


let ville ="";
let temperature;
let condition = "";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const refVille = React.useRef();

  function rechercheApi(ville) {
    fetchData(ville);
  }

  const localisation = async () => {
    try {
      const response = await fetch('https://jb03dcnv74.execute-api.eu-west-1.amazonaws.com/Prod/geo?lon=1234.12&lat=221.22');
      const result = await response.json();
      setData(result);
      console.log(result)
      fetchData(result.city)

    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
    finally {
      setLoading(false);
    }
  }

  const fetchData = async (maVille) => {
    try {
      const response = await fetch('https://jb03dcnv74.execute-api.eu-west-1.amazonaws.com/Prod/weather/'+maVille);
      const result = await response.json();
      setData(result);
      console.log(result)
      ville = result.city;
      temperature = result.temperature;
      condition = result.condition;
      console.log(ville);

    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <span>
        <input type="text" placeholder='Saisir une ville' ref={refVille} id='inputVille' />
        <button onClick={() => rechercheApi(refVille.current.value)}>Rechercher</button>
        <button onClick={() => localisation()}>Me localiser</button>
      </span>
      <div>{ville}</div>
      <span>
        <div>
          <div>{temperature}</div>
          <div>{condition}</div>
        </div>
        <div><img src={sunLogo} width="100" height="100"/></div>
      </span>

    </div>
  )
}

export default App