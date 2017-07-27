//return auto specs it it true
app.filter('ifTrue', function () {
    return function(value){
        var newObj = '';
        for(var key in value){
            if(value[key] == true){
                newObj = newObj + key + ', ';
            }
        }
        return newObj;
    }
})
