const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Category } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
  Post.findAll({
    attributes: [
      'id',
      'title',
      'post_description',
      'post_price',
      'created_at',
      ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      // pass a single post object into the homepage template
    const posts = dbPostData.map(post => post.get({ plain: true })); 
    res.render('homepage', { posts });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//login page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

//logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }

});

module.exports = router;