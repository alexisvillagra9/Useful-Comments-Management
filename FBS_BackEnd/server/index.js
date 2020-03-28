const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

const { mongoose } = require("./database");

//Settings
app.set("port", process.env.PORT || 3000);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "http://localhost:4200" }));

//Routes
app.use("/api/comments", require("./routes/comments.routes"));
app.use("/api/fb-post", require("./routes/fb-post.routes"));
app.use("/api/target-pages", require("./routes/target-pages.routes"));

//Starting the server
app.listen(app.get("port"), () => {
  console.log("Server on port ", app.get("port"));
});
