require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const sikayetciRoutes = require("./routes/sikayetciRoutes");
const gozlemciRoutes = require("./routes/gozlemciRoutes");
const ortakRoutes = require("./routes/commonRoutes");

const mongoString = process.env.DATABASE_URL;
const port = process.env.PORT;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();

app.use(express.json());
app.use("/", ortakRoutes);
app.use("/gozlemci", gozlemciRoutes); 
app.use("/sikayetci", sikayetciRoutes);
/* 
app.use("/complainant",complainantRoutes)
app.use("/corporation",corporationRoutes) */
//app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
