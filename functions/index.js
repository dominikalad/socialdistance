const functions = require('firebase-functions');

const app = require('express')();

const { getAllScreams, postScream } = require('./handlers/screams');
const { 
    signup, 
    login, 
    uploadImage, 
    addUserDetails, 
    getAuthenticatedUser 
} = require('./handlers/users');

const FBAuth = require('./util/fbAuth');

// Screams routes
app.get('/screams', getAllScreams);
app.post('/scream', FBAuth, postScream);

// User routes
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);

// Auth routes
app.post('/signup', signup);
app.post('/login', login);

exports.api = functions.https.onRequest(app);