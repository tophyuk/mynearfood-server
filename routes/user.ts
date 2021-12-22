const users = require("../controllers/user.controller")
const router = require("express").Router()

// 로그인 및 회원가입
router.post("/login", users.login)
router.post("/logout", users.logout)
router.post("/signup", users.singup)
router.get("/verify", users.verifyToken)
router.get("/findPassword", users.findPassword)
router.get("/checkEmail", users.checkEmail)
router.get("/checkNickname", users.checkNickname)

// Create a new Tutorial
router.get("/", users.findAll)

router.get("/:id", users.findOne)
router.put("/:id", users.update)
router.delete("/:id", users.delete)

export default router
