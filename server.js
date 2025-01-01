const express = require('express');
const app = express();
const bodyPaser = require('body-parser');
const cors = require('cors');

app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: true }));
app.use(cors());

const userController = require('./controllers/UserController')

app.post('/api/user/signIn', (req, res) => userController.signIn(req, res))

app.listen(3001, () => {
    console.log('API Server Running on Port 3001');
});