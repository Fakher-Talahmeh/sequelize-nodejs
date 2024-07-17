const http = require("http");
const bodyParser = require("body-parser");
const express = require("express");
const sequelize = require("./util/database"); // Make sure this path is correct
const productRoutes = require("./routes/product");
const Product = require("./models/product");
const User = require("./models/user");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", productRoutes.routes);

Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});
User.hasMany(Product);

sequelize
  .sync()
  .then((result) => {
    console.log("Database synced");
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Max", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    console.log(user);
    app.listen(3000);
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
