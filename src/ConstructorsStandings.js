import React, { Component } from "react";
import ReactTable from 'react-table';
import './css/ReactTable.css';

class ConstructorsStandings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      constructors: []
    };
  }

  componentDidMount() {
    fetch('https://api.jolpi.ca/ergast/f1/current/constructorStandings.json')
      .then(response => response.json())
      .then(data => {
        const standings = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        this.setState({ constructors: standings });
      });
  }

  render() {
    const columns = [{
      Header: 'Position',
      accessor: 'position',
      width: 80,
      Cell: props => <span className='bold'>{props.value}</span>
    }, {
      Header: 'Constructor',
      accessor: 'Constructor.name',
      Cell: props => <span className='bold'>{props.value}</span>
    }, {
      Header: 'Nationality',
      accessor: 'Constructor.nationality'
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
        <h2>Constructor Standings</h2>
        <ReactTable
          data={this.state.constructors}
          columns={columns}
          defaultPageSize={10}
          pageSizeOptions={[10]}
          showPagination={false}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default ConstructorsStandings; 