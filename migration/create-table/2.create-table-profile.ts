import db from "../../models";
const Profile = db.Profile;

console.log("======Create Profile Table======");
const create_table_profile = async () => {
  await Profile.sync({ force: true })
    .then(() => {
      console.log("✅Success Create Profile Table");
    })
    .catch((err) => {
      console.log("❗️Error in Create Profile Table : ", err);
    });
};

create_table_profile();
