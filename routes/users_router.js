const express = require('express');
const router = express.Router();
const User = require("../models/user")

/* GET users listing. */

router.get('/:userId', function(req, res, next) {
    const { userId } = req.params
    User.findById(userId)
        .populate("paintings")
        .then( (user) => {
            res.status(202).json(user)
            return;
        })
        .catch( (err) => {
            res.status(500).json(err)
            console.log(err)});
});


router.get('/', function(req, res, next) {
  User.find()
  .then( (allUsers) => {
    res.status(202).json(allUsers)
    return;
  })
  .catch( (err) => {
    res.status(500).json(err)
    console.log(err)});
});

module.exports = router;
