import express from 'express';
import passport from 'passport';
import usersModel from '../db/models/users';

import { Strategy as LocalStrategy } from 'passport-local';


const initPasportAuthorization = () => {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser((id, done) => {
        usersModel.getOne(id)
            .then((userData) => {
                done(null, userData);
            })
            .catch((error) => {
                done(error);
            });
    });

    passport.use('local-signin', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (name, password, done) => {

        console.log('middle ware local-signin', name, password);

        usersModel
            .find({ name })
            .then((userData) => {
                if (!userData || userData.length == 0) {
                    done(null, null);
                    return;
                }

                const user = userData[0];
                if (user.password != password) {
                    done(null, null);
                    return;
                }
                done(null, user);
            })
            .catch((error) => {
                done(error);
            })
    }));
}

initPasportAuthorization();


const authRouter = express.Router();

authRouter.post(`/signin`, (req, res, next) => {

    passport.authenticate('local-signin', (error, user) => {

        if (error) {
            return next(error);
        }

        if (!user) {
            const errorMessage = 'user not found or password is incorrect';
            req.session.messages = [errorMessage];
            return res.send({ isOk: false, error: errorMessage });
        }

        req.logIn(user, (error) => {
            if (error) {
                return next(error);
            }

            req.session.user = {
                id: user.id,
                name: user.name
            }
            return res.send({ isOk: true, data: user.id });
        });
    })(req, res, next);
});

authRouter.post(`/signout`, (req, res) => {
    req.logOut();
    return res.send({ isOk: true, data: true});
});

export default authRouter;