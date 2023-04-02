// const passport2 = require("passport");
// const AzureOAuth2Strategy = require("passport-azure-oauth").Strategy;
// const { Usermodel } = require("../models/user.model");

// const strategy = new AzureOAuth2Strategy(
//   {
//     clientID: "534626ad-2078-46b2-ad19-3fe5e7b409c2",
//     clientSecret: "74c9fb95-f6fd-4b53-ab66-f0b1fb647cff",
//     callbackURL: "https://busy-motion-6100-production.up.railway.app/auth/microsoft/callback",
//     resource: "https://graph.microsoft.com/",
//   },
//   async (accessToken, refreshToken, profile, cb) => {
//     const { name, email, picture } = profile._json;
//     const userData = await Usermodel.find({ email });
//     console.log(userData);
//     if (userData.length) {
//       return cb(null, userData);
//     } else {
//       const newUser = new Usermodel({
//         name,
//         email,
//         picture,
//       });
//       await newUser.save();
//       return cb(null, newUser);
//     }
//   }
// );

// passport2.use(strategy);

// module.exports = { passport2 };
