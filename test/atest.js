'use strict';
var request = require('request');
var XLSX = require('xlsx');
describe('suite', function () {
    it('case', function (done) {
        var url = "http://oss.sheetjs.com/js-xlsx/test_files/formula_stress_test_ajax.xlsx";
        var options = {
          url: url,
          headers: {
              'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          },
          encoding: null
        };     
        request.get(options, function (err, res, body){
          var arraybuffer = body;
          /* convert data to binary string */
          var data = arraybuffer;            
          //var data = new Uint8Array(arraybuffer);                
          var arr = new Array();
          for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
          var bstr = arr.join("");
          /* Call XLSX */
          var sheetName = 'Database';
          var workbook = XLSX.read(bstr, { type: "binary" });
          var worksheet = workbook.Sheets[sheetName];
          var csv = XLSX.utils.sheet_to_csv(worksheet);
          console.log(csv);
          done();
        });
    });
});