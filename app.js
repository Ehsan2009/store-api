const express = require("express");
const notFound = require("./middleware/not_found");
const errorMiddleware = require("./middleware/error_handler");
require("dotenv").config();
const app = express();
const productsRouter = require("./routes/products");
const port = process.env.PORT || 3000;
const connectDB = require("./db/connect");

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/products", productsRouter);

app.use(notFound);
app.use(errorMiddleware);

const start = async () => {
  try {
    // connect to DB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
