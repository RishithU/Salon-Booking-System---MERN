const express = require("express");
const cors = require("cors");
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Routes 
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const shopRoutes = require("./routes/shop.routes");
app.use("/api/shop", shopRoutes);

const serviceRoutes = require("./routes/service.routes");
app.use("/api/service", serviceRoutes);

const staffRoutes = require("./routes/staff.routes");
app.use("/api/staff", staffRoutes);


app.get("/", (req, res) => {
  res.send("API Running...");
});

module.exports = app;