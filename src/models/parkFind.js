const mongoose = require('../database');

const ParkFindSchema = new mongoose.Schema({
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

const ParkFind = mongoose.model('ParkFind', ParkFindSchema);

module.exports = ParkFind;