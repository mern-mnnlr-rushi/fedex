import express from 'express';
import authRoutes from './routes/auth.js';
import cors from 'cors'
import connectDB from './connect/db.js';
import isAuthenticated from './middleware/isAuthenticated.js';
import tracking from './routes/trackingRout.js'
import UserSpecific from './routes/userSpecificRoute.js'
const app = express();
const port = 3000;
connectDB();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // Allow credentials
}));
app.use(express.json());


app.use('/api', authRoutes);
app.use('/api', tracking);
app.use('/api/v1', UserSpecific);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.put('/user', isAuthenticated, (req, res) => {
  res.json({ userId: req.user, message: "User can acces protected rout" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
