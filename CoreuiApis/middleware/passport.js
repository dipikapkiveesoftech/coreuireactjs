const User = require("D:/nishi/kiveesoftechproject/Nodejsproject/CoreuiApis/appmodels/user.js");
const { Strategy } = require("passport-jwt");
module.exports = passport => {
    passport.use(
      new Strategy(opts, async (payload, done) => {
        await User.findById(payload.userId)
          .then(user => {
            if (user) {
              console.log("ert");
              return done(null, user);            
            }
            console.log("dgfg");
            return done(null, false);
          })
          .catch(err => {
            console.log("sdf");
            return done(null, false);
          });
      })
    );
  };