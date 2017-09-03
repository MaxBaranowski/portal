app.service('weather', function($http, $location){

    let getApiIp = function () {
        return $http.get('http://ip-api.com/json')
            .then((response) => {
                return response.data;
            }, (err) => {
                return err.message;
            })
    };

    // api key f57ab679cc39bd44360af5f7344e066a
    this.getWeatherCurrent = function(){
        return getApiIp()
            .then((success) => {
                let ipInfo = success;
                let forecast = $http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${ipInfo.lat}&lon=${ipInfo.lon}&units=metric&appid=f57ab679cc39bd44360af5f7344e066a`)
                    .then((response) =>{
                        return response.data;
                    }, (err) => {
                        return err.message;
                    });
                return forecast;
            });
     };



});