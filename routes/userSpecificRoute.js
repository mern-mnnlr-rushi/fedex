import express from 'express'
import {getTrackingById, createTracking, sellerDeliver, buyerDeliver, ifOtp} from '../controller/userSpecificController.js'
const router = express.Router()

router.get('/:id', getTrackingById)
router.post('/create', createTracking)
router.post("/deliver", sellerDeliver)
router.get("/buyer-deliver/:buyerId/:trackingId", buyerDeliver);
router.post("/ifOtp", ifOtp);
export default router;