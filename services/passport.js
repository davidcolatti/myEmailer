const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	// user.id is the one assigned by mongoDb
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	// pulling the user back out and getting their info from db
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			// checking if the user logged in exists or not
			const existingUser = await User.findOne({ googleId: profile.id });

			if (existingUser) {
				// we already have a record with profile id
				return done(null, existingUser);
			}

			// we dont have a record, make a new user
			const user = await new User({ googleId: profile.id }).save();
			done(null, user);
		}
	)
);
