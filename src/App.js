import axios from 'axios';
import React from 'react';
import './App.css';

const apiUrl = process.env.REACT_APP_SERVER_JS;
// const response = axios.get(url);


class App extends React.Component {

state = {
  q:null, 
  location: null,
};

handleLocationSearch = async (event) => {
  event.preventDefault();
   

  let form = event.target;
  console.log('form event target', form);
  let input = form.elements.search;
   console.log('input from form elements',form.elements.search);
  let q = input.value;
    console.log('this is the q from the input.value',q);

    
    this.setState({ q, location:null });



    const url = `https://us1.locationiq.com/v1/search.php`;
    const response = await axios.get(url, {
      params: {
        key: process.env.REACT_APP_LOCATION_KEY,
        q,
        format: 'json',
      }
    });
    console.log('this is the response in the locationIQ',response);
  
    const location = response.data[0];
    console.log('this is the location object?', location);

    this.setState({ location });
    
    //call that fun fun function with location 
    // this.whatEverWeatherFunctionCalled(location)''
  };

  //new fun fun function
  getWeatherdata = async (location)=> {
    const response = await axios.get('${apiUrl}/shoppingList', {
    params: {
      lat: location.lat,
      lon: location. lon,
    },
    });
    console.log(response);

    this.setState({
      weather: response.data
    })
  }











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
          <>
          <p>Display Name: {this.state.location.display_name}</p>
          <p>Latitude: {this.state.location.lat}</p>
          <p>Longitude: {this.state.location.lon}</p>
          </>
          : <p>Loading...</p>
        }
        </>
       } 
      </div>
    );
  }
}

export default App;
