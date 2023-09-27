const fs = require("fs");
const express = require("express");
const app = express();


app.use(express.json()); //middleware


app.use((req, res, next) => {
  console.log("HELLO FROM MIDDLEWARE ")
  next();
})


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})



const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
); //parsin to be ablke to use file with data

const getAllTours = (req, res) => {
  console.log(req.requestTime)
  res.status(200).json({
    stats: "success", //status that will be used
    requestedAt: req.requestTime,
    results: tours.length, //for more than `1 knowing the len of the data
    data: {
      tours,
    }, //data that will be sent from the server
  });
};

const getTour = (req, res) => {
  console.log(req.params); //id

  const id = req.params.id * 1; //convert it to a number
  const tour = tours.find((el) => el.id === id); //find specific id
  //  if (id > tours.length) {
  if (!tour || id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "invalid ID",
    });
  }

  res.status(200).json({
    stats: "success", //status that will be used

    data: {
      tour: tour,
    }, //data that will be sent from the server
  });
};

const createTour = (req, res) => {
  //since we are not using body-parser we use the middleware to have the body of req
  //!     console.log(req.body) //onject sent to the post
  const newId = tours[tours.length - 1].id + 1; //adding a new id manually
  const newTour = Object.assign({ id: newId }, req.body); //create object and add it to the array
  tours.push(newTour); //add it to the array tours
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "invalid ID",
    });
  }

  res.status(200).json({
    status: "Success",
    data: {
      tour: "<updated tour here>",
    },
  });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1; //convert it to a number
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "invalid ID",
    });
  }

  res.status(204).json({
    status: "Success",
    data: null,
  });
};

// app.get('/api/v1/tours', getAllTours)

// app.post('/api/v1/tours', createTour)
// app.get('/api/v1/tours/:id',getTour)
// app.patch('/api/v1/tours/:id',updateTour)
// app.delete('/api/v1/tours/:id',deleteTour)

app.route("/api/v1/tours")
.get(getAllTours)
.post(createTour);






app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);



const port = 3000;
app.listen(port, () => {
  console.log(`starting server on port ${port}`);
});
