module.exports = use;

var curry = require("curry");

function use(/** function|string|Array */ what, /** ...object */ fromObject){
    var whatFn, whatArray;
    var fromObjects = Array.prototype.slice.apply(arguments, 1);

    if( typeof what === 'function' ){
        whatFn = what;
        whatArray = getArgNames( whatFn );
        
    }else if( what instanceof Array ){
        whatArray = what;
        
    }else{
        
        
    }
    
    var adaptedFns = new Array( whatArray.lenght );
    
    whatArray.forEach(function( name, i ){
        var fn = find(name, fromObject);
        if( fn ){
            adaptedFns[ i ] = adapt( fn );
        }
    });
    
    //whatFn.apply(null, adaptedFns)
    
    function find(id, objects){
        objects.any(function(obj){
            return id in obj;
        });
    }
    
    function adapt( fn ){
        return curry.adapt( fn );
    }
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
