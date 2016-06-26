"use strict";

var jade = require( 'pug' );

module.exports = function( templateDir ) {

	return function( req, res, next ) {

		// Was the response sent by the controller?
		if ( res.headersSent ) return;
		if ( req.controller && req.template ) {
			/// If not, render it
			req.controller.req = undefined;
			req.controller.res = undefined;
			req.controller.onrender();
			var locals = JSON.parse( JSON.stringify( req.controller ) ) || {};
			locals.pretty = '  ';
			var content = jade.renderFile( `${templateDir}/${req.template}.pug`, locals );
			res.send( content );
			return;
		}

		next();

	};

};
