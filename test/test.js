if(typeof requirejs == 'undefined') {
    console.log('running from terminal');
    var requirejs = require('requirejs');
}
else{
    console.log('running from browser');
    requirejs.config({ baseUrl: '.', paths: { }, nodeRequire: require });    
}

var mod;
describe('suite', function(){
    this.timeout(5000);   
    before(function(done){
        if(typeof XMLHttpRequest !== 'undefined'){
            require(['testModule'], 
                function(_mod) {                    
                    console.log('before fired');
                    mod = _mod;
                    done();
            });            
        }        
        else{
            mod = require('./testModule');
            done();
        }
    });
    it('case', function(done){
        mod.google(function(res){
            console.log(res);
            done();
        });        
    });    
});
