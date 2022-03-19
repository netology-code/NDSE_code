const express = require('express');
const mongoose = require('mongoose');

const errorMiddleware = require('./middleware/error');
const todoApiRouter = require('./routes/api/todo');

const app = express();
app.use(express.json())

app.use('/api/todo', todoApiRouter);

app.use(errorMiddleware);

async function start(PORT, UrlDB) {
    try {
        await mongoose.connect(UrlDB);
        app.listen(PORT)
    } catch (e) {
        console.log(e);
    }
}

const UrlDB = process.env.UrlDB
const PORT = process.env.PORT || 3000;
start(PORT, UrlDB);
