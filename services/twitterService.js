const axios = require('axios');
const { query } = require('express');

require('dotenv').config()

const twitterBearerToken = process.env.TWITTER_BEARER_TOKEN

const twitterService = axios.create({
    baseURL: 'https://api.twitter.com/2/',
    headers: {
        'Authorization': `Bearer ${twitterBearerToken}`
    }
});


// Can't work on free tier

// async function getUserTweets(username) {
//     try {
//         const userResponse = await twitterService.get(`users/by/username/${username}`);
//         const userId = userResponse.data.data.id;

//         const tweetsResponse = await twitterService.get(`users/${userId}/tweets`);
//         return tweetsResponse.data.data;
//     } catch (error) {
//         console.error('Error fecthing tweets:', error);
//         return [];
//     }
// }

async function getUserTweets(username) {
    try {
        const searchResponse = await twitterService.get(`tweets/search/recent`, {
            params: { query: `from:${username}`, max_results: 10 }
        });
        return searchResponse.data.data;
    } catch (error) {
        console.error('Error fecthing tweets:', error);
        return [];
    }
}

module.exports = { getUserTweets };