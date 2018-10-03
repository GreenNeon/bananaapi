var express = require('express');
var router = express.Router();
var Login = require('../controllers/Login.js');
var multer = require('multer');

var admin = require('firebase-admin');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/public/uploads/');
  },
  filename: function (req, file, cb) {
    var fileObj = {
      "image/png": ".png",
      "image/jpeg": ".jpeg",
      "image/jpg": ".jpg"
    };
    if (fileObj[file.mimetype] == undefined) {
      cb(null, file.fieldname + '-' + Date.now());
    } else {
      cb(null, file.fieldname + '-' + Date.now() + fileObj[file.mimetype]);
    }
  }
});

var upload = multer({
  storage: storage,
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
  if (!req.file || !req.body.uid) {
    return res.json({ 'error': 'error uploading ..' });
  }
  admin.auth().updateUser(req.body.uid, {
    photoURL: "https://kampusbanana.herokuapp.com/uploads/" + req.file.filename,
  })
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully updated user", userRecord.toJSON());
      return res.json({
        'success': 'File uploaded sucessfully!.',
        'name': req.file.filename,
        'folder': req.file.destination,
      });
    })
    .catch(function(error) {
      console.log("Error updating user:", error);
      return res.json({
        'error': 'File uploaded sucessfully! But ERROR!!.',
        'data': error
      });
    });

});

module.exports = router;
