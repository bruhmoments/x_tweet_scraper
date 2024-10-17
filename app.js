const express = require('express');
const { getUserTweets } = require('./services/twitterService');
const { engine } = require('express-handlebars');

const app = express();
const port = 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home', { title: 'Tweet Scrapper' });
});

app.get('/tweets', async (req, res) => {
    const username = req.query.username;
    if (!username) {
        return res.render('home', { title: 'Twitter Scraper', error: 'Please provide a username' });
    }

    const tweets = await getUserTweets(username);
    res.render('tweets', { title: 'User Tweets', username, tweets});
});

app.listen(port, () => {
    console.log(`App is running on https://localhost:${port}`);
});