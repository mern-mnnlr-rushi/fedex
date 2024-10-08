import Tracking from "../model/TrackingSchema.js";

const postTrack = async (req, res) => {
    const { trackingNumber } = req.body // exapt the data in json format
    try {
        const results = await Tracking.findOne({ trackingNumber })
        if (results) {
            return res.status(400).json({
                message: "Track already exists"
            })
        }
        const data = new Tracking({
            trackingNumber, status: "In Transit"
        })
        const result = await data.save()
        res.status(200).json({
            message: "Track added successfully",
            data: result
        })
    } catch (err) {
        res.status(500).json({
            mesgsae: "Error in postTrack",
            error: err
        })
    }
}

const getTrack = async (req, res) => {
    const { trackingNumber } = req.query; //* TYPO: previously its gettign data from body. ( data from url UPDATE THIS IN BACKEND )
    console.log(trackingNumber);
    try {
        const result = await Tracking.findOne({ trackingNumber })
        if (!result) {
            return res.status(400).json({
                message: "Track not found"
            })
        }
        res.status(200).json({
            message: "Track found successfully",
            data: result
        })

    } catch (err) {
        res.status(500).json({
            message: "Error in getTrack",
            error: err.message
        })
    }
}


const updateState = async (req, res) => {
    const { trackingNumber, state } = req.body
    if (!trackingNumber || !state) {
        return res.status(400).json({
            message: "Please provide tracking number and state"
        })
    }
    try {
        const data = await Tracking.findOneAndUpdate({ trackingNumber }, { status: state })
        if (!data) {
            res.status(400).json({
                message: "Track not found"
            })
        }
        res.status(200).json({
            message: "Data updated successfully",
            data: data
        })
    } catch (err) {
        res.send(err)
    }
}

const deleteTransaction = async (req, res) => {
    const { trackingNumber } = req.query; //* TYPO: previously its gettign data from body. ( data from url UPDATE THIS IN BACKEND )
    if (!trackingNumber) {
        return res.status(400).json({
            message: "Please provide tracking number"
        })
    }
    try {
        const data = await Tracking.findOneAndDelete({ trackingNumber })
        res.status(200).json({
            message: "Data deleted successfully",
            data: data
        })
    } catch (err) {
        res.send(err)
    }
}




export { postTrack, getTrack, updateState, deleteTransaction }