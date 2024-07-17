const express = require("express")
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.json())
const dotenv = require('dotenv').config({ path: './.env' });
const { User, SavedResponse } = require('./models');

const PORT = process.env.PORT || 5000;
const router = express.Router();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend URL
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (req.method === 'OPTIONS') {
    res.sendStatus(200); // Preflight request response
  } else {
    next();
  }
});

router.post('/signupUser', async (req, res) => {
  console.log("hello F-------");
  console.log(req.body)
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({ name, email, password });
    res.status(200).send(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});
app.post('/api/loginUser', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare passwords
    if (user.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Successful login
    res.json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

app.post('/api/SaveRespose', async (req, res) => {
  const { name, responseCodes, imageLinks, userId } = req.body;
  console.log(req.body)
  try {
    const newSavedResponse = await SavedResponse.create({ name, creationDate: Date.now(), responseCodes, imageLinks, userId });
    res.json(newSavedResponse);
  } catch (error) {
    console.error('Error creating SavedResponse:', error);
    res.status(500).json({ error: 'Failed to create SavedResponse' });
  }
});

app.get('/api/savedresponses', async (req, res) => {
  try {
    const savedResponses = await SavedResponse.findAll();
    res.json(savedResponses);
  } catch (error) {
    console.error('Error fetching SavedResponses:', error);
    res.status(500).json({ error: 'Failed to fetch SavedResponses' });
  }
});

app.delete('/api/deleteResponse/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await SavedResponse.findOne({ where: { id } });
    if (!response) {
      return res.status(404).json({ error: 'SavedResponse not found' });
    }
    await SavedResponse.destroy({ where: { id } });
    res.status(200).json({ message: 'SavedResponse deleted successfully' });
  } catch (error) {
    console.error('Error deleting SavedResponse:', error);
    res.status(500).json({ error: 'Failed to delete SavedResponse' });
  }
});
app.use('/api', router);
app.listen(PORT, () => {
  console.log(`listning to ${PORT}`);

})

