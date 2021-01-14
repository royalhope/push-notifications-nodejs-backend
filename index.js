require('dotenv').config();
const express = require('express');
const web_push = require('web-push');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

web_push.setVapidDetails('mailto:umang.u.shahi10@gmail.com', publicVapidKey, privateVapidKey);

app.post('/subscribe', (req, res) => {
    const subscription = req.body;

    res.status(201).json({});

    const payload = JSON.stringify({ title: 'Test' });

    web_push.sendNotification(subscription, payload).catch(error => console.error(error));
});

const port = 3000;

app.listen(port, () => console.log(`Server started on ${port}`));