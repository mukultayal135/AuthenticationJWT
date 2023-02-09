const express = require('express');
const app = express();
const port = 3001;
const dotenv = require('dotenv');
dotenv.config();

const userRouter = require('./src/routes/users');
app.use(express.json());
app.use('/', userRouter);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
