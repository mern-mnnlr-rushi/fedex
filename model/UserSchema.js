import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  productTracking: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tracking' }],
  orderTracking: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tracking' }]

});

//! BUG: Its hashing the password again when populating the user. 
userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

export default User;