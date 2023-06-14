const fs = require('fs')
const express = require('express');
const app = express()
const port = 3000


app.use(express.json()) //middleware
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        stats: 'success', //status that will be used
        results: tours.length, //for more than `1 knowing the len of the data
        data: {
            tours
        }//data that will be sent from the server
    })
})

//get request for specific id tour
app.get('/api/v1/tours/:id', (req, res) => {
    console.log(req.params) //id
    const id = req.params.id * 1 //convert it to a number
    if (!tour || id > tours.length) {
        return res.status(404).json({
            status: "fail",
            message: "invalid ID"
        })
    }
    const tour = tours.find(el => el.id === id) //find specific id


    res.status(200).json({
        stats: 'success', //status that will be used

        data: {
            tour: tour
        }//data that will be sent from the server

    })
})


//post request
app.post('/api/v1/tours', (req, res) => {
//since we are not using body-parser we use the middleware to have the body of req
//!     console.log(req.body) //onject sent to the post
    const newId = tours[tours.length - 1].id + 1 //adding a new id manually
    const newTour = Object.assign({id: newId}, req.body) //create object and add it to the array
    tours.push(newTour); //add it to the array tours
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        err => {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour,
                }

            })


        })
})

app.patch('/api/v1/tours/:id', (req, res) => {
    // if (req.params.id * 1 > tours.length) {
    //     return res.status(404).json({
    //         status: "fail",
    //         message: "invalid ID"
    //     });
    // }

    res.status(200).json({
        status:'success',
        data:  {
        tour: '<updated tour here>'
    }
})
})


app.listen(port, () => {
    console.log(`starting server on port ${port}`)
})
