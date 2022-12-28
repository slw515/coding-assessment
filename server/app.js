const express = require("express");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");

const todosRouter = require("./routes/todos.routes");

app.use(function (_, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/todos", todosRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
