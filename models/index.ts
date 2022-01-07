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
db.Profile = require("./profile")(sequelize, Sequelize);

//tb_user -> tb_profiel_image 외래키 참조
db.Users.hasMany(db.Profile, {
  foreignKey: "user_id",
});
db.Profile.belongsTo(db.Users, {
  foreignKey: "user_id",
});

export default db;
