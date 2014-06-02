module.exports = pipe;

var curry = require("curry");

function pipe(/** function|string|Array */ what, /** ...object */ fromObject){
    var whatFn, whatArray;
    var fromObjects = Array.prototype.slice.apply(arguments, 1);

    if( typeof what === 'function' ){
        whatFn = what;
        whatArray = getArgNames( whatFn );

    }else if( what instanceof Array ){
        whatArray = what;

    }else if( typeof what === 'string' ){
        whatArray = what.split( /\s+/ );
    }

    var adaptedFns = adaptFns( whatArray, fromObjects );

    if(!whatFn ){
        whatFn = makeFnFromMethodNames( whatArray, adaptedFns );
    }

    return curry( function(){
        return whatFn.apply(this, adaptedFns);
    } );
}

function makeFnFromMethodNames( methodNames, lib ){


}

function adaptFns( whatArray, fromObjects ){

    var adaptedFns = new Array( whatArray.lenght );

    whatArray.forEach(function( name, i ){
        var fn = find(name, fromObjects);
        if( fn ){
            adaptedFns[ i ] = adapt( fn );
        }
    });

    return adaptedFns;
}

function find(id, objects){
    return objects.any(function(obj){
        var fn = obj[ id ];
        if(typeof fn === 'function'){
            fn = fn.protoype;
        }
        return fn;
    });
}

function adapt( fn ){
    return curry.adapt( fn );
}

/**
 * Parses a function and returns an array of its parameters
 * @param {function()} fn
 * @return {Array.<string>}
 * (C) https://github.com/cmtt/dijs/blob/v0.0.2/lib/di.js#L20
 */
function getArgNames(fn) {
    var fnRgx = /function(\s*)(\w*)[^(]*\(([^)]*)\)/m;
    var s = fn.toString();
    var matches = fnRgx.exec(s);
    var params = [];
    if (!matches) return null;
    if (matches[3].length) params = matches[3].split(/\s*,\s*/);
    return params;
}
