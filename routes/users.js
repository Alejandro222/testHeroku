var express = require('express');
var router = express.Router();
var models = require('../models');

var criteria = function(req) {
  return { where: {id: req.params.id} };
}
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.format({
      json: function () {
        models.users.findAll().then(users => {
          res.json({ users: users });
        });
      },
      html: function () {
        models.users.all().then(users => {
          res.render('users/index', { users: users });
        });
      }
    });
});

router.get('/new', function(req, res, next) {
  res.render('users/new');
});


router.post('/', function (req, res, next) {
  var user = models.users.create(req.body);
  res.format({
    json: function () {
      user.then(user => {
        res.json(user);
      });
    },
    html: function () {
      user.then(user => {
        res.redirect('/users');
      });
    }
  })
});

router.delete('/:id', function (req, res, next) {
    res.format({
      json: function () {
        models.users.destroy(criteria(req)).then(() => {
          res.json({ status: 'ok' });
        });
      },
      html: function () {
        models.users.destroy(criteria(req)).then(() => {
          res.redirect('/users');
        });
      }
    });
});

router.put('/:id', function (req, res, next) {
    res.format({
      json: function () {
        models.users.update(req.body, criteria(req)).then(user => {
          res.json(user);
        });
      },
      html: function () {
        models.users.update(req.body, criteria(req)).then(user => {
          res.redirect('/users');
        });
      }
    });
});

module.exports = router;
