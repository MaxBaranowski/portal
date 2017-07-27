app.controller("catalogAutoCtrl",function ($scope, modalForm, firebaseAuthorization, $q, getCarsModels) {

    //showing car models for every make
    $scope.carMakes = getCarsModels.carsMakes;
    //for showing all cars models, which mark has beem selected
    $scope.carsModels;
    //show models of cars witch make has been selected
    $scope.$watch('make',function(){
        let make = $scope.make;
        // 'empty sring' value is for all makes
        $('select[name=models]').attr("disabled", "disabled");
        if(make) {
            if(make != ''){
                //make - number of selected make
                //carMake - make of car which selected
                var carMake = $scope.carMakes[make];
                //method from mongoDbGetCarsService which will get cars by car make
                getCarsModels.getCarsByMake(carMake)
                    .then(
                        (result) => {
                            $scope.carsModels = result;
                            $('select[name=models]').removeAttr("disabled");
                        },
                        (error) => {
                            console.log(error.message);
                        }
                    );
            };
        };
    });

    $scope.$watch('m_country',function(){
        if($scope.m_country != ''){
            if($scope.m_country == '2'){
                $('select[name=region]').removeAttr("disabled");
            }else if ($scope.m_country == '1' || $scope.m_country == '3'){
                $('select[name=region]').attr("disabled", "disabled");
            }
        }
    });

    //get all cars
    $scope.carsAds;
    getCarsModels.getCars()
        .then(function(data){
            $scope.carsAds = data;
        });

});