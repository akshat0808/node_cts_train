const express = require("express");
const employeeRoutes = require("./routes/employee");
var morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors');



mongoose.connect(
  "mongodb://localhost:27017/employeeDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) {
      console.log("mongo couldn't be connected ");
    } else {
      console.log("mongodb connected");
    }
  }
);

const app = express();

app.get("/", (req, res) => {
  //res.send('api running');
  res.status(200).json({
    error: false,
    message: "Api up and running"
  });
});
//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/employee", employeeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running at port: ${PORT}`);
});
