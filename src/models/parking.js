const mongoose = require('../database');
const mongooseToCsv = require('mongoose-to-csv');

const ParkingSchema = new mongoose.Schema({
    userId: {
        type: Number,
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
    refParkingGroup: {
        type: String,
        required: true,
    },
    refParkingSpot: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

ParkingSchema.plugin(mongooseToCsv, {
    headers: 'EnterDate ExitDate refParkingGroup',
    constraints: {
      'EnterDate': 'enterDate',
      'ExitDate': 'exitDate',
      'RefParkingGroup': 'refParkingGroup'
    },
  });

const Parking = mongoose.model('Parking', ParkingSchema);

module.exports = Parking;