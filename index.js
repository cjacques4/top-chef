var numberofpages=0;
var request = require("request");
var cheerio = require("cheerio");

request({
  uri: "https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-micheli",
}, function(error, response, body) {
  var $ = cheerio.load(body);

  $(".poi-card-link").each(function() {
    var link = $(this);
    var text = $(this).find(".poi_card-display-title").text();
    var href = link.attr("href");  

    console.log(text + " -> " +"https://restaurant.michelin.fr" +href);
  });
  $(".mr-pager-link").each(function() {
  	var link = $(this);
     if(numberofpages < parseInt(link.attr("attr-page-number"))) {
    	numberofpages = parseInt(link.attr("attr-page-number"));
    }

console.log(numberofpages);
	})
console.log("Nombre de pages : "+numberofpages);
  
});

