import express, { application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan"
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/category.js';
import blogRoutes from './routes/blog.js';
import flightSearchRouter from'./routes/flightSearch.js'
import hotelSearchRouter from'./routes/hotelSearch.js'
import hotelLocationSearchRouter from'./routes/hotelLocationSearch.js'
import cors from "cors";
import bodyParser from 'body-parser';


import braintree from 'braintree';
dotenv.config();

const app = express();

// database
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("DB connected"))
    .catch((err)=>console.log("DB ERROR =>", err));

// Braintree configuration
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox, // Use Sandbox for testing, Production for production
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

//router middleware
app.use('/api',authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', blogRoutes);
app.use('/flightSearch',flightSearchRouter)
app.use('/hotelSearch',hotelSearchRouter)
app.use('/hotelLocationSearch',hotelLocationSearchRouter)

// Braintree token endpoint
app.get('/api/braintree/token', async (req, res) => {
  try {
    const response = await gateway.clientToken.generate({});
    res.status(200).send({ clientToken: response.clientToken });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error generating client token' });
  }
});

const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`Node server is running on port ${port}`);
});
