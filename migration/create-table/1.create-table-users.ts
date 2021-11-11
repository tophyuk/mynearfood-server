import db from "../../models";
const Users = db.Users;

console.log("======Create User Table======");
const create_table_users = async () => {
  await Users.sync({ force: true })
    .then(() => {
      console.log("✅Success Create User Table");
    })
    .catch((err) => {
      console.log("❗️Error in Create User Table : ", err);
    });
};

create_table_users();
