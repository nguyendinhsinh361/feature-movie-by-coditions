const express = require("express");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieSession = require("cookie-session");
const keys = require("cookie-session");
const passport = require("./passport");
const movieRoute = require("./routes/Movie");
const categoryRoute = require("./routes/Category");
const userRoute = require("./routes/User");
const authRoute = require("./routes/auth");
const port = 8000;

dotenv.config();
// Connect Database
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected DB"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("common"));
app.use(cors());
app.use(express.json());

//

//Routes
app.use("/api/movies", movieRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
