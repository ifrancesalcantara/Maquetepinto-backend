const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/user');

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require('../helpers/middlewares');


// POST '/auth/signup'
router.post('/signup', isNotLoggedIn, validationLoggin, async (req, res, next) => {

  const { username, password } = req.body;
  
  try {
    const usernameExists = await User.findOne({ username }, 'username');

    if (usernameExists)  {
      return next(createError(400, "Username already exists"));
    }
    else {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = await User.create({ username, password: hashPass });
      req.session.currentUser = newUser;

      res
        .status(201)      // Created
        .json(newUser);               // res.send( JSON.stringify(newUser) )
    }


  } catch(err) {
    next(err);
  } 

})



// POST '/auth/login'
router.post('/login', isNotLoggedIn, validationLoggin, async (req, res, next) => {
  
    const { username, password } = req.body;
    
    try {
      const user = await User.findOne({ username });
      
      if (!user) {
        next(createError(404)); // Not found
      }
      else if ( bcrypt.compareSync(password, user.password ) ) {
        req.session.currentUser = user;
  
        res
          .status(200)
          .json(user);
      }
      else {
        next(createError(401)); // Unauthorized
      }
  
    }
    catch(err) {
      next();
    }
  
  })


// POST '/auth/logout'
router.post('/logout', isLoggedIn, (req, res, next) => {
  req.session.destroy();

  res
    .status(204) // No content
    .send()
})

// // GET '/auth/me'
router.get('/me', isLoggedIn, (req, res, next) => {
  //Doesn't really change object
  req.session.currentUser.password = "*";
  res
    .status(200)
    .json(req.session.currentUser)
})
// //  - check if the user IS logged in using helper function (check if session exists)
// //  - if yes, send the response with user info (available on req.session.currentUser)


// GET '/auth/private'   --> Only for testing - Same as /me but it returns a message instead
router.get('/private', isLoggedIn, (req, res, next) => {
  res
    .status(200)
    .json({ message: 'Test - Private route!!!!' })
})


module.exports = router;