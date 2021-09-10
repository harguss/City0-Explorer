import axios from 'axios';
import React from 'react';
import './App.css';

// const apiUrl = process.env.REACT_APP_API_URL;
// const response = axios.get(url);


class App extends React.Component {

state = {
  q:null, 
  location: null,
};

handleLocationSearch = async event => {
  event.preventDefault();
   

  let form = Event.target;
  let input = form.elements.search;
  let q = input.value;
    console.log(q);

    
    this.setState({ q, location:null });



    const url = `https://us1.locationiq.com/v1/search.php`;
    const response = await axios.get(url, {
      params: {
        key: process.env.REACT_APP_LOCATION_KEY,
        q,
        format: 'json',
      }
    });
    console.log(response);
  
    const location = response.data[0];
    this.setState({ location });
  };


render() {
    return (
      <div className="App">
        <form onSubmit={this.handleLocationSearch}>
          <label>
            Search for a location:
            {' '} 
            <input type="text" name="search" placeholder="Location" />
          </label>
          <div>
            <button type="submit">Explore</button>
          </div>
        </form>

         {this.state.q &&
         <>
          <h2>Search: {this.state.q}</h2>
          {this.state.location?
          <p>display Name: {this.state.location.display_name}</p>
          : <p>Loading...</p>
        }
        </>
       } 
      </div>
    );
  }
}

export default App;
