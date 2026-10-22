
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const TOKEN_PATH = path.join(__dirname, 'blogger-token.json');

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:3000/oauth2callback'
);

if (fs.existsSync(TOKEN_PATH)) {
    const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
    oauth2Client.setCredentials(tokens);
}

oauth2Client.on('tokens', (tokens) => {
    let savedTokens = {};

    if (fs.existsSync(TOKEN_PATH)) {
        savedTokens = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
    }

    fs.writeFileSync(
        TOKEN_PATH,
        JSON.stringify({ ...savedTokens, ...tokens }, null, 2)
    );
});

const blogger = google.blogger({
    version: 'v3',
    auth: oauth2Client
});

module.exports = { oauth2Client, blogger };
