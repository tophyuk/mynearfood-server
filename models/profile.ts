module.exports = (sequelize, Sequelize) => {
  const Profile = sequelize.define(
    "Profile",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      // user_id: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false, // 모델 간 관계 설정
      //   references: {
      //     model: "tb_user", //user모델의 primery key를 강제로 참조함.
      //     key: "id", //foreign key를 'user_id'로 설정
      //   },
      // },
      path: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    },
    {
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
      tableName: "tb_profile_image",
    }
  );

  return Profile;
};
