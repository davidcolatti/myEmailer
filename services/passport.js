const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			// checking if the user logged in exists or not
			User.findOne({ googleId: profile.id }).then((existingUser) => {
				if (existingUser) {
					// we already have a record with profile id
				} else {
					// we dont have a record, make a new user
					new User({ googleId: profile.id }).save();
				}
			});
		}
	)
);
