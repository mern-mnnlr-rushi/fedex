import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.mongodburi, {
        
}).then(() => console.log('DB connection successful')).catch(err => {
    console.log(err);
});