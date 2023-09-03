const fs = require("fs/promises");
const path = require("path");

console.log("DB_URL :", process.env.DB_URL);
console.log("resolved path :", path.resolve(process.env.DB_URL));

class DatabaseConnection {
  constructor(dbURL) {
    this.db = null;
    this.dbURL = dbURL;
  }

  async connect() {
    const dbStr = await fs.readFile(this.dbURL, { encoding: "utf-8" });
    this.db = JSON.parse(dbStr);
  }
  async writeDB() {
    if (this.db) {
      this.db = await fs.writeFile(this.dbURL, JSON.stringify(this.db));
    }
  }

  async getDB() {
    if (!this.db) {
      await this.connect();
    }
    return this.db;
  }
}

// const main = async () => {
//   const dbConnection = new DatabaseConnection(path.resolve(process.env.DB_URL));
//   const db = await dbConnection.getDB();

//    db.users.push("kaisar");
//    db.users.push("Johurul");
//  dbConnection.writeDB();

//   console.log("Database :",db);
// }

// main();

const databaseConnection = new DatabaseConnection(path.resolve(process.env.DB_URL));
module.exports = databaseConnection;
