require("dotenv").config();
const http = require("http");
const app = require("./app");
const { connectDB } = require("../src/db");

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const main = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log("Database error !!");
    console.log(err);
  }
};

main();
