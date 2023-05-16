const passport = require('passport');

passport.use('local', new LocalStrategy(
  function(username, password, done) {
    // Check if the username and password are correct
    const user = User.findOne({ username });

    if (!user) {
      return done(null, false, { message: 'Incorrect username or password.' });
    }

    if (!user.comparePassword(password)) {
      return done(null, false, { message: 'Incorrect username or password.' });
    }

    // The username and password are correct, log the user in
    return done(null, user);
  }));
