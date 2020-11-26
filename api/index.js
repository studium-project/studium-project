const express = require('express');
const app = express();
const cors = require('cors');
const types = require('./lib/types');
const { PORT } = require('./lib/config');

app.use(cors());
types(app);

app.listen(PORT, () => {
    console.log(`listening at http://0.0.0.0:${PORT}`);
});
