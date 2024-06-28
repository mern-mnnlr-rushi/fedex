import express from 'express'
import Tracking from '../model/TrackingSchema.js'
import isAuthenticated from '../middleware/isAuthenticated.js'
import { postTrack, getTrack, updateState, deleteTransaction } from '../controller/trackControl.js'
const router = express.Router()

router.post('/track',isAuthenticated, postTrack)
router.get('/track', getTrack)
router.put('/track',isAuthenticated, updateState)
router.delete('/track',isAuthenticated, deleteTransaction)

export default router