import { dbConfig } from "../config/config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: "mysql",
  }
);

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("./user")(sequelize, Sequelize);

export default db;
