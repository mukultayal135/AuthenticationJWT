const express = require('express');
const app = express();
const port = 3000;
const taskRouter = require('./src/routes/taskRoutes');
app.use(express.json());
const tokenValidation = require('./src/middlewares/tokenValidation');
app.use(tokenValidation.tokenValidation);
app.use('/tasks', taskRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
