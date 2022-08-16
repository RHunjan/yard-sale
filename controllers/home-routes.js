const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Category } = require('../models');

//git all posts
router.get('/', (req, res) => {
    console.log(req.session);
  // Post.findAll({
  //   attributes: [
  //     'id',
  //     'title',
  //     'post_description',
  //     'post_price',
  //     'created_at',
  //     ],
  //   include: [
  //     {
  //       model: Comment,
  //       attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
  //       include: {
  //         model: User,
  //         attributes: ['username']
  //       }
  //     },
  //     {
  //       model: User,
  //       attributes: ['username']
  //     }
  //   ]
  // })
  //   .then(dbPostData => {
  //     // pass a single post object into the homepage template
  //   const posts = dbPostData.map(post => post.get({ plain: true })); 
  //   res.render('homepage', { posts });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
  res.render('landing',{
    loggedIn: req.session.loggedIn
  });
});

router.get('/homepage', (req, res) => {
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
  res.render('homepage', { posts, loggedIn: req.session.loggedIn });
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

  res.render('login',{
    loggedIn: req.session.loggedIn
  });
});

//single post
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'post_description',
      'post_price',
      'category_id'
    
    ],
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name']
      },
       
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
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render('single-post', { post, loggedIn:req.session.loggedIn });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//add new iten
router.get('/newitem', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('newitem',{
    loggedIn: req.session.loggedIn
  });
});

module.exports = router;