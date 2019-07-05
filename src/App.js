import React, { Component } from "react";
import './App.css';

import ReactTable from 'react-table';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      races: []
    };
  }

  componentDidMount() {
    let that = this;

    fetch('http://ergast.com/api/f1/2019.json')
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
          debugger;
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
        Cell: props => <span className={(new Date()) > (new Date(props.value)) ? "past" : "future"}>{props.value}</span>
      }];

      return (
        <div>
          <img className="logo" src='https://i1.wp.com/gas2.org/wp-content/uploads/2017/12/new-logo.jpg?w=400&ssl=1' />;
          <ReactTable
            data={this.state.races}
            columns={columns}
            defaultPageSize={21}
            pageSizeOptions={[21]}
          />
        </div>
      );
  }
}

export default App;
