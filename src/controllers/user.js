"use strict";

var Controller = require("../lib/controller");
var user = module.exports = new Controller();

user.show = function() {
	this.id = this.req.params.id;
}

user.test = function() {
	this.res.send("user#test");
}

