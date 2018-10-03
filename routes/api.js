var express = require('express');
var router = express.Router();
var Login = require('../controllers/Login.js');
var multer = require('multer');
var upload = multer({
  dest: __dirname + '../public/uploads/',
  limits: { fileSize: 1000000, files: 1 }
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('404 Girlfriend not found');
});

router.post('/newtoken', function (req, res, next) {
  Login.GetNewIDToken(req.body.email, req.body.password, function (body) {
    res.json(body);
  });
});

router.post('/refresh', function (req, res, next) {
  Login.RefreshToken(req.body.token, function (body) {
    res.json(body);
  });
});

router.post('/signup', function (req, res, next) {
  Login.SignUp(req.body.email, req.body.password, function (body) {
    res.json(body);
  });
});

router.post('/sendverification', function (req, res, next) {
  Login.SendVerification(req.body.token, function (body) {
    res.json(body);
  });
});

router.post('/sendreset', function (req, res, next) {
  Login.SendResetPassword(req.body.token, function (body) {
    res.json(body);
  });
});

router.post('/updateuser', function (req, res, next) {
  Login.UpdateUserData(req.body.token, req.body.displayName, req.body.photoUrl, function (body) {
    res.json(body);
  });
});

router.post('/getuser', function (req, res, next) {
  Login.GetUserData(req.body.token, function (body) {
    res.json(body);
  });
});

router.post('/profile', upload.single('avatar'), function (req, res, next) {
  if (!req.file) {
    return res.json({ 'error': 'error uploading ..' });
  }

  return res.json({
    'success': 'File uploaded sucessfully!.',
    'name': req.file.filename,
    'folder': req.file.destination
  });
});

module.exports = router;
