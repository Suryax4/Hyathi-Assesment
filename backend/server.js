const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
var cors = require('cors');
var {initializeCronJob} = require("./pokemonCron")

mongoose.connect("mongodb+srv://suryaprakashx4:2PXHgDaClwtNYMsa@cluster0.magyhzo.mongodb.net/mernstack?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));


const app = express();
app.use(cors())
app.use(express.json());

app.use("/", routes);
initializeCronJob();

const port = 5010;
app.listen(port, () => {
  console.log(`Server is running on PORT:${port}`);
});
