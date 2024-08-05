import User from "../model/UserSchema.js"
import Tracking from "../model/TrackingSchema.js";
const getTrackingById = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {      
        const user = await User.findById(id).populate("orderTracking").populate('productTracking');;
             
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }   
  
        res.status(200).json({
            message: "success",
            user: user,            
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const createTracking = async (req, res) => {
    const { sellerId, trackingNumber, status, customerId } = req.body;

    try {
      
        const newTracking = await Tracking.create({ trackingNumber, status });

      
        const customer = await User.findById(customerId);
        const seller = await User.findById(sellerId);

        if (!customer || !seller) {
            return res.status(404).json({ message: 'Customer or Seller not found' });
        }

       
        customer.productTracking.push(newTracking._id);
        await customer.save();

       
        seller.orderTracking.push(newTracking._id);
        await seller.save();

        
        res.status(201).json(newTracking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString(); 
  }
const sellerDeliver = async(req,res) =>{
    const {sellerId , trackingId} = req.body;
    try {
        const otp = generateOTP();
        const seller = await User.findById(sellerId);
        const tracking = await Tracking.findById(trackingId);
        if (!seller || !tracking) {
            return res.status(404).json({ message: 'Seller or Tracking not found' });
        
        }
        tracking.otp = otp;
        await tracking.save();
      

        res.status(201).json(tracking);
    }catch(err){
        res.status(500).json({ message: err.message });
    
    }
}

const buyerDeliver = async(req,res) =>{
    const {buyerId , trackingId} = req.params;
    console.log(buyerId , trackingId);
    try {
        const buyer = await User.findById(buyerId);
       const tracking = await Tracking.findById(trackingId);
        if (!buyer || !tracking) {
            return res.status(404).json({ message: 'Buyer or Tracking not found' });

        
        }
       if(tracking.otp){
        res.status(201).json(tracking);
       }
else{
    res.status(404).json({ message: 'OTP not generated' });
}
    }catch(err){

    }
}

const ifOtp = async (req, res) => {
    const { buyerId, trackingId, otp } = req.body;

    try {
        const buyer = await User.findById(buyerId);
        if (!buyer) {
            return res.status(404).json({ message: 'Buyer not found' });
        }

        let exist = false;
        for (let i = 0; i < buyer.productTracking.length; i++) {
            if (buyer.productTracking[i] == trackingId) {
                exist = true;
                break;
            }
        }

        if (exist) {
            const tracking = await Tracking.findById(trackingId);
            if (!tracking) {
                return res.status(404).json({ message: 'Tracking not found' });
            }

            if (tracking.otp == otp) {
                tracking.status = "Delivered";
                tracking.otp = null;
                await tracking.save();
                return res.status(201).json({ message: 'Status is Delivered', tracking });
            } else {
                return res.status(400).json({ message: 'Invalid OTP' });
            }
        } else {
            return res.status(404).json({ message: 'Tracking not found for this buyer' });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export { getTrackingById, createTracking, sellerDeliver, buyerDeliver, ifOtp };
