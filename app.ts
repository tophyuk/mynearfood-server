import express from "express"
import router from "./routes"
const app = express()
const cors = require("cors")

const corsOptions = {
  origin: "http://localhost:9001",
}

app.use(cors(corsOptions))

const bodyParser = require("body-parser") // req에 body 태그 변환
app.use(bodyParser.json())

// 변경코드
app.use("/", router)

// require("./routes/user")(app);

const PORT = process.env.DB_PORT
app.listen(3001, () => {
  console.log(`Server is running on port ${PORT}.`)
})

export default app
