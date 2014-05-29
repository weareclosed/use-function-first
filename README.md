Data last, callback first
-------------------------

https://thenewcircle.com/s/post/1468/hey_underscore_you_are_doing_it_wrong_brian_lonsdorf  
https://www.youtube.com/watch?v=m3svKOdZijA

```javascript
// underscore style

var _ = require('underscore');

var mapFirstTwo = function(data){
    return _.map(data, function(item){
        return _.first(item, 2);
    });
};

// scoreunder style

var use = require('scoreunder');

var mapFirstTwo = use(function(map, first){
    return map(first(2));
}, require('underscore'));

// 

var mapFirstTwo = use(['map first', 2], require('underscore'));

// result

mapFirstTwo(["one","two","three"]); // ["on","tw","th"]

// 

function use(/** function|string|Array */ what, /** ...object */ fromObject){}
```
