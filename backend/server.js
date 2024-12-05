const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Pizza = require('./models/Pizza');
const Ingredients = require('./models/Ingredients');
const app = express();
const PORT = process.env.PORT || 5000;
mongoose.connect('mongodb://localhost:27017/pizzaDB');
app.use(cors());
app.get('/import-pizza', async (req, res) => {
  try {
    const pizzas = await Pizza.find({});
    res.status(200).json(pizzas);
  } catch (error) {
    console.error('Error fetching pizza data:', error);
    res.status(500).send('Error fetching pizza data');
  }
});
app.get('/ingredients', async (req, res) => {
  try {
    const pizzas = await Ingredients.find({});
    res.status(200).json(pizzas);
  } catch (error) {
    console.error('Error fetching pizza data:', error);
    res.status(500).send('Error fetching pizza data');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
