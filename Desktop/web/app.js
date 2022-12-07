const express = require('express');
const { NOT_FOUND, UNKNOWN } = require('./config/HttpStatusCodes');
const app = express();

const mongoose = require('./models/database');

const managerRouter = require('./routers/manager.routers');
const authRouter = require('./routers/auth.routers')

const server = app.listen(8000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});

app.use(express.json());

app.use('/manager', managerRouter);
app.use('/auth', authRouter);

module.exports = app;