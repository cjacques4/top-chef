var request = require("request");
var cheerio = require("cheerio");
var fs = require('fs');


var results = [];
var data = fs.readFileSync("./JsonResto.json", "utf8");
var restaurant = data.split("\n");
var contents = [];
var idFork = 0;

for (var i = 0; i < restaurant.length - 1; i++) {
  contents[i] = JSON.parse(restaurant[i]);
}

function getIDFork() {
  for (var i = 0; i < contents.length ; i++) {
    let search = contents[i].name;
    search = encodeURIComponent(search);
    var url = "https://m.lafourchette.com/api/restaurant-prediction?name=" + search
    let postalCode = contents[i].postalCode
    request({
      uri: url,
    }, function(error, response, body) {
      const $ = cheerio.load(body);
      results = JSON.parse($.text().trim());
      idFork = getIdResults(postalCode);
      fs.appendFileSync("./IdFork.txt", idFork + "\r\n", null, 'utf8', (err) => {
        if (err) console.log(err)
      });
      // ///  idFork = callback(contents[i].postalCode);
    });
  }
}

function getIdResults(postal_code) {
  for (var i = 0; i < results.length; i++) {
    if (results[i].address.postal_code == postal_code) {
      return results[i].id;
    }
  }
}

getIDFork();