// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const morgan = require('morgan')
const Cars = require('./models/Cars')





// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // this will allow us to see the data being sent in the POST or PUT
app.use(methodOverride('_method'))
app.use(morgan('dev'))


async function conntectToDB() { //connection to the database
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch (error) {
        console.log("Error Occured", error)
    }
}


conntectToDB()


















// Routes go here

app.get('/', (req, res) => {
    res.render('homepage.ejs')
})
app.get('/new', (req, res) => {
    res.render('create-car.ejs')
})


app.post('/new', async (req, res) => {
    const createdCar = await Cars.create({
        name: req.body.name,
        year: req.body.year,
        size: req.body.size,
        rating: req.body.rating,
        companyName: req.body.companyName
    })
    res.redirect('/new')
})
app.get('/cars', async (req, res) => {
    const allCars = await Cars.find()
    res.render('car-list.ejs', { cars: allCars })
})
app.get('/cars/:carId', async (req, res) => {
    const foundCar = await Cars.findById(req.params.carId)
    res.render('car-details.ejs', { car: foundCar })
})
app.delete('/cars/:carId/delete', async (req, res) => {
    const deleteCar = await Cars.findByIdAndDelete(req.params.carId)
    res.redirect('/cars')
})
app.get('/cars/:carId/edit', async (req, res) => {
    const oneCar = await Cars.findByIdAndUpdate(req.params.carId)
    res.render('car-edit.ejs', { car: oneCar })
})
app.put('/cars/:carId', async (req, res) => {
    const updatedCar = await Cars.findByIdAndUpdate(req.params.carId, req.body)
    res.redirect('/cars')
})








app.listen(3000, () => {
    console.log("Listening on port " + 3000)
}) // Listen on port 3000


