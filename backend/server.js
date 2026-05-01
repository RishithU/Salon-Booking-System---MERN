require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const PORT = 3000;

// Connect DB
connectDB();


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});