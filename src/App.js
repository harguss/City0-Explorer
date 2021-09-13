import axios from 'axios';
import React from 'react';
import './App.css';
import './index.css';
import Map from './Map.js';
import { Form, Container, Button, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiUrl = process.env.REACT_APP_SERVER_JS;

class App extends React.Component {

state = {
  q:null, 
  location: null,
  weather: null
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
   console.log('response from getweather',response.data);

   this.setState({
      weather: response.data
    })
    console.log('is this showing up',this.state.weather);
}

render() {
  return (
    <Container as="main">
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
            <ul>
                {this.state.weather &&
                    this.state.weather.map(day => (
                        <>
                        <li>Date: {day.date}</li>
                        <li>Description: {day.description}</li>
                        </>
                      ))}
            </ul>
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
