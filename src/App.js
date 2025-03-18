import React, { Component } from "react";
import './css/App.css';
import './css/ReactTable.css';
import f1img from "./img/f1-image.jpg";
import DriversStandings from './DriversStandings';
import ConstructorsStandings from './ConstructorsStandings';
import RaceCalendar from './RaceCalendar';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <img className="logo" src={f1img} alt="Logo" />
        <RaceCalendar />
        <div className="standings-container">
          <DriversStandings />
          <ConstructorsStandings />
        </div>
      </div>
    );
  }
}

export default App;
