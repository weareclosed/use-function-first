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

// useFn style
// 1
var use = require('useFn');
var underscore = require('underscore');

var mapFirstTwo = use(function(map, first){
    return map( first (2));
}, underscore);

// 2
var createFn = require('useFn');
var underscore = require('underscore');

var mapFirstTwo = createFn(['map', 'first', 2], underscore);

// result

mapFirstTwo(["one","two","three"]); // ["on","tw","th"]

// 3

var filterFiles = createFn(
    'readdir filter filesOnly',
    require('fs'),
    Array, 
    {filesOnly: function( fileName, callback ){
        
    }}
);

filterFiles("./");

```
