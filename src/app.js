"use strict";

var express = require( "express" );
var router = require("./lib/router.js");
var renderer = require("./lib/renderer.js");

var HTTP_PORT = process.env.PORT || 80;
var ASSET_DIR = __dirname + "/assets";
var TEMPLATE_DIR = __dirname + "/templates";
var ROUTES = __dirname + "/routes.json";

// Start express server
var app = express();
var expressServer = app.listen( HTTP_PORT, () => console.log(`Server listening on port ${HTTP_PORT}`) );

// Force trailing slashes
app.use( (req, res, next) => {
	var parts = req.url.split('?');
	var params = parts.length > 1 ? '?'+parts[1] : '';
	var lastDir = req.path.split( "/" ).slice( -1 )[ 0 ];
	if ( lastDir && lastDir.indexOf( "." ) < 0 && lastDir.slice( -1 ) !== "/" ) {
		res.redirect( 302, req.path + "/" + params );
		return;
	}
	next();
} );

// Route requests to controllers
app.use( router( ROUTES ) );

// Render controller data to a view template and send the response
app.use( renderer( TEMPLATE_DIR ) );

// Serve static assets
app.use( express.static( ASSET_DIR, { index: false, maxAge: 1 } ) );

// Handle anything else as 404
app.use( (req, res, next) => res.status( 404 ).send("todo: 404 page") );


