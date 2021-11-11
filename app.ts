import * as express from "express";

const app = express();

// 변경코드
// const routes = require("./routes");
// app.use("/", routes);

/**
 *  App Configuration   //middleware
 */
// app.use(cors());

require("./routes/user")(app);

const PORT = process.env.DB_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
