import React, { Component } from "react";
import './App.css';
import f1img from "./f1-image.jpg";

import ReactTable from 'react-table';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      races: [],
      foundFirstFutureRace: false
    };
  }

  componentDidMount() {
    let that = this;

    fetch('https://ergast.com/api/f1/2019.json')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let races = data.MRData.RaceTable.Races;

        races.forEach(race => {
          let raceDate = new Date(race.date + 'T' + race.time);

          race.raceName = race.raceName.replace('Grand Prix', '');
          race.weekday = raceDate.toLocaleDateString('en-US', {
            weekday: "long",
          });
          race.time = raceDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          });
          race.date = raceDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
        });

        that.setState({races: races});
      });
  }

  render() {
      const columns = [{
        Header: 'Grand Prix',
        accessor: 'raceName',
        Cell: props => <span className='bold'>{props.value}</span>
      }, {
        Header: 'Weekday',
        accessor: 'weekday'
      }, {
        Header: 'Time',
        accessor: 'time',
        Cell: props => <span className='bold'>{props.value}</span>
      }, {
        Header: 'Date',
        accessor: 'date',
      }];

      return (
        <div>
          <img className="logo" src={f1img} alt="Logo" />;
          <ReactTable
            data={this.state.races}
            columns={columns}
            defaultPageSize={21}
            pageSizeOptions={[21]}
            getTrProps = {
              (state, rowInfo) => {
                let obj = {};
                if (rowInfo) {
                  let isFutureFight = (new Date()) < (new Date(rowInfo.row.date));
                  obj.className = isFutureFight ? "future" : "past"
                  if (isFutureFight && !this.foundFirstFutureRace) {
                    this.foundFirstFutureRace = true;
                    obj.className += " first-future-race"
                  }
                }
                return obj;
              }
            }
          />
        </div>
      );
  }
}

export default App;
