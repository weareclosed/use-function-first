Data last
---------


    // underscore style
    
    var _ = require('underscore');
    var mapFirstTwo = function(data){
        return _.map(data, function(item){
            return _.first(item, 2);
        });
    };

    // scoreunder style

    var mapFirstTwo = use(function(map, first){
        return map(first(2));
    }, require('underscore'));

    // 

    var mapFirstTwo = use(['map first', 2], require('underscore'));

    // usage

    mapFirstTwo(["one","two","three"]); // ["on","tw","th"]

    // 

    function use(/** function|string|Array */what, /** ...object */fromObject){}
