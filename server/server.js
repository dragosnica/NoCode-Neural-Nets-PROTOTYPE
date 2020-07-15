import express from 'express';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';
import renderIndexHTML from './views/index';
import userRouter from './routes/user.routes';
import projectRouter from './routes/project.routes';
import initializePassport from './middleware/passportConfig';
import * as middlewares from './middleware/middlewares';

dotenv.config();
const ENV_SESSION_SECRET = process.env.SESSION_SECRET_TOKEN;
const ENV_MONGODB_URL = process.env.MONGODB_URL;
const ENV_PORT = process.env.PORT;

const app = express();
app.get('/health', (req, res) => res.json({ success: true }));
const MongoStore = connectMongo(session);

mongoose.connect(ENV_MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(session({
  secret: ENV_SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  proxy: true,
  name: 'sessionId',
  cookie: {
    httpOnly: true,
    secure: false,
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

app.use(express.static('build'));
app.use(express.json());

app.use('/api', userRouter);
app.use('/api', projectRouter);

app.get('/*', (req, res) => {
  res.send(renderIndexHTML(req));
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = ENV_PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port} 🐝`);
});
