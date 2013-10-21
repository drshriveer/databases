var mysql = require('mysql');
var q = require('q');

var dbConnection = mysql.createConnection({
  user: "tester",
  password: "test",
  database: "chat",
});
dbConnection.connect();


var init = function(query, cb){
  //GET room_ID
  //make a new user part of a room
  //return final data that is the appriptiate data
  var cb_data= {};  
  getRoomID(query.room, function(data){
    cb_data.room_ID = data;
    var newUserInfo = {'username': query.username, 'room_ID': cb_data.room_ID};
    makeNewUser(newUserInfo, function(data){
      getUserID(query.username, function(data){
        cb_data.user_ID = data;
        cb(cb_data);
      });
    });
  }); 
};

var getMessages = function(room_ID, cb){
  room_ID = room_ID || 1;
  var queryString = 'select * from messages where room_ID = '+room_ID+';';
  return dbConnection.query(queryString, function(err, data){
    if (err) throw err;
    cb(data);
  });
};

var getRoomID = function(chatroom, cb){
  var queryString = 'SELECT * FROM rooms WHERE name=\''+chatroom+'\';';
  return dbConnection.query(queryString, function(err,data){
    if (err) throw err;
    cb(data[0].id);
  });
};

var getUserID = function(username, cb){
  var queryString = 'SELECT * FROM users WHERE username=\''+username+'\';';
  return dbConnection.query(queryString, function(err,data){
    if (err) throw err;
    cb(data[0].id);
  });
};

var makeNewUser = function(newUserInfo, cb){
  var queryString = 'INSERT INTO users SET ?';
  return dbConnection.query(queryString, newUserInfo, function(err,data){
    if (err) throw err;
    cb(data);
  });
}

var postToDB = function(post, cb){
  var queryString = 'INSERT INTO messages SET ?';
  return dbConnection.query(queryString, post, function(err, data){
    if (err) throw err;
    console.log('successfully inserted');
    cb(data);
  });
};

exports.getMessages = getMessages;
exports.getRoomID = getRoomID;
exports.getUserID = getUserID;
exports.postToDB = postToDB;
exports.init = init;
// exports.makeNewUser = makeNewUser;
