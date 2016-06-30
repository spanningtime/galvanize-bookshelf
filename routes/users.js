'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

const bcrypt = require('bcrypt');

router.post('/users', (req, res, next) => {
  if (!req.body.email) {
    return res
    .status(400)
    .set('Content-Type', 'text/plain')
    .send('Email must not be blank');
  }
  if (!req.body.password) {
    return res
    .status(400)
    .set('Content-Type', 'text/plain')
    .send('Password must not be blank');
  }
  if ()
  bcrypt.hash(req.body.password, 12, (hashErr, hashed_password) => {
    if (hashErr) {
      return next(hashErr);
    }
    knex('users')
      .insert({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        hashed_password: hashed_password
      })
      .then((user) => {
        res.sendStatus(200)
      })
      .catch((err) => {
        next(err);
      })
  })
});



module.exports = router;
