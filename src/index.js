require('dotenv').config();
const express = require('express');
const app = express();
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');


app.use(cors());

const router = require('./routes');

app.use(express.json());
app.use('/api', router);
app.get('/', (req, res) => {
  res.send('Welcome');
});
app.use(errorHandler);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));