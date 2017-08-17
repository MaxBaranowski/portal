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

    $scope.$on('$viewContentLoaded', function(event) {
        $("a[data=last_time_up]").css('border-bottom', '1px solid red');
        //sort -> old first
        $("a[data=creation_date]").click(function () {
            $("a[data=odometer]").prev().remove().end();
            $("a[data=year]").prev().remove().end();
            $("a[data=last_time_up]").css('border-bottom', 'none');
            $("a[data=creation_date]").css('border-bottom', '1px solid red');
            getCarsModels.getCars('down')
                .then(function(data){
                    $scope.carsAds = data;
                });
        });
        //sort -> new first
        $("a[data=last_time_up]").click(function () {
            $("a[data=odometer]").prev().remove().end();
            $("a[data=year]").prev().remove().end();
            $("a[data=creation_date]").css('border-bottom', 'none');
            $("a[data=last_time_up]").css('border-bottom', '1px solid red');
            getCarsModels.getCars()
                .then(function(data){
                    $scope.carsAds = data;
                });
        });

        //sort -> year
        var year_clicked = false;
        // $("a[data=year]").before('<i style="margin-right: 3px" class="icon-long-arrow-down"></i>');
        $("a[data=year]").click(function () {
            $("a[data=odometer]").prev().remove().end();
            //sort -> year old first
            if(year_clicked){
                $("a[data=year]").prev().remove().end().before('<i style="margin-right: 3px" class="icon-long-arrow-down"></i>');
                getCarsModels.getCars('year-old')
                    .then(function(data){
                        $scope.carsAds = data;
                    });
                year_clicked = false;
            }
            //sort -> year new first
            else{
                $("a[data=year]").prev().remove().end().before('<i style="margin-right: 3px" class="icon-long-arrow-up"></i>');
                getCarsModels.getCars('year-new')
                    .then(function(data){
                        $scope.carsAds = data;
                    });
                year_clicked = true;
            }
        })

        //sort -> mileage
        var mileage_clicked = false;
        // $("a[data=odometer]").before('<i style="margin-right: 3px" class="icon-long-arrow-down"></i>');
        $("a[data=odometer]").click(function () {
            $("a[data=year]").prev().remove().end();
            //sort -> year old first
            if(!mileage_clicked){
                $("a[data=odometer]").prev().remove().end().before('<i style="margin-right: 3px" class="icon-long-arrow-down"></i>');
                getCarsModels.getCars('mileage-big')
                    .then(function(data){
                        $scope.carsAds = data;
                    });
                mileage_clicked = true;
            }
            //sort -> year new first
            else{
                $("a[data=odometer]").prev().remove().end().before('<i style="margin-right: 3px" class="icon-long-arrow-up"></i>');
                getCarsModels.getCars('mileage-small')
                    .then(function(data){
                        $scope.carsAds = data;
                    });
                mileage_clicked = false;
            }
        })
    });


});