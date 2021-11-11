module.exports = (app) => {
  const users = require("../controllers/user.controller");
  var router = require("express").Router();

  // 로그인 및 회원가입
  router.post("/login", users.login);
  router.post("/signup", users.singup);

  // Create a new Tutorial
  router.get("/", users.findAll);

  router.get("/:id", users.findOne);
  router.put("/:id", users.update);
  router.delete("/:id", users.delete);

  app.use("/users", router);
};
