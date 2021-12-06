import db from "@/models";
import { createHmac } from "crypto";
import { UsersTypes } from "@/constants/types";
import app from "@/app";
jest.setTimeout(3000);
const req = require("supertest");
const jwt = require("jsonwebtoken");
const YOUR_SECRET_KEY = process.env.SECRET_KEY;
const Users = db.Users;

const email = "sanghyuk1992@naver.com";
const password = "wjdtkdgur12";
const nickname = "shj8278";
const obj = {
  params: {
    email,
    password,
  },
};

const obj2 = {
  cookie: {
    user: "tokken",
  },
};
const login = async (req) => {
  const result = await Users.findOne({ where: { email: req.params.email } });
  const hashPassword = createHmac("sha256", req.params.password)
    .update(req.params.password + result.salt)
    .digest("hex");

  let condition = {
    where: { email: req.params.email, password: hashPassword },
  };
  const user = await Users.findOne(condition);

  return user;
};

describe("user controller test !!", () => {
  test.skip("login function test", async () => {
    const user: UsersTypes = await login(obj); // await 사용해야함
    expect(user.email).toBe(email);
  });

  test("login API test.", async () => {
    const response = await req(app)
      .post("/users/login")
      .send({ email: email, password: password });
    expect(response.statusCode).toBe(200);
  });

  test.skip("find Password function test.", async () => {
    const pwd =
      "mynearfood" + Math.round(new Date().valueOf() * Math.random()) + "";

    const result = await Users.findOne({ where: { email: email } });
    const salt = result.salt;

    const hashPassword = createHmac("sha256", pwd)
      .update(pwd + salt)
      .digest("hex");

    await Users.update({ password: hashPassword }, { where: { email: email } })
      .then((resultCount) => {
        expect(resultCount).toBe(1);
      })
      .catch((err) => {});

    obj.params.password = pwd;
    const user: UsersTypes = await login(obj); // await 사용해야함

    expect(user.nickname).toBe(nickname);
  });
});
