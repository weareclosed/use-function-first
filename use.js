/**
 * Functional Programming tool to compose data-first/callback-last styled functions.
 * @copyright https://github.com/quadroid/use-function-first/
 */
module.exports = use;

use.curry = curry;
use.functionFirst = functionFirst;

/**
 * Compose, curry and pop up last argument
 * in passed as array (or space-separated string)
 * methods of some object(s).
 */
function use(/** function|string|Array */ what, /** ...object */ fromObject){
    var useFn, useNames;
    var fromObjects = Array.prototype.slice.call(arguments, 1);

    if( typeof what === 'function' ){
        useFn = what;
        useNames = getArgNames( useFn );

    }else if( what instanceof Array ){
        useNames = validateNames( what );

    }else if( typeof what === 'string' ){
        useNames = validateNames( what.split( /\s+/ ) );

    }else throw new TypeError;

    var adaptedFns = adaptMethods( useNames, fromObjects );

    if(!useFn ){
        useFn = composeMethods( useNames, adaptedFns );
    }

    return function composed(){
        return useFn.apply(this, adaptedFns);
    }
}

    function validateNames( names ){
        //todo: names.filter
        throw new Error("todo..");
    }

    function composeMethods( names, object ){
        //todo: return Function( "return " + names.join("(")+ );
        throw new Error("todo...");
    }

    function adaptMethods( names, arrayOfObjects ){
        //console.log(names)
        return names.map( findProperty );

        function findProperty( name ){
            var property;
            arrayOfObjects.map( prepareObject ).some( propertyExist );

            return (typeof property === 'function')? functionFirst(property) : property;

            function prepareObject( object ){
                return ( typeof object === 'function' )? object.prototype : object;
            }

            function propertyExist( obj ){
                if(name in obj){
                    property = obj[ name ];
                    console.log(name, property)
                    return true;
                }
            }
        }
    }
            /** Move last argument to the first place. And curry. */
            function functionFirst( fn ){
                switch( fn.length ){
                    case 0: return fn;
                    case 1: return curry(fn);
                    case 2: return curry(function(a,b){
                        return fn.call(this,      b,a);
                    });
                    case 3: return curry(function(a,b,c){
                        return fn.call(this,      c,a,b);
                    });
                    default:return curry(function(){
                        var last = arguments.length -1;
                        var args = Array.prototype.slice.call(arguments, 0, last -1);
                        args.unshift(arguments[last]);
                        return fn.apply(this, args);
                    });
                }
            }

                /**
                 * Curry a function
                 * @copyright https://github.com/ForbesLindesay/curry/blob/1.0.0/index.js#L12
                 *
                 * @param  {function} fn The function you wish to curry
                 * @return {function}
                 */
                function curry( fn ){
                    return function curried(){
                        if (arguments.length < fn.length) {
                            var args = makeArray(arguments);
                            return function () {
                                return curried.apply(this, args.concat(makeArray(arguments)));
                            }
                        } else {
                            return fn.apply(this, arguments);
                        }
                    };
                }

                    function makeArray(args){
                        return Array.prototype.slice.apply(args);
                    }

    /**
     * Parses a function and returns an array of its parameters
     * @copyright https://github.com/cmtt/dijs/blob/v0.0.2/lib/di.js#L20
     *
     * @param {function()} fn
     * @return {Array.<string>}
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
