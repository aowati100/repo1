define(function () {
    return {
        color: "black",
        size: "unisize",
        get: function(){
            return "THIS IS THE BEGINING";
        }
    }
});

// If we're running under Node, 
if(typeof exports !== 'undefined') {
    exports.get = get;
}
