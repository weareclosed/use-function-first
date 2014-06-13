Use Function First
------------------

This is Functional Programming tool to compose data-first/callback-last styled functions.  
It's a one of the ways to get rid from [callback hell](http://callbackhell.com).

Inspired by:  
[![Youtube video](http://img.youtube.com/vi/m3svKOdZijA/0.jpg)](http://www.youtube.com/watch?v=m3svKOdZijA)
https://thenewcircle.com/s/post/1468/hey_underscore_you_are_doing_it_wrong_brian_lonsdorf  

#### Underscore style (Data First / Callback Last)

```javascript
var _ = require('underscore');

var mapFirstTwo = function(data){
    return _.map(data, function(item){
        return _.first(item, 2);
    });
};
```
As alternative for that style is the

#### Function First / Data Last style

##### 1. Use Function

```javascript
var use = require('use-function-first');
var underscore = require('underscore');

var mapFirstTwo = use(function(map, first){
    return map( first (2));
}, underscore);
```
or 
##### 2. Compose Function

```javascript
var composeFn = require('use-function-first');
var _ = require('underscore');

var mapFirstTwo = composeFn(['map first', 2], _ );
```

##### Result

```javascript
mapFirstTwo(["one","two","three"]); // ["on","tw","th"]
```

##### 3. File-system API

```javascript
var filterFiles = composeFn(
    'readdir filter filesOnly',
    require('fs'),
    Array, 
    {filesOnly: function( fileName, callback ){
        
    }}
);

filterFiles("./");

```
