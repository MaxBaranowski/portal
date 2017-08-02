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
});

app.filter('limitSpecs', function () {
    return function(obj, start, end){

        var newObj = {},
            index = 0;
        //if empty end of needed values(by default = false)
        //i need to know the quantity of keys in object) for loop
        if(end == false){
            let limit = 0;
            for(var key in obj){
                limit ++;
            }
            end = limit;
        }

        for(var key in obj){
            //if index still not equal to start position, needs to move it
            if(index < start){
                index++;
                continue;
            }
            //if previous false, it`s time to get new object with interesting me keys
            if(index <= end){
                newObj[key] = obj[key];
                index ++;
            }else break;
        }
        return newObj;
    }
});


