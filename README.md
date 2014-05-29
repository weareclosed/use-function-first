Data last
---------

    var mapFirstTwo = use(function(map, first){
        return map(first(2));
    }, require('underscore'));

    mapFirstTwo([11,22,33,44]);


    function use(/** function|string */what, /** ...object */fromObject){

    }