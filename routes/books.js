'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/books', (req, res, next) => {
  knex('books')
  .orderBy('id')
  .then((books) => {
    res.send(books);
  })
  .catch((err) => {
    next(err);
  });
});

router.get('/books/:id', (req, res, next) => {
  knex('books')
    .where('id', Number.parseInt(req.params.id))
    .first()
    .then((book) => {
      if (!book) {
        return next();
      }
      res.send(book);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/books', (req, res, next) => {
  knex('authors')
    .where('id', req.body.author_id)
    .first()
    .then((author) => {
      if (!author) {
        return res
        .status(400)
        .set('Content-Type', 'text/plain')
        .send('author_id does not exist');
      }

      return knex('books')
        .insert(req.body, '*')
        .then ((results) => {
          res.send(results[0]);
        })
      })
        .catch((err) => {
          next(err);
    });
});

router.patch('/books/:id', (req, res, next) => {
  knex('books')
    .where('id', req.params.id)
    .update(req.body, '*')
    .then((books) => {
      res.send(books[0])
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/books/:id', (req, res, next) => {
  knex('books')
    .where('id', req.params.id)
    .del()
    .then((book) => {
      delete book.id
      res.send(book[0])
    .catch((err) => {
      next(err);
    })
  })
})

module.exports = router;
