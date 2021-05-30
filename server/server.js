require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./database");
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

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Drop and Resync Database with { force: true }");
  })
  .catch((err) => {
    console.log({ message: err.message });
  });

app.use(express.static(path.join(__dirname, "../client/build")));

app.use(authRoutes);
app.use(userRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
