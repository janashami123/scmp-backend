const express= require('express');
const bodyParser =require('body-parser');
const path = require('path');
const cors =require('cors')
const app = express()
const PORT =3000
const db = require('./src/models');

app.use(bodyParser.urlencoded({ extended: true }));
db.sequelize.sync();

app.use(cors());
app.listen(PORT, console.log(`Server started on port ${PORT}`))