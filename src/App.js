import axios from 'axios';
import React from 'react';
import './App.css';

// const apiUrl = process.env.REACT_APP_API_URL;


class App extends React.Component {

  
  // instead of constructor/super
  // assign initial state as class property
  state = {
    q: null,
  };

  handleSearch = async event => {
    // avoid making new GET request
    event.preventDefault();

    let form = event.target;
    let input = form.elements.search;
    let q = input.value;
    console.log(q);

    // assign q in state to be value of q
    this.setState({ q, location: null});

    const url = `https://us1.locationiq.com/v1/search.php?`;
    const response = axios.get(url, {
      params: {
        key: process.env.REACT_APP_LOCATION_KEY,
        q,
        format: 'json'
      }
    });
    console.log('this is the response from  axios',response);
  };









  
  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSearch}>
          <label>
            Search for a location:
            {' '} {/* add a space between */}
            <input type="text" name="search" placeholder="Location" />
          </label>
          <div>
            <button type="submit">Explore</button>
          </div>
        </form>

        {this.state.q &&
          <h2>Search: {this.state.q}</h2>
        }
      </div>
    );
  }
}

export default App;
