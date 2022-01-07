module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "Users",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        comment: "사용자 고유번호",
      },
      email: {
        type: Sequelize.STRING(45),
        allowNull: false,
        validate: {
          isEmail: true,
        },
        comment: "이메일",
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "패스워드",
      },
      nickname: {
        type: Sequelize.STRING(45),
        allowNull: false,
        comment: "닉네임",
      },
      region: {
        type: Sequelize.STRING(45),
        allowNull: true,
        defaulteValue: "",
        comment: "지역",
      },
      introduce: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaulteValue: "",
        comment: "소개",
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
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
      tableName: "tb_user",
    }
  );
  return Users;
};
