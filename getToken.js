const { google } = require('googleapis');
const readline = require('readline');

const CLIENT_ID = '829510098770-5slfdhi37aam6bc4prv715abthtjndud.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://49f4e4bd-8acb-4403-a900-bfd7c405e113-00-1kfduz3d44fui.riker.replit.dev/oauth2callback';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/gmail.send']
});

console.log('Authorize this app by visiting this url:', authUrl);

rl.question('Enter the code from that page here: ', (code) => {
  oAuth2Client.getToken(code, (err, token) => {
    if (err) return console.error('Error retrieving access token', err);
    console.log('Token:', token);
    rl.close();
  });
});
