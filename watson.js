// Include necessary libraries
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var bodyParser = require('body-parser');
var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

app.use(express.static(__dirname + '/'));

// body parser is used to parse the incoming url given by the user
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Send the data to the client 
app.post('/send', function(req, res){

    // grab the image url
    var image = req.body;
    var imgURL = image.imageFile;
    //console.log(image.imageFile);
    imgRecognize(imgURL);

        // IBM Watson API
    function imgRecognize(imgURL) {
      var visualRecognition = new VisualRecognitionV3({
        version: '2018-03-19',
        iam_apikey: 'jDfPRdIk0HGQMS6s-owoiOkIimy-hG-IBwWPQzTzY4gv'
      });
      
      var url = imgURL;
      //console.log(url);
      // this defines the category of classifiers to apply, in this case its the IBM default general classifier
      var owners = ["IBM"];
      // this is the minimum score a class must have to be displayed in the response
      var threshold = 0.5;
      
      var params = {
        url: url,
        owners: owners,
        threshold: threshold
      };
      
    // classify the given image in the url   
    visualRecognition.classify(params, function(err, response) {
        if (err)
          console.log(err);
        else
          //console.log(JSON.stringify(response, null, 2))
          var result = JSON.stringify(response, null, 2)
          console.log(result);
          // send the results to the client
          res.send(result);
      });
    }
});

// Local server setup
server.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0", function () {
    var addr = server.address();
    console.log("Our server is listening at", addr.address + ":" + addr.port);
});




