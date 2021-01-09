const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();

admin.initializeApp();

const firebaseConfig = {
    apiKey: "AIzaSyDuFYOSvz6hsFv1CHWAmo5QCRF904T302M",
    authDomain: "socialdistance-78857.firebaseapp.com",
    databaseURL: "https://socialdistance-78857-default-rtdb.firebaseio.com",
    projectId: "socialdistance-78857",
    storageBucket: "socialdistance-78857.appspot.com",
    messagingSenderId: "94021794240",
    appId: "1:94021794240:web:9a2648b1fbc233b1793025",
    measurementId: "G-7MK12Q84KG"
  };

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

app.get('/screams', (req, res) => {
    db
        .collection('screams')
        .orderBy('createdAt', 'desc')
        .get()
        .then(data => {
            let screams = [];
            data.forEach(doc => {
                screams.push({
                    screamId: doc.id,
                    ...doc.data()
                });
            })
            return res.json(screams);
        })
        .catch(err => console.error(err))
})

app.post('/scream', (req, res) => {
    const newScream = {
        body: req.body.body,
        userHndle: req.body.userHandle,
        createdAt: new Date().toISOString()
    };

    db
        .collection('screams')
        .add(newScream)
        .then(doc => {
            res.json({ message: `document ${doc.id} created succesfully!`});
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong'});
            console.error(err)
        })
})

//Signup
let token, userId;
app.post('/signup', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    }

    db
        .doc(`/users/${newUser.handle}`)
        .get()
        .then(doc => {
            if (doc.exists) {
                return res.status(400).json({ handle: 'this handle is already taken' });
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password)
            }
        })
        .then(data => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then(tokenId => {
            token = tokenId;
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId
            };
            return db.doc(`/users/${newUser.handle}`).set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({ token });
        })
        .catch(err => {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                return res.status(400).json({ email: 'Email is already in use' });
            } else {
                return res.status(500).json({ error: err.code });
            }
        })
})

exports.api = functions.https.onRequest(app);