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
      },
      introduce: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      reg_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      upt_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      delete_yn: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      login_type: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      priviate_yn: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      salt: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
    },
    {
      tableName: "tb_user",
    }
  );

  return Users;
};
