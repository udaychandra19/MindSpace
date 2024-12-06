const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Sentiment = require('sentiment');
const cors = require('cors');
const bcrypt = require('bcrypt');
const spamdetector = require('spam-filter');

const app = express();
const port = 5000;
const saltRounds = 16;

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

mongoose.connect('mongodb://localhost:27017/login', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your-secret-key';

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});
const User = mongoose.model('User', userSchema);

const commentSchema = new mongoose.Schema({
    newsId: String,
    text: String,
    sentiment: String
});
const Comment = mongoose.model('Comment', commentSchema);

const sentimentAnalyzer = new Sentiment();
const spam = new spamdetector();

app.post('/comment', async (req, res) => {
    const { newsId, text } = req.body;
    try {
        if (!text) {
            return res.status(400).json({ error: 'Missing text in request body' });
        }
        const spammed = spam.isSpam(text);
        if (spammed) {
            return res.status(200).json({ message: "Spam Comment", spammed });
        }
        const sentimentResult = sentimentAnalyzer.analyze(text);
        const sentimentScore = sentimentResult.score;
        const sentiment = sentimentScore > 0 ? 'Positive' : sentimentScore < 0 ? 'Negative' : 'Neutral';
        const comment = new Comment({ newsId, text, sentiment });
        await comment.save();
        res.status(200).json({ message: "Comment saved successfully", sentiment });
    } catch (error) {
        console.error('Sentiment analysis error:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (username.length <= 0 || email.length <= 0 || password.length <= 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        if (!email.includes("@gmail.com")) {
            return res.status(400).json({ error: 'Invalid Email Address' })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/reset', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || password.length <= 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || password.length <= 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '24h' });
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/delete', async (req, res) => {
    const { username } = req.query;
    if (!username) {
        return res.status(400).json({ error: "Invalid Username" });
    }
    try {
        const result = await User.deleteOne({ username: username.toString() });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Account Not Found" });
        }
        res.status(200).json({ message: "Account Deleted Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/info', async (req, res) => {
    try {
        const { username } = req.query;
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            message: "Successful Retrieval of info",
            name: user.username,
            email: user.email
        });

    } catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
