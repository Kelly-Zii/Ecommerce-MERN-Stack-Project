import express from "express";
import axios from "axios";
const router = express.Router();



router.post('/search', async (req, res) => {
  const searchParams = req.body;

  try {
    const response = await axios({
      method: 'GET',
      url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels',
      params: {
        geoId:searchParams.geoId,
        checkIn:searchParams.checkIn,
        checkOut:searchParams.checkOut,
        pageNumber: '1',
        currencyCode: 'USD',
      },
      headers: {
        'X-RapidAPI-Key': '9ef31766e8mshf8bb0780494463cp1fbe3ejsn697f0678b773',
        'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com',
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
