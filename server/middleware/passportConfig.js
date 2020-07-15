import LocalPassport from 'passport-local';
import UserModel from '../db_models/user';

// export default function initializePassport(passport) {
//   const LocalStrategy = LocalPassport.Strategy;
//   passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
//     UserModel.findByUsernameOrEmail(email.toLowerCase())
//       .then((user) => { // eslint-disable-line consistent-return
//         if (!user) {
//           return done(null, false, { msg: `Email ${email} not found.` });
//         }
//         user.isPasswordCorrect(password, (innerErr, isMatch) => {
//           if (isMatch) {
//             return done(null, user);
//           }
//           return done(null, false, { msg: 'Invalid email or password.' });
//         });
//       })
//       .catch((err) => done(null, false, { msg: err }));
//   }));
// }

// export default function initializePassport(passport) {
//   passport.serializeUser((user, done) => done(null, user.id));
//   passport.deserializeUser((id, done) => {
//     UserModel.findById(id, (error, user) => {
//       done(error, user);
//     });
//   });

//   const LocalStrategy = LocalPassport.Strategy;
//   const authenticateUser = (username, password, done) => {
//     // eslint-disable-next-line consistent-return
//     UserModel.findOne({ username }, (error, user) => {
//       if (error) {
//         return done(error);
//       }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username' });
//       }
//       user.isPasswordCorrect(password, (pwError, same) => {
//         if (pwError) {
//           console.log('pwError');
//           console.log(pwError);
//           return done(null, false, { message: pwError });
//         } if (!same) {
//           console.log('Pw is incorrect');
//           return done(null, false, { message: 'The password is incorrect' });
//         }
//         return done(null, user);
//       });
//     });
//     // UserModel.findByUsernameOrEmail(email.toLowerCase())
//     //   // eslint-disable-next-line consistent-return
//     //   .then((user) => {
//     //     if (!user) {
//     //       console.log('Email not found');
//     //       return done(null, false, { message: `Email ${email} not found.` });
//     //     }
//     //     user.isPasswordCorrect(password, (pwError, same) => {
//     //       if (pwError) {
//     //         console.log('pwError');
//     //         console.log(pwError);
//     //         return done(null, false, { message: pwError });
//     //       } if (!same) {
//     //         console.log('Pw is incorrect');
//     //         return done(null, false, { message: 'The password is incorrect' });
//     //       }
//     //       return done(null, user);
//     //     });
//     //   })
//     //   .catch((error) => {
//     //     console.log('error');
//     //     console.log(error);
//     //     done(null, false, { message: error });
//     //   });
//   };
//   passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));
// }

export default function initializePassport(passport) {
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    UserModel.findById(id, (error, user) => {
      done(error, user);
    });
  });

  const LocalStrategy = LocalPassport.Strategy;

  const authenticateUser = (username, password, done) => {
    UserModel.findByUsernameOrEmail(username)
      // eslint-disable-next-line consistent-return
      .then((user) => {
        if (!user) {
          return done(null, false, { message: { userError: 'User does not exist !' } });
        }
        user.isPasswordCorrect(password, (pwError, same) => {
          if (pwError) {
            console.log('pwError');
            console.log(pwError);
            return done(pwError);
          } if (!same) {
            console.log('Pw is incorrect');
            return done(null, false, { message: { pwError: 'The password is incorrect' } });
          }
          return done(null, user, { message: 'Signed in successfully !' });
        });
      });
  };

  passport.use('signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  }, authenticateUser));
}
