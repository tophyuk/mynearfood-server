import db from "../../models";
const Token = db.Token;

console.log("======Create Profile Token======");
const create_table_token = async () => {
  await Token.sync({ force: true })
    .then(() => {
      console.log("✅Success Create Token Table");
    })
    .catch((err) => {
      console.log("❗️Error in Create Token Table : ", err);
    });
};

create_table_token();
