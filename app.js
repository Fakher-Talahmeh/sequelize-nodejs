const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const sequelize = require('./util/database'); // Make sure this path is correct
const adminRoutes = require('./routes/product');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', adminRoutes.routes);

sequelize.sync()
  .then(result => {
    console.log('Database synced');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

const server = http.createServer(app);
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});