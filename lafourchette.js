const request = require('request');

/*const configuration = {
  'uri': 'https://www.lafourchette.com/ville/paris/415144',
  'headers': {
    'cookie' :'datadome=AHrlqAAAAAMAk1KBa1nxjRIALtotww=='
  }
};

request(configuration, (err, response, body) => {
  console.log(body);
});*/
var cheerio = require("cheerio");
var fs = require('fs');


var results = [];
var data = fs.readFileSync("./JsonResto.json", "utf8");
var restaurant = data.split("\n");
var contents = [];
var idFourchette = 0;
var hadDiscount = false;
var promo = [];

for (var i = 0; i < restaurant.length - 1; i++) {
  contents[i] = JSON.parse(restaurant[i]);
}

function getIDFourchette() {
  for (var i = 0; i < contents.length ; i++) {
    let search = contents[i].name;
    let stars = contents[i].stars;
    let city = contents[i].city;
    search = encodeURIComponent(search);
    var url = "https://m.lafourchette.com/api/restaurant-prediction?name=" + search
    let postalCode = contents[i].postalCode
    request({
      uri: url,
    }, function(error, response, body) {
      const $ = cheerio.load(body);
      results = JSON.parse($.text().trim());
      idFourchette = getIdResults(postalCode);
      
      /*fs.appendFileSync("./IdFourchette.txt", idFourchette + "\r\n", null, 'utf8', (err) => {
        if (err) console.log(err)
      });*/
    let tab = [];
      let hasPromo = false; // ///  idFourchette = callback(contents[i].postalCode);
      if (idFourchette != undefined) {
        getDeals(idFourchette, search , stars , city);

      }

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

getIDFourchette();



function getDeals(idFourchette, name, stars , city) {
  let promo = [];
  request({
    uri: "https://m.lafourchette.com/api/restaurant/" + idFourchette + "/sale-type",
  }, function(error, response, body) {
    const $ = cheerio.load(body);
    resultsSales = JSON.parse($.text().trim());
    if (idFourchette != undefined) {
      promo = addDeals(resultsSales, promo);
      if (promo.length != 0) {
        console.log("{IdFourchette : " + idFourchette + "\nName Starred Restaurant : " + name + " \nPromo :" + promo + "}\n");
        restaurant = new Object();
        restaurant.idFourchette = idFourchette;
        restaurant.name = name;
        restaurant.city = city;
        restaurant.promotions = promo;
        restaurant.stars = stars;
        restaurant.link = "https://www.lafourchette.com/restaurant/" + encodeURIComponent(name) + "/" + idFourchette;
        const document = JSON.stringify(restaurant);
        fs.appendFileSync("./RestaurantFourchette.json", document + "\r\n", null, 'utf8', (err) => {
          if (err) console.log(err)
        });
      }
    }
  });
}

function addDeals(resultsSales, promo) {
  for (var i = 0; i < resultsSales.length; i++) {
    if (resultsSales[i]["exclusions"] != "" && resultsSales[i].hasOwnProperty("exclusions") && resultsSales[i]["is_special_offer"] == true) {
      promo.push(resultsSales[i]["title"].trim());
    }
  }
  return promo;
}
