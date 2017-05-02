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
    it('case', function(done){
        console.log('testing');                
        done();
    });
});

