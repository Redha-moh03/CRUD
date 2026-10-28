const mongoose = require('mongoose')

const carsSchema = new mongoose.Schema({
    name: {
        type: String
    },
    year: {
        type: Number
    },
    companyName:{
        type: String
    },
    size:{
        type: Number
    },
    rating:{
        type: Number
    }
}, { timestamps: true })


const Cars = mongoose.model('Cars', carsSchema)

module.exports = Cars