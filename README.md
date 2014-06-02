Data last, callback first
-------------------------

https://thenewcircle.com/s/post/1468/hey_underscore_you_are_doing_it_wrong_brian_lonsdorf  
https://www.youtube.com/watch?v=m3svKOdZijA

```javascript
// Underscore style

var _ = require('underscore');

var mapFirstTwo = function(data){
    return _.map(data, function(item){
        return _.first(item, 2);
    });
};

// Aqueduct style
// 1
var use = require('Aqueduct');
var underscore = require('underscore');

var mapFirstTwo = use(function(map, first){
    return map( first (2));
}, underscore);

// 2
var pipe = require('Aqueduct');
var underscore = require('underscore');

var mapFirstTwo = pipe(['map', 'first', 2], underscore);

// result

mapFirstTwo(["one","two","three"]); // ["on","tw","th"]

// 3

var filterFiles = pipe(
    'readdir filter isFile',
    require('fs'),
    Array, 
    {isFile: function( fileName, callback ){
        
    }}
);
var filterFiles = pipe(function(isFile, filter, readdir, _){
    return _(isFile)( filter( readdir ) );
    function isFile(fileName){}
}, require('fs'), Array);
filterFiles("./");

```
