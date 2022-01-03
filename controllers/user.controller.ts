import db from "../models/index"
import { createHmac } from "crypto"
import express = require("express")
import { CODES } from "../constants/codes"

const jwt = require("jsonwebtoken")
const Users = db.Users
const Op = db.sequelize.Op
const newDate = new Date()

const YOUR_SECRET_KEY = process.env.SECRET_KEY

exports.singup = async (req: express.Request, res: express.Response) => {
  const users = {
    email: req.body.email,
    nickname: req.body.nickname,
    password: req.body.password,

    salt: "",
  }

  let salt: string = Math.round(new Date().valueOf() * Math.random()) + ""
  const hashPassword = createHmac("sha256", users.password)
    .update(users.password + salt)
    .digest("hex")

  users.salt = salt
  users.password = hashPassword

  try {
    const user = await Users.create(users)
    res.send({
      code: 1,
      message: CODES.S0101,
    })
  } catch (err) {
    res.status(500).send({ message: err.message || "singup failure." })
    console.error(err)
  }
}

exports.login = async (req: express.Request, res: express.Response) => {
  const email = req.body.email
  const password = req.body.password
  const result = await Users.findOne({ where: { email: email } })

  const hashPassword = createHmac("sha256", password)
    .update(password + result.salt)
    .digest("hex")

  let condition = { where: { email: email, password: hashPassword } }
  try {
    const user = await Users.findOne(condition) // 여기서부터
    if (user.length !== 0) {
      const token = jwt.sign(
        {
          email: user.email,
        },
        YOUR_SECRET_KEY,
        {
          expiresIn: "30m",
        }
      )
      res.cookie("user", token)
      res.json({
        message: "success",
        code: "202",
        token,
        user,
      })
    } else {
      res.json({
        message: "fail",
        code: "400",
      })
    }
  } catch (err) {
    res.json({
      message: err.message,
      code: "400",
    })

    console.error(err)
  }
}

exports.logout = async (req, res) => {
  res.cookie("user", "")
  res.json({
    message: CODES.S0001,
    code: 1,
  })
}

exports.findPassword = async (req, res) => {
  const email = req.params.email
  const password =
    "mynearfood" + Math.round(new Date().valueOf() * Math.random()) + ""

  const responseObject = {
    code: "200",
    message: "success",
  }
  const result = await Users.findOne({ where: { email: email } })
  const salt = result.salt
  const hashPassword = createHmac("sha256", password)
    .update(password + salt)
    .digest("hex")

  await Users.update({ password: hashPassword }, { where: { email: email } })
    .then((resultCount) => {
      res.status().send(responseObject)
    })
    .catch((err) => {})
}

exports.findAll = async (req, res) => {
  const email = "sanghyuk1992@naver.com"
  let condition = { where: { email: email } }

  Users.findAll(condition)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Retrieve all tutorials failure." })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id

  Users.findByPk(id)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error select with id : " + id,
      })
    })
}

exports.verifyToken = (req, res, next) => {
  try {
    const clientToken = req.headers.cookie
    console.log("!!" + clientToken)
    const splitToken = clientToken.split("user=")
    console.log("Clie :", splitToken[1])

    const decoded = jwt.verify(splitToken[1], YOUR_SECRET_KEY)
    // console.log(decoded);
    if (decoded) {
      res.locals.email = decoded.email
      res.send(res.locals.email)
      next()
    } else {
      res.status(401).json({ error: "unauthorized" })
    }
  } catch (err) {
    res.status(401).json({ error: "token expired" })
  }
}

exports.update = (req, res) => {
  const id = req.params.id
  const condition = id ? { where: { id: id } } : null

  Users.update({ nickname: "shj1234" }, { where: { id: id } })
    .then((resultCount) => {
      if (resultCount == 1) {
        res.send({
          message: "success Update id :" + id,
        })
      } else {
        res.send({
          message: "fail Update id :" + id,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "ERROR " + err.message,
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id

  Users.destroy({
    where: { id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          messasege: "success Delete id :" + id,
        })
      } else {
        res.send({
          messasege: "fail Delete id :" + id,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        messaege: err.message,
      })
    })
}

exports.checkEmail = async (req, res) => {
  console.log("check Email", req)
  const result = await Users.findOne({ where: { email: req.query.email } })

  if (result) {
    res.send({
      code: 0,
      message: CODES.F0101,
    })
  }

  res.send({
    code: 1,
    message: CODES.S0001,
  })
}

exports.checkNickname = async (req, res) => {
  const result = await Users.findOne({
    where: { nickname: req.query.nickname },
  })

  if (result) {
    res.send({
      code: 0,
      message: CODES.F0102,
    })
  }
  res.send({
    code: 1,
    message: CODES.S0001,
  })
}
