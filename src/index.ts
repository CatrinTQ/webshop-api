import 'dotenv/config'
import express from 'express';
import cors from 'cors'
import { connectToDatabase } from './config/db';

const app = express();

// Middleware
app.use(express.json()); // This specific middleware parses JSON string to Javascript Object
app.use(cors());        // This makes the Express server except request from other domains


// Routes
import productRouter from './routes/products'
import categoryRouter from './routes/categories'
app.use('/products', productRouter)
app.use('/categories', categoryRouter)


// Connect To DB
connectToDatabase();
// Start the express server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
