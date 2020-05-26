const mongoose = require('../database');

const ParkRequestSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    enterDate: {
        type: Date,
        required: true,
    },
    exitDate: {
        type: Date,
        required: true,
    },
    refParkingSite: {
        type: String,
        required: true,
    },
});

const ParkRequest = mongoose.model('ParkRequest', ParkRequestSchema);

module.exports = ParkRequest;