require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDb = require("./connectDb");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

connectDb();

app.use(authRoutes);
app.use(userRoutes);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
