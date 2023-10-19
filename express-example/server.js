require("dotenv").config();
const express = require("express");
const database = require("./middleware/database");
const routes = require("./routes/routes");
const sikayetciRoutes = require("./routes/sikayetciRoutes");
const gozlemciRoutes = require("./routes/gozlemciRoutes");
const ortakRoutes = require("./routes/commonRoutes");


const port = process.env.PORT;
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
