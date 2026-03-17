const express = require("express");
const notFound = require("./middleware/not_found");
const errorMiddleware = require("./middleware/error_handler");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(notFound);
app.use(errorMiddleware);

const start = () => {
  try {
    // connect to DB
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
