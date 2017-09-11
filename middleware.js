var express = require('express');
var app = express();

// .use will serve files from folder without using dirname etc.
// defaults to serve index.html
app.use(express.static('public'));
// cities as objects with descriptions

var cities = {
    'Providence': 'Rhode Island',
    'Boston': 'Massachusetts',
    'New York': 'New York',
    'Silicon City': 'Silicon Road',
    'Bristol': 'Rhode Island, East Bay'
};

// app.param maps placeholders to call back functions
app.param('name', function(request, response, next) {
    var name = request.params.name;
    var city = name[0].toUpperCase() + name.slice(1).toLowerCase();
    
    request.blockName = city;

    next();
});

// Dynamic routes
app.get('/cities/:name', function(request, response) {
    var location = cities[request.blockName];
    // Returns error 404 if 'name' not found
    if (!location) {
        response.status(404).json(request.params.name + ' Not Found');   
    } else {
        response.json(location);    
    }
}); 

// Static route, uses blocks as an array
app.get('/cities', function(request, response) {
    var cities = ['Providence', 'Boston', 'New York', 'Silicon City', 'Bristol'];
    // query string param to limit number of blocks returned
    if (request.query.limit > 0) {
        response.json(cities.slice(0, request.query.limit))
    } else {
        response.json(cities);
    }
});

app.listen(process.env.PORT, function() {
    console.log(process.env.PORT);
});