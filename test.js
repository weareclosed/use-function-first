var use = require("./use.js");
var assert = require("assert");

var mapFirstTwo = use(function(map, first){
    console.log(  map( first (2))(["111","222","333"])  )
    return map( first (2) );
}, {
    map: function( collection, callback ){
        for(var field in collection){
            callback( collection[field] );
        }
    },
    first: function( items, count ){
        return items.slice(0, count);
    }
});

assert.equal(
    mapFirstTwo(["123","abc"]).toString(),
    ["12","ab"].toString()
);