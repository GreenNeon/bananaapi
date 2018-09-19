var express = require('express');
var router = express.Router();
var Login = require('../controllers/Login.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/newtoken', function(req, res, next){
  Login.GetNewIDToken("robertusyudo@gmail.com","123456", function(body){
    Login.RefreshToken(body.refreshToken, function(rebody){
      res.json(rebody);
    });
  });
});
module.exports = router;
