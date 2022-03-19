const express = require('express');

const logger = require('./middleware/logger')
const error404 = require('./middleware/err-404')
const indexRouter = require('./routes/index')
const demoRouter = require('./routes/demo')

const app = express();

app.use(logger)

app.use('/public', express.static(__dirname+'/public'))
app.use('/', indexRouter)
app.use('/demo', demoRouter)

app.use(error404)

const PORT = process.env.PORT || 3000;
app.listen(PORT);
