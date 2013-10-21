var http = require("http");
var url = require('url');
var dbtalk = require('./dbTalker.js')
// var fs = require('fs');
// var requestHandler = require("./request-handler.js");
// var handler = require(__dirname + '/server/request-handler');

var port = 8080;
var ip = "127.0.0.1";
var _chatrooms = {lobby: [{username: "bill", message: "this is dummby data", roomname: "lobby", createdAt: new Date()}]};//{lobby: 'lobby'};


var headers =  {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "content-type": "application/json"
};


var requestListener = function (request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var url_parts = url.parse(request.url, true);

  switch (request.method)
  {
    case 'GET':
      console.log('------------------------------------------');
      console.log(url_parts.query);
      console.log('------------------------------------------');
      handleGet(request, response, url_parts.query);
      break; 
    case 'POST':
      handlePost(request, response, url_parts.query);
      break;
    case 'OPTIONS':
      response.writeHead(200, headers);
      response.end();
      break; 
    default:
      response.writeHead(404, headers);
      response.end();
      break;
  }

};


//
//  ---------- GET Request Method Handlers ---------------------
//

  //room_ID should be passed in getFromDB however
  // currently chatroom is a string not connected to ID
  // to fix in refactor
var handleGet = function(request, response, query) {

  switch (query.opts){
    case 'initialize':
        
      dbtalk.init(query, function(data){
        //data needs to return 
        respondToGet(response, data);
      });
      break;
    case 'get messages':
      dbtalk.getMessages(query.room_ID, function(data){
        respondToGet(response, data);
      });
      break;
    case 'update username':
      break;
    case 'change room':
      break;
    default:
      response.writeHead(404, headers);
      response.end();
      break;
  }
};

var respondToGet = function(response, data){
  response.writeHead(200, headers);
  response.end(JSON.stringify( data ));
};



//this is a test
//
//  ---------- POST Request Method Handlers ---------------------
//
var handlePost = function(request, response, query) {
  var body = "";
  request.on('data', function(data){
    body += data;
  });
  request.on('end', function(){
    var POST = JSON.parse(body);
    POST.createdAt = new Date();
    console.log("this is what we POST: ", POST);
    //need POST to reflect {user_ID, room_ID, content, createdAt}
    dbtalk.postToDB(POST, function(data){
      respondToPost(response, data);
    });

  });
};

var respondToPost = function(response, data){
  data = data || 'successful post';
  response.writeHead(201, headers);
  response.end(JSON.stringify( data ));
};

// ---------- this starts the server after everything is initalized
var server = http.createServer(requestListener);
server.listen(port, ip);



