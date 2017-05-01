var mod;
if(typeof requirejs === 'undefined') {
    console.log('running from terminal');
    var requirejs = require('requirejs');
}
else{
    console.log('running from browser');
    requirejs.config({ baseUrl: '.', paths: { }, nodeRequire: require });    
}


describe('suite', function(){
    before(function(done){
        console.log('before');
        require(['./module2'], 
            function(_mod) {                    
                console.log('before fired');
                mod = _mod;  
                //if(typeof requirejs == 'undefined') {mocha.run();}
                done();
        });
        
    });
    it('case', function(done){
        console.log('testing ' + mod.get());                
        done();
    });
});

