import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://yashmaurya2109:6QXah16D98N0k8Kh@cluster0.9lkwzhh.mongodb.net/FedEx', {
 
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
