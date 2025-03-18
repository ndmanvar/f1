import React, { Component } from "react";
import ReactTable from 'react-table';
import './css/ReactTable.css';

class DriversStandings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drivers: []
    };
  }

  componentDidMount() {
    fetch('https://api.jolpi.ca/ergast/f1/current/driverStandings.json')
      .then(response => response.json())
      .then(data => {
        const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        this.setState({ drivers: standings });
      });
  }

  render() {
    const columns = [{
      Header: 'Position',
      accessor: 'position',
      width: 80,
      Cell: props => <span className='bold'>{props.value}</span>
    }, {
      Header: 'Driver',
      accessor: d => `${d.Driver.givenName} ${d.Driver.familyName}`,
      id: 'fullName',
      Cell: props => <span className='bold'>{props.value}</span>
    }, {
      Header: 'Nationality',
      accessor: 'Driver.nationality'
    }, {
      Header: 'Constructor',
      accessor: 'Constructors[0].name'
    }, {
      Header: 'Points',
      accessor: 'points',
      width: 80,
      Cell: props => <span className='bold'>{props.value}</span>
    }, {
      Header: 'Wins',
      accessor: 'wins',
      width: 80
    }];

    return (
      <div className="standings-table">
        <h2>Driver Standings</h2>
        <ReactTable
          data={this.state.drivers}
          columns={columns}
          defaultPageSize={20}
          pageSizeOptions={[20]}
          showPagination={false}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default DriversStandings; 