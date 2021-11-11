import db from "../models";
import { createHmac } from "crypto";
const Users = db.Users;
const Op = db.sequelize.Op;
const newDate = new Date();

exports.singup = async (req, res, next) => {
  // Create a Tutorial
  const users = {
    email: "sanghyuk1992@naver.com",
    nickname: "shj8278",
    password: "shj8278",
    region: "대구",
    reg_date: newDate,
    upt_date: newDate,
    introduce: "오늘도 피곤해",
    delete_yn: "N",
    login_type: "mynear",
    priviate_yn: "Y",
    salt: "",
  };

  let salt: string = Math.round(new Date().valueOf() * Math.random()) + "";
  const hashPassword = createHmac("sha256", users.password)
    .update(users.password + salt)
    .digest("hex");

  users.salt = salt;
  users.password = hashPassword;

  try {
    const user = await Users.create(users);
    res.send("sign-up success");
  } catch (err) {
    res.status(500).send({ message: err.message || "singup failure." });
    console.error(err);
  }
};

exports.login = async (req, res) => {
  const email = "sanghyuk1992@naver.com";
  const password = "shj8278";
  const user = await Users.findOne({ where: { email: email } });

  const hashPassword = createHmac("sha256", password)
    .update(password + user.salt)
    .digest("hex");

  let condition = { where: { email: email, password: hashPassword } };
  try {
    const user = await Users.findOne(condition);
    res.send(user);
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message || "Retrieve all tutorials failure." });

    console.error(err);
  }
};

exports.findAll = async (req, res) => {
  const email = "sanghyuk1992@naver.com";
  let condition = { where: { email: email } };

  Users.findAll(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Retrieve all tutorials failure." });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Users.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error select with id : " + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const condition = id ? { where: { id: id } } : null;

  Users.update({ nickname: "shj1234" }, { where: { id: id } })
    .then((resultCount) => {
      if (resultCount == 1) {
        res.send({
          message: "success Update id :" + id,
        });
      } else {
        res.send({
          message: "fail Update id :" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "ERROR " + err.message,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Users.destroy({
    where: { id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          messasege: "success Delete id :" + id,
        });
      } else {
        res.send({
          messasege: "fail Delete id :" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        messaege: err.message,
      });
    });
};
