import axios from 'axios';
import React from 'react';
import './App.css';
import Map from './Map.js';
import { Form, Container, Button } from 'react-bootstrap';


const apiUrl = process.env.REACT_APP_SERVER_JS;

class App extends React.Component {

state = {
  q:null, 
  location: null,
};

handleLocationSearch = async (event) => {
  event.preventDefault();
  let form = event.target;
  // console.log('form event target', form);
  let input = form.elements.search;
  //  console.log('input from form elements',form.elements.search);
  let q = input.value;
    // console.log('this is the q from the input.value',q);
    this.setState({ q, location: null });
    const url = `https://us1.locationiq.com/v1/search.php`;
    const response = await axios.get(url, {
      params: {
        key: process.env.REACT_APP_LOCATION_KEY,
        q,
        format: 'json',
      }
    });
    // console.log('this is the response in the locationIQ',response);
    const location = response.data[0];
    // console.log('this is the location object?', location);
    this.setState({ location });
    //call that fun fun function with location 
    this.getWeatherData(location);
  };

  //new fun fun function
  getWeatherData = async (location) => {
    const response = await axios.get(`${apiUrl}/weatherData`, {
     params: {
       lat: location.lat,
       lon: location.lon,
     },
   });
   console.log('response from getweather',response);

   this.setState({
      weather: response.data
    })
    console.log('is this showing up',this.state.weatherData);
}

render() {
  return (
    <Container asw="main">
      <div className="App">
      <Form onSubmit={this.handleLocationSearch}>
        <Form.Label id="formLabel" column="sm" lg={2}>
            Search for a location:
            {' '}
          <Form.Control type="text" name="search" placeholder="Location" /> 
        </Form.Label>
        <div>
            <Button id="success"type="submit">Explore!</Button>  
        </div>
        </Form>
        <div>
            {this.state.weatherData &&
              <ul>
                <li>
                {this.state.weatherData.map(day => (
                    <>
                    <p>Date: {day.date}</p>
                    <p>Description: {day.description}</p>
                    </>
  ))}
                </li>
              </ul>
            }
          </div>

        {this.state.q &&
         <>
          <h2>Search: {this.state.q}</h2>
           {this.state.location?
             <>
               <p>{this.state.location.display_name}</p>
               <p>Latitude: {this.state.location.lat}</p>
               <p>Longitude: {this.state.location.lon}</p>
               <Map location={this.state.location} />
             </>
             : <p>Loading...</p>}
         </>
        }
     </div>
    </Container>
    );
  }
}

  


export default App;
