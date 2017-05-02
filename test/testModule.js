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
            testPromise: function(callback){
                return testPromise();
            },
            readExcel: function(){
                return readExcel();
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
        testPromise: function(){            
            return testPromise();
        },
        readExcel: function(){
            return readExcel();
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
        //axios.get('https://api.github.com/users/codeheaven-io').then(
        //axios.get('http://oss.sheetjs.com/js-xlsx/test_files/formula_stress_test_ajax.xlsx').then(
        axios.get('./dummy.xlsx').then(            
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

function testPromise(){
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

function readExcel(){ 
    //var fileName = 'http://oss.sheetjs.com/js-xlsx/test_files/formula_stress_test_ajax.xlsx';
    //var sheetName = 'Database';    
    var fileName = "./dummy.xlsx";
    var sheetName = 'SheetOne';    
    if(typeof XMLHttpRequest !== 'undefined'){        
        return new Promise(function(resolve, reject){
            var oReq;
            oReq = new XMLHttpRequest();
            oReq.open("GET", fileName, true);
            oReq.responseType = "arraybuffer";
            oReq.onload = function (e) {
                var arraybuffer = oReq.response;
                var data = new Uint8Array(arraybuffer);
                var arr = new Array();
                for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
                var wb = XLSX.read(arr.join(""), { type: "binary" });
                var csv = XLSX.utils.sheet_to_csv(wb.Sheets[sheetName]);
                resolve(csv);
            };
            oReq.send();            
        });
    }
    else{
        return new Promise(function(resolve, reject){
            XLSX = require('xlsx');
            var workbook = XLSX.readFile(fileName);        
            var worksheet = workbook.Sheets[sheetName];
            var csv = XLSX.utils.sheet_to_csv(worksheet);
            var arrRows = csv.split("\n");
            for(var i = 0; i < arrRows.length; i++){
                if(arrRows[i].length == 0){
                    arrRows.splice(i,1);
                }
            }        
            resolve(arrRows);
        });
    }
}