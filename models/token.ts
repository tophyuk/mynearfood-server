module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define(
    "Token",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      token: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(45),
        allowNull: false,
        validate: {
          isEmail: true,
        },
        comment: "이메일",
      },
    },
    {
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
      tableName: "tb_token",
    }
  );

  return Token;
};
