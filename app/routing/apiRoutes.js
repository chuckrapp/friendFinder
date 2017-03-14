var friendsData = require("../data/friends");

module.exports = function (app) {
  app.get("/api/friends", function (req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function (req, res) {
    var currentMatchScore = 100;
    var currentMatch = {};
    var userInfo = req.body;
    var absValSum = 0;
    var absValArray = [];

    function compareFriends(newUser, storedUser) {
      for (var i = 0; i < newUser.scores.length; i++) {
        absValArray.push(Math.abs(newUser.scores[i] - storedUser.scores[i]));
      }
      console.log("absValArray: " + absValArray);
      absValSum = absValArray.reduce(function (acc, val) {
        return acc + val;
      }, 0)
      absValArray = [];
      console.log("absValSum: " + absValSum);
      console.log("currentMatchScore: " + currentMatchScore);
    }

    for (var i = 0; i < friendsData.length; i++) {
      compareFriends(userInfo, friendsData[i]);
      console.log(userInfo.scores + " || " + friendsData[i].scores);
      if (absValSum < currentMatchScore) {
        currentMatchScore = absValSum;
        currentMatch = friendsData[i];
      }
      console.log("new currentMatchScore: " + currentMatchScore);
      console.log("curentMatch: " + currentMatch.name);
      // currentMatchScore = 100;
    }

    
    
    //handle incoming survey results
    friendsData.push(req.body);
    // console.log(req)
    res.json(currentMatch);
  })
}
