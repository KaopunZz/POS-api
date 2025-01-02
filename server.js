const express = require('express');
const app = express();
const bodyPaser = require('body-parser');
const cors = require('cors');

app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: true }))
app.use(cors());

const userController = require('./controllers/UserController')
const foodTypeController = require('./controllers/FoodTypeController');
const foodSizeController = require('./controllers/FoodSizeController');
const tasteController = require('./controllers/TasteController');

//
// taste
//
app.put('/api/taste/update', (req, res) => tasteController.update(req, res));
app.delete('/api/taste/remove/:id', (req, res) => tasteController.remove(req, res));
app.get('/api/taste/list', (req, res) => tasteController.list(req, res));
app.post('/api/taste/create', (req, res) => tasteController.create(req, res));

//
// foodSize
//
app.put('/api/foodSize/update', (req, res) => foodSizeController.update(req, res));
app.delete('/api/foodSize/remove/:id', (req, res) => foodSizeController.remove(req, res));
app.get('/api/foodSize/list', (req, res) => foodSizeController.list(req, res));
app.post('/api/foodSize/create', (req, res) => foodSizeController.create(req, res));

//
// foodType
//
app.put('/api/foodType/update', (req, res) => foodTypeController.update(req, res));
app.delete('/api/foodType/remove/:id', (req, res) => foodTypeController.remove(req, res))
app.get('/api/foodType/list', (req, res) => foodTypeController.list(req, res));
app.post('/api/foodType/create', (req, res) => foodTypeController.create(req, res));

// 
// user
//
app.post('/api/user/signIn', (req, res) => userController.signIn(req, res))

app.listen(3001, () => {
    console.log('API Server Running on Port 3001');
});