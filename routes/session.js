'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt')

router.post('/session', (req, res, next) => {
  knex('users')
    .where('email', req.body.email)
    .first()
    .then((user) => {
      if (!user) {
        return res.sendStatus(401)
      }

      const hashed_password = user.hashed_password;

      bcrypt.compare(req.body.password, hashed_password, (err, isMatch) => {
        if (err) {
          return next(err);
        }

        if (!isMatch) {
          return res.sendStatus(401);
        };

        req.session.user = user;
        res.cookie('loggedIn', true);
        res.sendStatus(200);
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/session', (req, res, next) => {
  req.session = null;
  res.clearCookie('loggedIn');
  res.sendStatus(200);
})


module.exports = router;
