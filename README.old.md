# City-Explorer
Lab06
const response = await axios.get(url, {
    // query string parameters
    params: {
      key: 'pk.b0c94cc105f7339c2ac333ba21e4333b',
      // get key from environment variables
      key: process.env.REACT_APP_LOCATION_KEY,
      q, // variable already has correct name
      format: 'json',
    }
  });
  console.log(response);
  const location = response.data[0];
  this.setState({ location });
  };
