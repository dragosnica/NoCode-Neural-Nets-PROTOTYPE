/* eslint-disable consistent-return */
// import '@babel/core';
import 'regenerator-runtime/runtime';
import JWT from 'jsonwebtoken';
import passport from 'passport';
import UserModel from '../db_models/user';
import * as emailRenderers from '../views/email';
import EmailClient from '../lib/emailClient';

const ENV_JWT_SECRET = process.env.JWT_SECRET_TOKEN;

export async function signupUser(req, res, next) {
  const { username, email } = req.body;
  const token = JWT.sign({ username }, ENV_JWT_SECRET, {
    expiresIn: '24h' // 24h
  });
  const user = new UserModel({
    ...req.body,
    verified: UserModel.EmailConfirmation.sent,
    signedToken: token,
    signedTokenExpires: Date.now() + (3600 * 1000 * 24) // 24h
  });
  UserModel.findOne(
    {
      $or: [
        { username },
        { email }
      ]
    }, (userError, existingUser) => {
      if (userError) {
        res.status(500).send({ message: { userError } });
      } else if (existingUser) {
        if (existingUser.username === username) {
          res.status(401).send({ message: { userError: `Username '${username}' already exists !` } });
        } else {
          res.status(401).send({ message: { emailError: `Email address '${email}' already registered !` } });
        }
      } else {
        user.save((userSaveError) => {
          if (userSaveError) {
            res.status(500).send({ message: { userSaveError } });
          }
          req.logIn(user, (signinError) => {
            if (signinError) {
              res.status(500).send({ message: { signinError } });
            }
            const emailOptions = emailRenderers.renderConfirmationEmail({
              body: {
                link: `http://${req.headers.host}/verify?t=${token}`,
                username: req.user.username,
              },
              to: email
            });
            EmailClient.send(emailOptions, (emailError, emailClientRes) => {
              res.json({
                email: req.user.email,
                username: req.user.username,
                verified: req.user.verified,
                id: req.user._id
              });
            });
            res.send(user);
          });
        });
      }
    }
  );
}

export function verifyEmail(req, res) {
  const token = req.query.t;

  UserModel.findOne({ signedToken: token, signedTokenExpires: { $gt: Date.now() } }, (err, user) => {
    if (!user) {
      res.status(401).json({ success: false, message: 'Token is invalid or has expired !' });
      return;
    }

    user.verified = UserModel.EmailConfirmation.verified;
    user.signedToken = null;
    user.signedTokenExpires = null;
    user.save()
      .then((result) => {
        res.redirect('/');
      });
  });
}

export async function signinUser(req, res, next) {
  passport.authenticate('signin', (error, user, info) => {
    try {
      if (error) {
        return next(error);
      }
      if (!user) {
        return res.status(401).send(info);
      }
      req.logIn(user, (signinError) => {
        if (signinError) {
          return next(signinError);
        }
        return res.json({
          email: req.user.email,
          username: req.user.username,
          verified: req.user.verified,
          id: req.user._id
        });
      });
    } catch (catchError) {
      return next(catchError);
    }
  })(req, res, next);
}

export function initiateResetUserPassword(req, res) {
  const { email } = req.body;
  const token = Math.floor(100000 + (Math.random() * 900000));
  UserModel.findOne({ email }, (userError, user) => {
    if (userError) {
      return res.status(500).send({ message: { userError } });
    }
    if (!user) {
      return res.status(401).send({ message: { resetError: 'There is no user registered with that email !' } });
    }
    if (user.verified !== UserModel.EmailConfirmation.verified) {
      return res.status(401).send({ message: { resetError: 'You must verify your email first !' } });
    }
    user.resetPasswordToken = token;
    user.resetPasswordTokenExpires = Date.now() + (3600 * 1000 * 24); // 24h
    user.save((userSaveError, result) => {
      if (userSaveError) {
        return res.status(500).send({ message: { userSaveError } });
      }
      const emailOptions = emailRenderers.renderResetPasswordEmail({
        body: {
          link: `http://${req.headers.host}/new-pw`,
          username: user.username,
          token,
        },
        to: email,
      });
      EmailClient.send(emailOptions, (emailError, emailClientRes) => {
        res.json({
          email: req.body.email,
        });
      });
      return res.send(user);
    });
  });
}

export function updateUserPassword(req, res) {
  const { code, newPassword } = req.body;
  UserModel.findOne({ resetPasswordToken: code, resetPasswordTokenExpires: { $gt: Date.now() } }, (err, user) => {
    if (err) {
      return res.status(500).send({ message: { err } });
    }
    if (!user) {
      return res.status(401).send({ message: { resetCodeError: 'Your code is invalid or has expired !' } });
    }
    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordTokenExpires = null;
    user.save((userSaveError) => {
      if (userSaveError) {
        return res.status(500).send({ message: { userSaveError } });
      }
      req.logIn(user, (signinError) => {
        if (signinError) {
          return res.status(500).send({ message: { signinError } });
        }
        const emailOptions = emailRenderers.renderPasswordChangedEmail({
          body: {
            username: req.user.username,
          },
          to: user.email
        });
        EmailClient.send(emailOptions, (emailError, emailClientRes) => {
          res.json({
            email: req.user.email,
            username: req.user.username,
            id: req.user._id
          });
        });
        return res.send(user);
      });
    });
  });
}

export function getSession(req, res) {
  if (req.user) {
    return res.json({
      email: req.user.email,
      username: req.user.username,
      verified: req.user.verified,
      id: req.user._id
    });
  }
  return res.status(404).send({ message: { sessionError: 'No user logged in' } });
}

export function signoutUser(req, res, next) {
  req.logOut();
  res.json({ success: true });
}

export async function getUsers(req, res, next) {
  try {
    const result = await UserModel.find().exec();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}
