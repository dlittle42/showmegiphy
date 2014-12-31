var express = require('express');
var cors = require('cors');
var router = express.Router();
var giphy = require('giphy-wrapper')('dc6zaTOxFJmzC');
var gif = null;

router.use(cors());

/* GET home page. */
router.get('/', function(req, res) {


  var rand = Math.random()*100;

	giphy.search('otters', 10, rand, function (err, data) {
	    if (err) {
	        // check error
	    }

	    // use data, returns the data as an object
	    //console.log(data.keys(id));
	    
	    console.log(JSON.stringify(data, null, 4));
	   // console.log(data.images.fixed_height.url);
	    //var jData = JSON.parse(data);
	    console.log('******************');
	    gif = data.data[0].images.original.url;
	    console.log(gif);
		//callback(null, puppyData);
	});
  res.render('index', { title: 'otter', giphy: gif });
});

router.post('/search',function(req,res){

  console.log(req.body.query);

  var rand = Math.random()*100;

  giphy.search(req.body.query, 10, rand, function (err, data) {
      if (err) {
          // check error
      }

      // use data, returns the data as an object
      //console.log(data.keys(id));
      
    //  console.log(JSON.stringify(data, null, 4));
     // console.log(data.images.fixed_height.url);
      //var jData = JSON.parse(data);
      console.log('******************');
      gif = data.data[0].images.original.url;
      console.log("new gif="+gif);
    //callback(null, puppyData);
  });

  //res.send({ some: JSON.stringify({response:'json' })});
  //res.send({ image: 'http://media3.giphy.com/media/WGYlbVOSxYGJ2/giphy.gif'});
  res.send({ image: gif});
  res.end();

});

/*
app.get('/searching', function(req, res){
  // input value from search
  var val = req.query.search;
  // url used to search yql
  var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20craigslist.search" +
"%20where%20location%3D%22sfbay%22%20and%20type%3D%22jjj%22%20and%20query%3D%22" + val + "%22&format=" +
"json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
      
  requests(url,function(data){
    res.send(data);
  });
});

function requests(url, callback) {
  // request module is used to process the yql url and return the results in JSON format
  request(url, function(err, resp, body) {
    var resultsArray = [];
  body = JSON.parse(body);
  // console.log(body.query.results.RDF.item)
  // logic used to compare search results with the input from user
  if (!body.query.results.RDF.item) {
    results = "No results found. Try again.";
    callback(results);
  } else {
    results = body.query.results.RDF.item;
    for (var i = 0; i < results.length; i++) {
      resultsArray.push(
        {title:results[i].title[0], about:results[i]["about"], desc:results[i]["description"]}
      );
    };
  };
    // pass back the results to client side
    callback(resultsArray);
  });
};
*/
module.exports = router;
