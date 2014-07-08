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








var composeFn = require('shellfy');


var filterFiles = composeFn(
    'readdir filter filesOnly',
    require('fs'),
    Array,
    {filesOnly: function( fileName, callback ){

    }}
);





var fs = require('fs')
var async = require('async')
var path = require('path')

module.exports = function (dir, cb) {
    async.waterfall([ // [1]
        function (next) {
            fs.readdir(dir, next)
        },
        function (files, next) {
            var paths =
                files.map(function (file) { return path.join(dir,file) })
            async.map(paths, fs.stat, function (er, stats) { // [2]
                next(er, files, stats)
            })
        },
        function (files, stats, next) {
            var largest = stats
                .filter(function (stat) { return stat.isFile() })
                .reduce(function (prev, next) {
                    if (prev.size > next.size) return prev
                    return next
                })
            next(null, files[stats.indexOf(largest)])
        }
    ], cb) // [3]
}


module.exports = composeFn(
    // summary:
    "readdir @dir | (er, files) map | _by join @dir > stat | (files) filter _by 'isFile' 'method' > reduce _by max 'size' > @callback",
    "readdir @dir | map (dirs) | BY join @dir > stat (files) | filter BY 'isFile' 'method' > reduce BY max 'size'",
    "readdir @dir | map (dirs) | BY join @dir > stat (files) | filterBiggestFile",
    [
    // sub-functions:
        {
            filterBiggestFile: ["filter BY 'isFile' 'method' > reduce BY max 'size'", [Array.prototype, Math]]
        },
    // imports:
        fs, Array.prototype, Math,
    ],
    // additional features:
    {
        checkErrors: {
            before: [function readdir(dir, err){

            }],
            after: []
        }
    },
    function logging(before, after){
        before('readdir', function(dir){

        });
        before('*', function(){

        });
    }
);






var fs = require('fs');
var path = require('path');

module.exports = function (dir, cb) {
    fs.readdir(dir, function (er, files) { // [1]
        if (er) return cb(er);
        var counter = files.length;
        var errored = false;
        var stats = [];

        files.forEach(function (file, index) {
            fs.stat(path.join(dir,file), function (er, stat) { // [2]
                if (errored) return;
                if (er) {
                    errored = true;
                    return cb(er)
                }
                stats[index] = stat; // [3]

                if (--counter == 0) { // [4]
                    var largest = stats
                        .filter(function (stat) { return stat.isFile() }) // [5]
                        .reduce(function (prev, next) { // [6]
                            if (prev.size > next.size) return prev;
                            return next
                        });
                    cb(null, files[stats.indexOf(largest)]); // [7]
                }
            })
        })
    })
};

// max(by('size'))
use("readdir :dir | checkError, forEach | filter _by 'isFile' 'method' | reduce _by max 'size'",
    fs, Array, Math,
    {
        checkError: function(err, callback){
            this.dir;
            return err && callback(err);
        },

        _by: function(/** function= */fn, /** string */ name, /** 'property'|'method'|='property' */type ){
            var call = (type === 'method');
            if( fn )
                return function( obj ){

                };
            else if( call )
                return function( obj ){
                    return obj[ name ]();
                };
            else
                return function( obj ){
                    return obj[ name ];
                };
        }
    }
);

use(function(){
        function checkError(err, callback){
            return err && callback(err);
        }
    },
    fs, Array
);