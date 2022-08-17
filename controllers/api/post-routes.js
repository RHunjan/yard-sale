const router = require('express').Router();
const { Post, User, Comment, Category } = require('../../models');

// get all users
router.get('/', (req, res) => {

  //find all posts  
  Post.findAll({
    attributes: ['id', 'title', 'post_description', 'post_price', 'post_vintage', 'category_id' ,'created_at'],
      order: [['created_at', 'DESC']], 
    include: [
      {
        model: Category,
        attributes: ['category_name']
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
   .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

//find one post
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'title', 'post_description','post_price','post_vintage', 'created_at'],
    include: [
       {
      model: Comment,
      attributes: ['id', 'comment_text', 'created_at'],
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
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create a post
router.post('/', (req, res) => {
  // check the session
  if (req.session) {
    Post.create({
       title: req.body.title,
       post_description: req.body.post_description,
        post_price: req.body.post_price,
   
  
      // use the id from the session
      user_id: req.session.user_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

//update a post
router.put('/:id', (req, res) => {
  Post.update(
    {
      title: req.body.title,
      post_description: req.body.post_description,
      post_vintage: req.body.post_vintage
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Delete a post
router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;