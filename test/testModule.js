if(typeof define !== 'undefined')
{
    define([], function() {
        return {
            get: function() {
                return get();
            },
            google: function(callback){
                google(function(res){                                        
                    return callback(res);                    
                });
            },
            gooPromise: function(callback){
                return gooPromise();
            }            
        };
    });
}
else if(typeof exports !== 'undefined') {
    module.exports = {
        get: function(){
            return get();
        },
        google: function(callback){            
            google(function(res){
                callback(res);
            });
        },
        gooPromise: function(){            
            return gooPromise();
        }        
    };    
}

function get(){
    let a = "Hello Node World!!!";
    return a;
}

function google(callback){
    if(typeof XMLHttpRequest !== 'undefined'){
        //axios.get('https://google.com').then(
        axios.get('https://api.github.com/users/codeheaven-io').then(
        //axios.get('http://oss.sheetjs.com/js-xlsx/test_files/formula_stress_test_ajax.xlsx').then(
        //axios.get('https://github.com/aowati100/repo1/raw/master/test/dummy.xlsx').then(            
            function(response){
                callback(response.status);
            });  
    }
    else{
        var request = require('request');             
        let options = { url: 'https://google.com', headers: { 'Content-Type': 'text/html' }, encoding: null };        
        request.get(options, function (err, res, body) {
            var b = "PRINT DATA: " + res.statusCode + ' ' + res.headers['content-type'];
            callback(b);
        });
    }
}

function gooPromise(){
    if(typeof XMLHttpRequest !== 'undefined'){
        return new Promise(function(resolve, reject){
            axios.get('https://api.github.com/users/codeheaven-io').then(
                function(response){                   
                    resolve(response);
                }
            );
        });
    }
    else{
        return new Promise(
            function(resolve, reject){
                var request = require('request');
                let options = { url: 'https://google.com', headers: { 'Content-Type': 'text/html' }, encoding: null };
                request.get(options, function (err, res, body) {
                    if(err) { reject(err); }
                    else { resolve(res);}
                });
            }
        );
    }
}