import React, { useState, useEffect } from 'react';

function DataFetcher(props) {
  const [locationData, setLocationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/');
        const data = await response.json();
        props.setImage(data)
        const extractedLocationData = data.map(item => ({
          location_name: item.location_name,
          // location_name: item.location.country,
          latitude: item.latitude,
          longitude: item.longitude,
          image_url: item.image_url
        }));
        setLocationData(extractedLocationData);

        console.log(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
    <h2>Location Data</h2>
    {/* Render location data here */}
    {locationData.map((location, index) => (
      <div key={index}>
        <p>Name: {location.location_name}</p>
        <p>City: {location.location_name}</p>
        <p>Country: {location.location_name}</p>
        <p>Latitude: {location.latitude}</p>
        <p>Longitude: {location.longitude}</p>
        <img src={location.image_url} alt={location.location_name}/>
        <hr />
      </div>
    ))}
  </div>
);
}

export default DataFetcher;


