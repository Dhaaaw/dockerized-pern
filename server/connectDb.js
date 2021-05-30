const db = require("./database");

const connectDb = async (retries = 5) => {
  while (retries) {
    try {
      await db.sequelize.sync();
      console.log("Connected to the database and initialized the tables !");
      break;
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      // wait 5 seconds to  rety again
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
};

module.exports = connectDb;
