module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "Users",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING(45),
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      nickname: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      region: {
        type: Sequelize.STRING(45),
        allowNull: true,
        defaulteValue: "",
      },
      introduce: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaulteValue: "",
      },
      reg_date: {
        type: Sequelize.DATE,
        allowNull: true,
        defaulteValue: new Date(),
      },
      upt_date: {
        type: Sequelize.DATE,
        allowNull: true,
        defaulteValue: new Date(),
      },
      delete_yn: {
        type: Sequelize.STRING(10),
        allowNull: true,
        defaulteValue: "N",
      },
      login_type: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaulteValue: "mynear",
      },
      priviate_yn: {
        type: Sequelize.STRING(10),
        allowNull: true,
        defaulteValue: "N",
      },
      salt: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaulteValue: "",
      },
    },
    {
      tableName: "tb_user",
    }
  );

  return Users;
};
