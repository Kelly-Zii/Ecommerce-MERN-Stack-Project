import React, { useState,useEffect } from 'react';


export default function HotelSearch () {
  const [searchParams, setSearchParams] = useState({
    geoId: '',
    checkIn: '',
    checkOut: '',
  });
  //const {hotelResults, setHotelResults} = useState([]);
  const [hotelResults, setHotelResults]=useState([]);
  const [locationParams,setLocationParams]=useState({
    query:'',
  });
  const [hotelDetail, setHotelDetail]=useState([]);
  const newdata = [...hotelResults];
  const newdata1 = [...hotelDetail];
  const [selectedHotelGeoId, setSelectedHotelGeoId] = useState(null);
  const [loading,setLoading]=useState(false);
  const handleHotelClick = (geoId) => {
    setSelectedHotelGeoId(geoId);
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      geoId: geoId,
    }));
  };
  
  useEffect(() => {
    if(hotelResults){
    console.log('UseEffect Hotel results set:', hotelResults);
    }
    if(hotelDetail){
      console.log(hotelDetail);
    }
  }, [hotelResults,hotelDetail]);

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };
  const handleChange1 = (e) => {
    setLocationParams({ ...locationParams, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
    //  const response = await fetch('http://localhost:8000/hotelSearch/search', {
      const response = await fetch('http://localhost:8000/hotelLocationSearch/search', {
        method: 'POST',        
    //    body: JSON.stringify(searchParams),
        body: JSON.stringify(locationParams),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching hotel data');
      }
      const respdata = await response.json();
      

      respdata.data.map((hotel, index) => (newdata.push(hotel)));
      console.log(newdata, typeof(newdata));
      //const newdata = respdata.data[0];
      //console.log(respdata.data[0], typeof(newdata));
      //console.log(newdata);
      setHotelResults(newdata||[]);
      //setHotelResults(respdata.data || []);
      console.log(hotelResults);
     
     // console.log('Hotel results set:', hotelResults);

    } catch (error) {
      console.error('Error fetching hotel data:', error);
    }finally{
      setLoading(false);
    }
  };
  const handleSubmit1 = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/hotelSearch/search', {
    //  const response = await fetch('http://localhost:8000/hotelLocationSearch/search', {
        method: 'POST',        
        body: JSON.stringify(searchParams),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching hotel data');
      }
      const respdata = await response.json();
      console.log(respdata.data.data);
      respdata.data.data.map((hotel, index) => (newdata1.push(hotel)));
      console.log(newdata1, typeof(newdata1));

      setHotelDetail(newdata1);
      console.log(hotelDetail);
     
     // console.log('Hotel results set:', hotelResults);

    } catch (error) {
      console.error('Error fetching hotel data:', error);
    }
  };

  const renderHotelResults = () => {
    return (

      hotelResults && (
        <div className="hotel-results-row">
          {hotelResults.map((hotel, index) => {
            const hotelClass = hotel.geoId === selectedHotelGeoId ? "marked" : "blur";
            return (
              <div
                key={index}
                onClick={() => handleHotelClick(hotel.geoId)}
                className={`hotel-cell ${hotelClass}`}
                style={{ cursor: 'pointer' }} // Change the cursor to a pointer when hovering
              >
                <div className="no">{index}</div>
                <div className="title" dangerouslySetInnerHTML={{ __html: hotel.title }}></div>
                <div className="secondary-text">{hotel.secondaryText}</div>
                <div className="geois">{hotel.geoId}</div>
              </div>
            );
          })}
        </div>
      )

    );
  };
  
  const renderHotelDetails = () => {
    return (
    <div className="hotel-result-container">
    {hotelDetail.map((hotel, index) => (
      <div key={index} className="hotel-result">
        <div className="hotel-header">
          <div className="hotel-name">{hotel.title}</div>
          {hotel.bubbleRating && (
            <div className="hotel-rating">
              {hotel.bubbleRating.rating} ({hotel.bubbleRating.count})
            </div>
          )}
        </div>
        <div className="hotel-info">{hotel.primaryInfo}</div>
        <div className="hotel-secondary-info">{hotel.secondaryInfo}</div>
        <div className="hotel-pricing">
          {hotel.priceForDisplay && <div className="hotel-price">{hotel.priceForDisplay}</div>}
          {hotel.strikethroughPrice && (
            <div className="hotel-strikethrough-price">{hotel.strikethroughPrice}</div>
          )}
          {hotel.priceDetails && <div className="hotel-price-details">{hotel.priceDetails}</div>}
          {hotel.priceSummary && <div className="hotel-price-summary">{hotel.priceSummary}</div>}
        </div>
        {hotel.provider && <div className="hotel-provider">{hotel.provider}</div>}
      </div>
    ))}
    </div>
    );
  };
  
  
  

  return (
    <div>

<form onSubmit={handleSubmit} className="location-form">
  <input
    type="text"
    name="query"
    value={locationParams.query}
    onChange={handleChange1}
    placeholder="Hotel Location Address"
    required
    className="input-field"
  />
  <button type="submit" className="submit-button">Search Hotels</button>
</form>
<form onSubmit={handleSubmit1} className="dates-form">
  <input
    type="date"
    name="checkIn"
    value={searchParams.checkIn}
    onChange={handleChange}
    placeholder="Check-in Date"
    required
    className="input-field"
  />
  <input
    type="date"
    name="checkOut"
    value={searchParams.checkOut}
    onChange={handleChange}
    placeholder="Check-out Date"
    required
    className="input-field"
  />
  <button type="submit" className="submit-button">Search Selected Hotel</button>
</form>

      <div>{renderHotelResults()}</div> 
      <div>{renderHotelDetails()}</div> 
    </div>
  );
};


