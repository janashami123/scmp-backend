const express= require('express');
const bodyParser =require('body-parser');
const path = require('path');
const cors =require('cors')
const app = express()
const PORT =3000
const dotenv = require('dotenv')
const User =require('./src/routes/userRoute')
const db = require('./src/models');

app.use(bodyParser.urlencoded({ extended: true }));
db.sequelize.sync();
dotenv.config();


app.use(cors());
app.use("/api/user", User);
app.use("/api/event", User);
app.listen(PORT, console.log(`Server started on port ${PORT}`))