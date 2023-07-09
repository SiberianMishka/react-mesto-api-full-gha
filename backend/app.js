require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const parser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const { errorHandler } = require('./middlewares/error-handler');
const { validateSignUp, validateSignIn } = require('./middlewares/validation');
const { createUser, login } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-err');
const auth = require('./middlewares/auth');

const router = require('./routes/index');

const { PORT, BASE_PATH } = process.env;
// const { PORT = 3000, BASE_PATH = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 5 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP, please try again later.',
});

mongoose
  .connect(
    BASE_PATH,
    { useNewUrlParser: true },
  )
  .then(() => console.log(`Connected to DB: ${BASE_PATH}`)) // eslint-disable-line no-console
  .catch((err) => console.log(err)); // eslint-disable-line no-console

// app.use(cors());
// app.use(helmet());
// app.use(limiter);
app.use(parser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validateSignUp, createUser);
app.post('/signin', validateSignIn, login);

app.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

app.use(auth);

app.use(router);

app.use(errorLogger);

app.use((req, res, next) => {
  const err = new NotFoundError('Страница не найдена');
  next(err);
});

app.use(errors());
app.use(errorHandler);

// app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); // eslint-disable-line no-console
});
