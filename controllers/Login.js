var request = require('request');
var API_KEY = "AIzaSyCn2xzHsHGjltkOEMJiJHsh8YHA69X69V8";

exports.GetNewIDToken = function (email, password, callback) {
    /*
    curl 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]' \
    -H 'Content-Type: application/json' \
    --data-binary '{"email":"[user@example.com]","password":"[PASSWORD]","returnSecureToken":true}'
    */
    var postData = {};
    postData.email = email;
    postData.password = password;
    postData.returnSecureToken = true;
    var url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + API_KEY;
    var options = {
        method: 'post',
        body: postData,
        json: true,
        url: url
    };
    request(options, function (err, res, body) {
        if (err) {
            console.log('error posting json: ', err);
            throw err;
        }
        callback(body);
    });
};

exports.RefreshToken = function (token, callback) {
    /*
    curl 'https://securetoken.googleapis.com/v1/token?key=[API_KEY]' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    --data 'grant_type=refresh_token&refresh_token=[REFRESH_TOKEN]'
    */

   var postData = {};
   postData.grant_type = 'refresh_token';
   postData.refresh_token = token;
   var url = 'https://securetoken.googleapis.com/v1/token?key=' + API_KEY;
   var options = {
       method: 'post',
       body: postData,
       json: true,
       url: url
   };
   request(options, function (err, res, body) {
       if (err) {
           console.log('error posting json: ', err);
           throw err;
       }
       callback(body);
   });
};

exports.SendVerification = function(token){
    /*
    curl 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/getOobConfirmationCode?key=[API_KEY]' \
    -H 'Content-Type: application/json' \
    --data-binary '{"requestType":"VERIFY_EMAIL","idToken":"[FIREBASE_ID_TOKEN]"}'
    */

   var postData = {};
   postData.requestType = "VERIFY_EMAIL";
   postData.idToken = token;
   var url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/getOobConfirmationCode?key=' + API_KEY;
   var options = {
       method: 'post',
       body: postData,
       json: true,
       url: url
   };
   request(options, function (err, res, body) {
       if (err) {
           console.log('error posting json: ', err);
           throw err;
       }
       callback(body);
   });
};

exports.SignUp = function(email, password, callback) {
    /*
    curl 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]' \
    -H 'Content-Type: application/json' \
    --data-binary '{"email":"[user@example.com]","password":"[PASSWORD]","returnSecureToken":true}'
    */

   var postData = {};
   postData.email = email;
   postData.password = password;
   postData.returnSecureToken = true;
   var url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + API_KEY;
   var options = {
       method: 'post',
       body: postData,
       json: true,
       url: url
   };
   request(options, function (err, res, body) {
       if (err) {
           console.log('error posting json: ', err);
           throw err;
       }
       callback(body);
   });
};

exports.GetUserData = function(token){
    /*
    curl 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=[API_KEY]' \
    -H 'Content-Type: application/json' --data-binary '{"idToken":"[FIREBASE_ID_TOKEN]"}'
    */

   var postData = {};
   postData.idToken = token;
   var url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=' + API_KEY;
   var options = {
       method: 'post',
       body: postData,
       json: true,
       url: url
   };
   request(options, function (err, res, body) {
       if (err) {
           console.log('error posting json: ', err);
           throw err;
       }
       callback(body);
   });
};

exports.SendResetPassword = function(email){
    /*
    curl 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/getOobConfirmationCode?key=[API_KEY]' \
    -H 'Content-Type: application/json' \
    --data-binary '{"requestType":"PASSWORD_RESET","email":"[user@example.com]"}'
    */

   var postData = {};
   postData.requestType = "PASSWORD_RESET";
   postData.email = email;
   var url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/getOobConfirmationCode?key=' + API_KEY;
   var options = {
       method: 'post',
       body: postData,
       json: true,
       url: url
   };
   request(options, function (err, res, body) {
       if (err) {
           console.log('error posting json: ', err);
           throw err;
       }
       callback(body);
   });
};

exports.UpdateUserData = function(token, displayName, photoUrl){
    /*
    curl 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/setAccountInfo?key=[API_KEY]' \
    -H 'Content-Type: application/json' \
    --data-binary \
    '{"idToken":"[ID_TOKEN]","displayName":"[NAME]","photoUrl":"[URL]","returnSecureToken":true, deleteAttribute:"DISPLAY_NAME" or "PHOTO_URL"}'
    */

   var postData = {};
   postData.returnSecureToken = true;
   postData.idToken = token;
   
   if(!displayName) postData.deleteAttribute = "DISPLAY_NAME";
   else postData.displayName = displayName;

   if(!photoUrl) postData.deleteAttribute = "PHOTO_URL";
   else postData.photoUrl = photoUrl;

   var url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/setAccountInfo?key=' + API_KEY;
   var options = {
       method: 'post',
       body: postData,
       json: true,
       url: url
   };
   request(options, function (err, res, body) {
       if (err) {
           console.log('error posting json: ', err);
           throw err;
       }
       callback(body);
   });
};

exports.DeleteAccount = function(token){
    /*
    curl 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/deleteAccount?key=[API_KEY]' \
    -H 'Content-Type: application/json' --data-binary '{"idToken":"[FIREBASE_ID_TOKEN]"}'
    */

   var postData = {};
   postData.idToken = token;
   var url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/deleteAccount?key=' + API_KEY;
   var options = {
       method: 'post',
       body: postData,
       json: true,
       url: url
   };
   request(options, function (err, res, body) {
       if (err) {
           console.log('error posting json: ', err);
           throw err;
       }
       callback(body);
   });
};