// backend/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { supabase } = require('./supabaseClient');
const jwt = require('jsonwebtoken');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://backend-3d3x.onrender.com/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists
        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', profile.emails[0].value)
          .single();

        if (error) {
          // If user doesn't exist, create a new user
          const { data, error: insertError } = await supabase
            .from('users')
            .insert([
              {
                name: profile.name.givenName,
                last_name: profile.name.familyName,
                email: profile.emails[0].value,
                username: profile.displayName,
              },
            ]);

          if (insertError) {
            return done(insertError, null);
          }

          return done(null, data[0]);
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser((id, done) => {
  // Find the user by ID in the database
  supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()
    .then(({ data, error }) => {
      if (error) {
        return done(error, null);
      }
      done(null, data);
    });
});

module.exports = passport;
