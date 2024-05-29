const express = require('express');
const app  = express();
const cors = require('cors');
const PORT = 8000;
const routing = require('../routing');

app.use(express.json());
app.use(cors());

routing(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});