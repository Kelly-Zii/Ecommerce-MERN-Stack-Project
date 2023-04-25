import React, { useState,useEffect } from 'react';


export default function FlightSearch() {
  const [searchParams, setSearchParams] = useState({
    numAdults: '1',
    numSeniors: '0',
    returndate:'2023-05-01',
  });
  const [flightResults, setFlightResults] = useState([]);
  const newdata = [...flightResults];
  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if(flightResults){
    console.log('UseEffect Hotel results set:', flightResults);
    }
  }, [flightResults]);
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/flightSearch/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams),
      });
      if(!response.ok)
      {
        throw new Error('Error fetching flight data');
      }
      const respdata = await response.json();
      console.log(respdata);
      respdata.itineraries.buckets.map((hotel, index) => (newdata.push(hotel)));
      console.log(newdata, typeof(newdata));
      setFlightResults(newdata || []);
      console.log(flightResults);
    } catch (error) {
      console.error('Error fetching flight data:', error);
    }
  };
  const renderFlightResults = () => {
    return flightResults.map((bucket, index) => (
      <div key={index} className="bucket">
        <h3 className="bucket-name">{bucket.name}</h3>
        {bucket.items.map((item, itemIndex) => (
          <div key={itemIndex} className="item">
            <div className="price">{item.price.formatted}</div>
            {item.legs.map((leg, legIndex) => (
              <div key={legIndex} className="leg">
                <div className="origin-destination">
                  <div className="origin">{leg.origin.name}</div>
                  <div className="arrow">→</div>
                  <div className="destination">{leg.destination.name}</div>
                </div>
                <div className="times">
                  <div className="departure">{leg.departure}</div>
                  <div className="arrival">{leg.arrival}</div>
                </div>
                <div className="duration">{leg.durationInMinutes} minutes</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    ));
  };
  
  
  

  return (
    <div>
     <form onSubmit={handleSubmit} className="flight-search-form">
  <div className="form-group">
    <label htmlFor="sourceAirportCode">Source Airport Code:</label>
    <input type="text" name="sourceAirportCode" id="sourceAirportCode" onChange={handleChange} required />
  </div>
  <div className="form-group">
    <label htmlFor="destinationAirportCode">Destination Airport Code:</label>
    <input type="text" name="destinationAirportCode" id="destinationAirportCode" onChange={handleChange} required />
  </div>
  <div className="form-group">
    <label htmlFor="date">Date:</label>
    <input type="date" name="date" id="date" onChange={handleChange} required />
  </div>
  <div className="form-group">
    <label htmlFor="itineraryType">Itinerary Type:</label>
    <select name="itineraryType" id="itineraryType" onChange={handleChange} required>
      <option value="">Select an itinerary type</option>
      <option value="ONE_WAY">One-way</option>
      <option value="ROUND_TRIP">Round-trip</option>
    </select>
  </div>
  <div className="form-group">
    <label htmlFor="sortOrder">Sort Order:</label>
    <select name="sortOrder" id="sortOrder" onChange={handleChange} required>
      <option value="">Select a sort order</option>
      <option value="best">Auto Best</option>
      <option value="price">Price</option>
      <option value="duration">Duration</option>
      <option value="take_off_time">Earliest Departure</option>
      <option value="landing_time">Earliest Arrival</option>
      <option value="return_take_off_time">Earliest Return Departure</option>
      <option value="return_landing_time">Latest Return Arrival</option>
    </select>
  </div>
  <div className="form-group">
    <label htmlFor="classOfService">Class of Service:</label>
    <select name="classOfService" id="classOfService" onChange={handleChange} required>
      <option value="">Select a class of service</option>
      <option value="economy">Economy</option>
      <option value="premium_economy">Premium Economy</option>
      <option value="business">Business</option>
      <option value="first">First Class</option>
    </select>
  </div>
  <button type="submit" className="search-button">Search</button>
</form>

      <div>{flightResults.data}</div>
      <div>{renderFlightResults()}</div>
    </div>
  );
}


