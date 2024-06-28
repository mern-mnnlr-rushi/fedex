import mongoose from 'mongoose';

const trackingSchema = mongoose.Schema({
    trackingNumber : {
        type : String,
        required : true,
        unique : true
    },
    status : {
        type : String,
        required : true
    }
})
const Tracking = mongoose.model('tracking', trackingSchema);
export default Tracking;