var express = require('express');
var router = express.Router();
var admin = require('firebase-admin');
var async = require('async');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function (req, res, next) {
  var error = "";
  if (req.body.password !== "capedeh123")
    error = "PASSWORD SALAH";
  else
    return res.redirect('/dashboard');

  return res.render('index', { error: error });
});


function listAllUsers(nextPageToken, simplecallback) {
  // List batch of users, 1000 at a time.
  admin.auth().listUsers(1000, nextPageToken)
    .then(function (listUsersResult) {
      var users = [];
      if (listUsersResult.pageToken) {
        listUsersResult.users.forEach(function (userRecord) {
          //console.log("user", userRecord.toJSON());
          users.push(userRecord.toJSON());
        });
        // List next batch of users.
         listAllUsers(listUsersResult.pageToken);
      }
      console.log('total;', users.length);
    })
    .catch(function (error) {
      var users = [];
      console.log("Error listing users:", error);
    });
};

router.get('/dashboard', function (req, res, next) {
   // List batch of users, 1000 at a time.
   admin.auth().listUsers(1000, '1')
   .then(function (listUsersResult) {
     var users = [];
     if (listUsersResult.pageToken) {
       listUsersResult.users.forEach(function (userRecord) {
         //console.log("user", userRecord.toJSON());
         users.push(userRecord.toJSON());
       });

       return res.render('dashboard', { users:  users});
       // List next batch of users.
        //listAllUsers(listUsersResult.pageToken);
     }
   })
   .catch(function (error) {
     var users = [];
     console.log("Error listing users:", error);
     return res.render('dashboard', { users:  users});
   });
});

module.exports = router;