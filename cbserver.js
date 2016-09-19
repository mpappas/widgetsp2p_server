var express = require('express');			// ← use express
var app = express();					// ← set express instance
var path = require('path');				// ← setup path service to publish directory

// Just in case
app.use(express.static(path.join(__dirname, 'public')));// ← publish the static public path
require('./routes/routes')(app);			// ← pass the express instance into the routes

app.listen(3000);					// ← express listen on port 3000