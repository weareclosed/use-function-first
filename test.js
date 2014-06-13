var use = require("./use.js");
var assert = require("assert");

var mapFirstTwo = use(function(map, first){
    return map( first (2) );
}, {
    map: function( collection, callback ){
        for(var field in collection){
            callback( collection[field] );
        }
    },
    first: function( items, count ){
        return items.slice(0, count - 1);
    }
});

assert.equal( mapFirstTwo(["123","abc"]), ["12","ab"] );