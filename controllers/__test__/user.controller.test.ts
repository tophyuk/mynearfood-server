import db from "@/models";
import { createHmac } from "crypto";
import { UsersTypes } from "@/constants/types";
import { CODES } from "@/constants/codes";
import app from "@/app";
jest.setTimeout(3000);
const req = require("supertest");
const jwt = require("jsonwebtoken");
const YOUR_SECRET_KEY = process.env.SECRET_KEY;
const Users = db.Users;

const email = "leesin3@gmail.com";
const password = "fltls2";
const nickname = "leesin3";
const objGet = {
  params: {
    email,
    password,
    nickname,
  },
};

const objPost = {
  body: {
    email,
    password,
    nickname,
  },
};

const login = async (req) => {
  const result = await Users.findOne({ where: { email: req.body.email } });
  const hashPassword = createHmac("sha256", req.body.password)
    .update(req.body.password + result.salt)
    .digest("hex");

  let condition = {
    where: { email: req.body.email, password: hashPassword },
  };
  const user = await Users.findOne(condition);

  return user;
};

const checkEmail = async (req) => {
  const result = await Users.findOne({ where: { email: req.params.email } });
  console.log(result);
  if (result) {
    return {
      code: 0,
      message: CODES.F0101,
    };
  }
  return {
    code: 1,
    message: CODES.S0001,
  };
};

const checkNickName = async (req) => {
  const result = await Users.findOne({
    where: { nickname: req.params.nickname },
  });

  if (result) {
    return {
      code: 0,
      message: CODES.F0102,
    };
  }
  return {
    code: 1,
    message: CODES.S0001,
  };
};

describe("user controller test !!", () => {
  test.skip("login function test", async () => {
    const user: UsersTypes = await login(objPost);
    expect(user.email).toBe(email);
  });

  test.skip("login API test.", (done) => {
    req(app)
      .post("/users/login")
      .send({ email: email, password: password })
      .expect((res) => {
        expect(res.body.user.email).toBe(email);
      })
      .expect(200, done);
  });

  test.skip("token author test.", () => {
    const token = jwt.sign(
      {
        email: email,
      },
      YOUR_SECRET_KEY,
      {
        expiresIn: "30m",
      }
    );
    if (token == null) {
    } else {
      const check = jwt.verify(token, YOUR_SECRET_KEY);
      expect(email).toBe(check.email);
    }
  });

  test.skip("find Password function test.", async () => {
    const pwd =
      // "mynearfood" + Math.round(new Date().valueOf() * Math.random()) + "";
      "fltls2";

    const result = await Users.findOne({ where: { email: email } });
    const salt = result.salt;

    const hashPassword = createHmac("sha256", pwd)
      .update(pwd + salt)
      .digest("hex");

    await Users.update({ password: hashPassword }, { where: { email: email } })
      .then((resultCount) => {
        expect(resultCount).toBe("Dsadsads");
      })
      .catch((err) => {});

    objPost.body.password = pwd;
    const user: UsersTypes = await login(objPost); // await 사용해야함

    expect(user.nickname).toBe(nickname);
  });

  test.skip("email check", async () => {
    const result = await checkEmail(objGet);
    expect(result.message).toBe(CODES.S0001);
  });

  test.skip("nickname check", async () => {
    const result = await checkNickName(objGet);
    expect(result.message).toBe(CODES.S0001);
  });
});
