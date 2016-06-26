"use strict";

var Controller = require("../lib/controller");
var homepage = module.exports = new Controller();

homepage.view = function() {
	// this.req gets set to the express req object so we can easily retrieve data 
	console.log( "main view was called! params: " + this.req.params );
	this.title = "MVC Page Title";
	this.testContent = "This is the page body";
};

homepage.custom = function() {
	// this.res gets set to the express res objecct so we can send custom responses
	this.res.send("Custom response");
	return;
};

homepage.testingtesting = function() {
	// We can use a custom template by changing req.template
	this.req.template = "testing";
};
