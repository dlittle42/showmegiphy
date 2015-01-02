var fs = require('fs');

// Ssl license 
var keyPath = './ssl/yourkey.pem';
 var certPath = './ssl/yourcert.pem';

 var hskey = fs.readFileSync(keyPath);
 var hscert = fs.readFileSync(certPath);

 var options = {
     key: hskey,
     cert: hscert
 };

 // Ssl object 
  var ssl = {};
  ssl.options = options;

module.exports = ssl;