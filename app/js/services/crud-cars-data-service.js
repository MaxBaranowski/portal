// mongodb://<dbuser>:<dbpassword>@ds119568.mlab.com:19568/portal-database
// ======apikey:   MMxhOJ-uebWZVOJyMN8Y-Q26lAlPJXXp
// get db-name
// ======https://api.mlab.com/api/1/databases?apiKey=MMxhOJ-uebWZVOJyMN8Y-Q26lAlPJXXp
// get collecetions
// ======https://api.mlab.com/api/1/databases/portal-database/collections?apiKey=MMxhOJ-uebWZVOJyMN8Y-Q26lAlPJXXp
// get collection
// ======https://api.mlab.com/api/1/databases/portal-database/collections/cars?f={%22BMW%22:%22model%22}&apiKey=MMxhOJ-uebWZVOJyMN8Y-Q26lAlPJXXp
// get all cars models by it name
// ======https://api.mlab.com/api/1/databases/portal-database/collections/cars?f={'Audi':'model'}&apiKey=MMxhOJ-uebWZVOJyMN8Y-Q26lAlPJXXp
// 447948519886-2m7bakf2ug8h7ua42erpvcfniejnbooq.apps.googleusercontent.com

app.service("getCarsModels", function ($http, $rootScope, $q, $state, $location) {
    //$q service needs for asynchronic run fucnctions
    var defferd = $q.defer();

    //get all cars to show on cars catalog page
    this.getCars = function(){
        return $http.get(`https://api.mlab.com/api/1/databases/portal-database/collections/cars-ads?&apiKey=MMxhOJ-uebWZVOJyMN8Y-Q26lAlPJXXp`)
            .then( (response) => {
                return response.data;
            }, (error) => {
                return error.message;
            })
    }

    //get car for detail view
    this.getOneCarById = function (ad_id) {
    //get car by it _id -> EXAMPLE:59761513c2ef1609d427e8d0
    //https://api.mlab.com/api/1/databases/portal-database/collections/cars-ads/59761513c2ef1609d427e8d0?apiKey=MMxhOJ-uebWZVOJyMN8Y-Q26lAlPJXXp
        return $http.get(`https://api.mlab.com/api/1/databases/portal-database/collections/cars-ads/${ad_id}?apiKey=MMxhOJ-uebWZVOJyMN8Y-Q26lAlPJXXp`)
            .then( (response) => {
                // console.log('console.log(response)',response)
                return response.data;
            }, (error) => {
                swal({
                    title: "404",
                    text: "Извините, но такой страницы нет или она удалена...",
                    type: "error",
                    confirmButtonColor: "#AEDEF4",
                    confirmButtonText: "OK!",
                    allowEscapeKey: true
                });
                $state.go('auto')
                // console.error(error.message);
            })
    };

    // get cars makes after seelcting it in form
    this.getCarsByMake = function(make) {
        //get from db cars models by choosen  make
        return $http.get(`https://api.mlab.com/api/1/databases/portal-database/collections/cars?f={'${make}':'model'}&apiKey=MMxhOJ-uebWZVOJyMN8Y-Q26lAlPJXXp`)
            .then( (response) => {
                var data = JSON.stringify(response.data[0]);
                data = data.slice(data.indexOf("["), data.length - 2);
                data = JSON.parse(data);
                return data;
            }, (error) => {
                    return error.message;
            })
    };


    this.addCarAdd = function (ad){
        // post to db new car ad
        return  $http({
            method: 'POST',
            url: 'https://api.mlab.com/api/1/databases/portal-database/collections/cars-ads?apiKey=MMxhOJ-uebWZVOJyMN8Y-Q26lAlPJXXp',
            data: JSON.stringify(ad),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) =>{
            // console.info('data send');
            return new Promise(function (resolve, reject) {
                swal({
                    title: "Все круто!",
                    text: "Объявление создано.",
                    type: "success",
                    confirmButtonColor: "#AEDEF4",
                    confirmButtonText: "OK!",
                    allowEscapeKey: false
                });
                $('.confirm').click(function () {
                    resolve();
                })
            }).then(function (success) {
                location.reload();
            })

            // location.reload();
            // //reseting all fields after succsesful upload
            // $('input:checked').prop('checked', false);
            // $("input[name='phone']").val("");
            // $('textarea').val("");
        }, (error) => {
            return error.message;
        })
    };

    //get all cars ad from one user
    this.getCarsByUserId = function (userId) {
        // return $http.get(`https://api.mlab.com/api/1/databases/portal-database/collections/cars-ads?={'userId':'229K98sM3huVOUEu2sm1SKmUWh3qB3'}&apiKey=MMxhOJ-uebWZVOJyMN8Y-Q26lAlPJXXp`) 9K98sM3huVOUEu2sm1SKmUWh3qB3
        return $http.get("https://api.mlab.com/api/1/databases/portal-database/collections/cars-ads?q={'userId':'" + userId + "'}&apiKey=MMxhOJ-uebWZVOJyMN8Y-Q26lAlPJXXp")
            .then( (response) => {
                // console.log(response)
                return response.data;
            }, (error) => {
                return error.message;
            })
    };

    this.carsMakes = [
        "Acura",
        "Alfa Romeo",
        "AMC",
        "Aston Martin",
        "Audi",
        "Avanti",
        "Bentley",
        "BMW",
        "Buick",
        "Cadillac",
        "Chevrolet",
        "Chrysler",
        "Daewoo",
        "Daihatsu",
        "Datsun",
        "DeLorean",
        "Dodge",
        "Eagle",
        "Ferrari",
        "FIAT",
        "Fisker",
        "Ford",
        "Freightliner",
        "Geo",
        "GMC",
        "Honda",
        "HUMMER",
        "Hyundai",
        "Infiniti",
        "Isuzu",
        "Jaguar",
        "Jeep",
        "Kia",
        "Lamborghini",
        "Lancia",
        "Land Rover",
        "Lexus",
        "Lincoln",
        "Lotus",
        "Maserati",
        "Maybach",
        "Mazda",
        "McLaren",
        "Mercedes-Benz",
        "Mercury",
        "Merkur",
        "MINI",
        "Mitsubishi",
        "Nissan",
        "Oldsmobile",
        "Peugeot",
        "Plymouth",
        "Pontiac",
        "Porsche",
        "RAM",
        "Renault",
        "Rolls-Royce",
        "Saab",
        "Saturn",
        "Scion",
        "smart",
        "SRT",
        "Sterling",
        "Subaru",
        "Suzuki",
        "Tesla",
        "Toyota",
        "Triumph",
        "Volkswagen",
        "Volvo",
        "Yugo"
    ];

});