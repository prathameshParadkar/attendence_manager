const User = require('../models/user');

class UserController {
    static getRegister(req, res) {
        res.render('users/register');
    }

    static async postRegister(req, res) {
        try {
            const { username, password } = req.body;
            const user = new User({ username });
            const registeredUser = await User.register(user, password);
            req.login(registeredUser, (err) => {
                if (err) return next(err);
                req.flash('success', 'Welcome to attendance');
                res.redirect('/lecture');
            });
        } catch (e) {
            req.flash('error', e.message);
            res.redirect('register');
        }
    }

    static getLogin(req, res) {
        res.render('users/login');
    }

    static postLogin(req, res) {
        req.flash('success', 'Welcome back');
        const redirectUrl = res.locals.returnTo || '/lecture';
        res.redirect(redirectUrl);
    }
}

module.exports = UserController;
