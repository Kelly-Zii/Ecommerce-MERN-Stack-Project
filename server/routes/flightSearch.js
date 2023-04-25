import express from "express";
import axios from "axios";
const router = express.Router();



router.post('/search', async (req, res) => {
  const searchParams = req.body;

  try {
    const response = await axios({
      method: 'GET',
      url: 'https://skyscanner44.p.rapidapi.com/search',
      params: {
        origin: searchParams.sourceAirportCode,
        destination: searchParams.destinationAirportCode,
        departureDate: searchParams.date,
        adults: searchParams.numAdults,
        cabinClass: searchParams.classOfService,
        returnDate:searchParams.returndate,
        currency: 'USD',
      },
      headers: {
        'X-RapidAPI-Key': '4ca097a86dmshb10708c5f832eafp15c5fajsnb40f6970a1b7',
        'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com',
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
