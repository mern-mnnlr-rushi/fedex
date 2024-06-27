import express from 'express';
import authRoutes from './routes/auth.js';
import cors from 'cors'
import './connect/db.js';
import isAuthenticated from './middleware/isAuthenticated.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.put('/user', isAuthenticated, (req, res) => {
  res.json({userId : req.user, message : "User can acces protected rout"});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
