const router = require('express').Router();
const { Category } = require('../../models');

//create a comment

router.post('/', (req, res) => {
    Category.create({
    category_name: req.body.category_name,
   
})
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });

});





module.exports = router;