"use strict";

module.exports = function( routes ) {

	var routes = require( routes );

	return function( req, res, next ) {

		var matchedRoute = null;
		var dirs = req.path.split( "/" ).filter( s => s !== '' );

		// Match route
		for ( let key in routes ) {
			var route = routes[ key ];
			var routeParts = key.split( "/" ).filter( s => s !== '' );
			if ( dirs.length === routeParts.length && ( !route.action || req.method.toLowerCase() === route.action.toLowerCase() ) ) {
				var match = true;
				for ( let i in routeParts ) {
					var part = routeParts[ i ];
					// If a url part is set to be a variable in the route, put the value in params
					if ( part.match( /^\:/ ) ) req.params[ part.slice( 1 ) ] = dirs[ i ];
					else if ( part !== dirs[ i ] ) match = false;
				}
				if ( match ) {
					matchedRoute = routes[ key ];
					break;
				}
			}
		}

		if ( matchedRoute ) {
			// Create a controller from this route
			req.controller = new require( `../controllers/${matchedRoute.controller}.js` );
			// Give it the request and response objects
			req.controller.req = req;
			req.controller.res = res;
			// Call the onload method
			req.controller.onload();
			// Call view by default, or the method specified by the route
			if ( !matchedRoute.method ) req.controller.view();
			else if ( typeof req.controller[ matchedRoute.method ] === 'function' ) req.controller[ matchedRoute.method ]();
			else console.warn( `Warning: controller '${matchedRoute.controller}' does not implement the '${matchedRoute.method}' method.` );
			// Set the template for the renderer
			req.template = req.template || matchedRoute.template || matchedRoute.controller + '/' + (matchedRoute.method || 'view');
		}

		next();

	};

};
