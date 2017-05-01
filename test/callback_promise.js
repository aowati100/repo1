var request = require('request');
describe('suite', function () {    
    this.timeout(5000);
    it('case', function (done) {
        var url = "https://github.com/";
        var options = {
          url: url,
          headers: {
              'Content-Type': 'text/html'
          },
          encoding: null
        };    
        
            request.get(options, function (err, res, body){
                if(err){
                    console.log(err);                
                }
                else{
                    console.log(res.statusCode);                          
                }       
                done();
            });                    
    });
});