const express = require("express");
const cors = require("cors");

const app = express();

//load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 5004;

//middleware to parse json request body
app.use(express.json());
app.use(cors());

//import routes for TODO API
const pokemonRoutes = require("./routes/pokemon");

//mount the todo API routes
app.use("/api/v1", pokemonRoutes);

//start server
app.listen(PORT, () => {
  console.log(`Server started successfully at ${PORT}`);
});

//connect to the database
const dbConnect = require("./config/database");
dbConnect();

// app.post("/register",async (req,res)=>{
//     let user = req.body;
//     let result = await User.create(user);
//     res.send(result);
// })
