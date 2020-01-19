const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const userRouter = require('./routes/user');
const askRouter = require('./routes/ask');
const asksRouter = require('./routes/asks');
const answerRouter = require('./routes/answer');
const answersRouter = require('./routes/answers');
const likeRouter = require('./routes/like');
const categoryRouter = require('./routes/category');

const app = express();
const port = 5000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    credentials: true,
  }),
);

app.get('/', (req, res) => {
  res.status(200).json('Success');
});

app.use('/user', userRouter);
app.use('/ask', askRouter);
app.use('/asks', asksRouter);
app.use('/answer', answerRouter);
app.use('/answers', answersRouter);
app.use('/like', likeRouter);
app.use('/category', categoryRouter);

app.set('port', port);
app.listen(app.get('port'), () => {
  console.log(`app is listening in PORT ${app.get('port')}`);
});

module.exports = app;
