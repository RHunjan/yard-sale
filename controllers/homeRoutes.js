const router = require("express").Router();

router.get('/',(req,res)=>{
    res.render('temp');
})

module.exports = router;