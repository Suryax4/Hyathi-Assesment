const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
var cors = require("cors");
var { initializeCronJob } = require("./pokemonCron");

require("dotenv").config();
const PORT = process.env.PORT || 5010;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", routes);
initializeCronJob();

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
