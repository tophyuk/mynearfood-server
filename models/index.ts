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
db.Token = require("./token")(sequelize, Sequelize);

//tb_user -> tb_profiel_image 외래키 참조
db.Users.hasMany(db.Profile, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
});
db.Profile.belongsTo(db.Users, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
});

//tb_user -> tb_token 외래키 참조
db.Users.hasMany(db.Token, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
});
db.Token.belongsTo(db.Users, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
});

export default db;
