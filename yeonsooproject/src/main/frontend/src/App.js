import React from 'react';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter} from 'react-router-dom';
import LeftScreen from './LeftScreen';
import RightScreen from './RightScreen';

function App() {     
  return (
    <div id="mainContainer">
      <BrowserRouter>
        <div id="page">
          <LeftScreen/>  
          <RightScreen/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;