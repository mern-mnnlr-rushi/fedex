import mongoose from 'mongoose';

const trackingSchema = mongoose.Schema({

    trackingNumber : {
        type : String,
        required : true,
        unique : true
    },
    status : {
        type : String,
        required : true,
        enum: ['Delivered', 'In Transit', 'Out for Delivery']
    }
})
const Tracking = mongoose.model('tracking', trackingSchema);
export default Tracking;