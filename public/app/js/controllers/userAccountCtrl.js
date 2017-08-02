app.controller("userAccountCtrl", function ($scope, $rootScope, modalForm, firebaseAuthorization, getCarsModels, $q) {

    //authorization checking
    $scope.user;
    $scope.userNewAdd = false;
    var user_id;

    //all cars what one  user add
    $scope.userAds;

    const auth = firebase.auth().onAuthStateChanged((user) => {
        if(user){
            $scope.$apply(() => {
                $scope.user = user;
                user_id = user.uid;
            });
            //get one user car ads
            getCarsModels.getCarsByUserId(user.uid)
                .then(function(data){
                    $scope.userAds = data;
                });
        }
    });

    //=================================================================================
    //=================================================================================
    //=================================================================================

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

    $scope.specs = {
        "Кондиционер": false,
        "Кожаный салон": false,
        "Легкосплавные диски": false,
        "Ксенон": false,
        "Парктроник": false,
        "Подогрев сидений": false,
        "Система контроля стабилизации": false,
        "Навигация": false,
        "Громкая связь": false
    };

    class CarAd {
        constructor(price, make, makeName, model, year, country, region, condition, transmition, drivetrain, volume, fuel, bodyTtype, mileage, specs, description, phone, userId, photos ,time){
            this.price = price;
            this.make = make;
            this.makeName = makeName;
            this.model = model;
            this.year = year;
            this.country = country;
            this.region = region;
            //состояние (с пробегом/новый/аварийный)
            this.condition = condition;
            //коробка передач
            this.transmition = transmition;
            //трансмиссия(привод)
            this.drivetrain = drivetrain;
            //обем двигателя
            this.volume = volume;
            this.fuel = fuel;
            //кузов
            this.bodyType = bodyTtype;
            //пробег
            this.mileage = mileage;
            //дополнительные опции (объект со значениями)
            this.specs = specs;
            //описание текст
            this.description = description;//string
            this.phone = phone;
            this.views = 0;
            this.userId = userId;
            this.photos = photos;//array
            this.time = time;
        };
        //increase views counter when add shown
        // incViews(){
        //     return this.views = this.views + 1;
        // }
    }
    var carAd = new CarAd();

    //getting values for posting new add to DB
    $scope.$watch('m_price',function(){ if($scope.m_price != ''){ carAd.price = parseFloat( $scope.m_price ); } });
    $scope.$watch('make',function(){ if($scope.make != ''){ carAd.make = parseFloat( $scope.make ); } });
    $scope.$watch('models',function(){ if($scope.models != ''){ carAd.model = $scope.models; } });
    $scope.$watch('m_year',function(){ if($scope.m_year != ''){ carAd.year = parseFloat( $scope.m_year ); } });
    $scope.$watch('m_country',function(){
        if($scope.m_country != ''){
            carAd.country = parseFloat( $scope.m_country );
            if($scope.m_country == '2'){
                $('select[name=region]').removeAttr("disabled");
            }else if ($scope.m_country == '1' || $scope.m_country == '3'){
                $('select[name=region]').attr("disabled", "disabled");
            }
        }
    });
    $scope.$watch('m_region',function(){ if($scope.m_region != ''){ carAd.region = parseFloat( $scope.m_region ); } });
    $scope.$watch('m_condition',function(){ if($scope.m_condition != ''){ carAd.condition = parseFloat( $scope.m_condition ); } });
    $scope.$watch('m_transmition',function(){ if($scope.m_transmition != ''){ carAd.transmition = parseFloat( $scope.m_transmition ); } });
    $scope.$watch('m_drivetrain',function(){ if($scope.m_drivetrain != ''){ carAd.drivetrain = parseFloat( $scope.m_drivetrain ); } });
    $scope.$watch('m_volume',function(){ if($scope.m_volume != ''){ carAd.volume = parseFloat( $scope.m_volume ); } });
    $scope.$watch('m_fuel',function(){ if($scope.m_fuel != ''){ carAd.fuel = parseFloat( $scope.m_fuel ); } });
    $scope.$watch('m_bodyType',function(){ if($scope.m_bodyType != ''){ carAd.bodyType = parseFloat( $scope.m_bodyType ); } });
    $scope.$watch('m_mileage',function(){ if($scope.m_mileage != ''){ carAd.mileage = parseFloat( $scope.m_mileage ); } });
    $scope.$watch('specs',function(){ if($scope.specs != ''){ carAd.specs = $scope.specs } });
    $scope.$watch('m_description',function(){ if($scope.m_description != ''){ carAd.description = $scope.m_description; } });
    //phone number is watching by jQuery "carAd.phone = $('#phone')[0].value;"

    firebase.auth().onAuthStateChanged( user => { if(user){carAd.userId = user.uid; }});
    // $scope.$watch('m_photos',function(){ if($scope.m_photos != ''){ carAd.photos = $scope.m_photos; } });

    //upload photos
    carAd.photos = [];

    //POST new add to BD
    $('#sendAdd').on('click', () => {

        // on line below i can`t get value from phone input field witj $scope.watch,
        // and decided to get value with jquery
        carAd.phone = $('#phone')[0].value;
        carAd.time = Date.parse(new Date().toString());
        carAd.makeName = getCarsModels.carsMakes[$('.manufacture')[0].value];

        //needs for promise resolve
        var count = 0;
        if(uploadImages.length == 0) {
            swal({
                title: "Ошибочка",
                text: "Пожалуйста загрузите хотябы одну фотографию автомобиля.",
                type: "error",
                confirmButtonColor: "#AEDEF4",
                confirmButtonText: "Продолжить",
                allowEscapeKey: true
            });
        }else{
            return new Promise(function (resolve, reject) {
                for (let i = 0; i < uploadImages.length; i++) {
                    (function (i) {
                        //обращение к базе данных
                        //создать имя файла для сохранения, в данном случае имя - исходное имя файла
                        var uploadsRef = firebase.storage().ref('storage/car_add/' + user_id + '/' + 'car-add-' + (Math.random()*1000000000).toFixed() + '-image-' +new Date().toLocaleDateString()  + '.png');

                        // var uploadTask = uploadsRef.put(uploadImages[i]);
                        var uploadTask = uploadsRef.putString(uploadImages[i], 'data_url');

                        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                            function (snapshot) {
                                var progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed();
                                if ($(`#load-image-${i}`).next().next()[0]) {
                                    $(`#load-image-${i}`).next().next()[0].innerText = `${progress} %`;
                                }
                            }, function (error) {
                                console.log(error.message)
                            }, function (success) {
                                // console.log(uploadTask.snapshot.downloadURL);
                                carAd.photos.push(uploadTask.snapshot.downloadURL);
                                count = count + 1;
                                // console.log('l: ' + uploadImages.length, 'count: ' + count)
                                if(uploadImages.length > 0){
                                    if(count == uploadImages.length){
                                        resolve();
                                    }
                                }
                            }
                        );
                    })(i)
                }
            }).then(function (success) {
                getCarsModels.addCarAdd(carAd);
                // console.info('Uploaded!');
            },  function (error) {
                console.error(error.message)
            });
        }


    });

    //=================================================================================
    //=================================================================================
    //=================================================================================

    //upload images variable
    var selectedFiles;
    //array with upload images href`s
    var uploadImages = [];
    $scope.uploadImagesQuantity = 0;

    //load images into base:64 format for preview them before upload
    //listen for upload images input change
    $('#file-upload').on('change', function (e) {
        //check if images are allready upload/
        if ( uploadImages.length <= 8 && e.target.files.length <= 8 ) {
            //check if all input files are not greater then 8
            if (e.target.files.length <= 8 - uploadImages.length) {
                // create url to images
                readURL(this);//this = input

                setTimeout(() => {
                    $('#images').children().remove();
                    for(let i = 0; i < uploadImages.length; i++){
                        $('#images')
                            .append(`<div style="position:relative">`+
                                `<img src="${uploadImages[i]}" id="load-image-${i}" style="width:100px;height:100px;margin:0 2px;border:2px solid #ffdd22;">`+
                                `<span style="position:absolute; width: 20px; text-align: center;font-weight: bold; top: 5px; right: 10px; cursor: pointer; border-radius: 50%; background-color: #fff;">X</span>`+
                                `<p style="display: flex; justify-content: center;"></p>`+
                                `</div>`);
                    };
                    //delete image from array
                    for(let i of $('#images div span')){
                        i.addEventListener('click', function (i) {
                            // console.log(this.previousSibling.id.slice(-1));
                            uploadImages.splice(uploadImages.indexOf(this.previousSibling.id.slice(-1)),1);
                            this.parentElement.remove();
                            $scope.$apply(()=>{
                                $scope.uploadImagesQuantity = uploadImages.length;
                            });
                        })
                    }
                    $scope.$apply(()=>{
                        $scope.uploadImagesQuantity = uploadImages.length;
                    });
                }, 1000)//dont know how to do this with promises,
                // i tried but it fiers only after i second time press upload button
                // second click and even then it shows images what were be loaded on first click


            }else {
                $('input[type=file]')[0].value = '';
                alert('ONLY 8 FILES ALLOWED FOR UPLOAD');
            }
        }
        else {
            $('input[type=file]')[0].value = '';
            $('#images').remove();
            alert('ONLY 8 FILES ALLOWED FOR UPLOAD');
        }

    });


    //load path for upload images
    var readURL = function (input) {
        console.log(input.files.length)
        for (let i = 0; i < input.files.length; i++) {
            (function (i) {
                var reader = new FileReader();
                // console.log(reader.readAsDataURL(input.files[i]) == true)
                reader.onload = function (e) {
                    if (uploadImages.indexOf(e.target.result) < 0) {
                        uploadImages.push(e.target.result);
                    }
                }
                reader.readAsDataURL(input.files[i]);//read binary files
            })(i)
        }
    };

    //drag drop evetns
    var drop_zone  = $('#drop-zone');

    drop_zone.on('dragover', (event) => {
       event.stopPropagation();
       event.preventDefault();
       drop_zone.css('border', "20px dashed #6fe981");

    });
    drop_zone.on('dragleave', (event) => {
        event.stopPropagation();
        event.preventDefault();
        drop_zone.css('border', "20px dashed #e9e9e9");
    });
    drop_zone.on('drop', (event) => {
        event.stopPropagation();
        event.preventDefault();
        drop_zone.css('border', "20px dashed  #e9e9e9");
        // console.log(event.originalEvent.dataTransfer.files);
        var drag_drop = event.originalEvent.dataTransfer;
        var drag_drop_files = event.originalEvent.dataTransfer.files;

       $scope.deleteFromUploadImages = function(input){
            console.log('delete', input)
        }

        if ( uploadImages.length <= 8 && drag_drop_files.length <= 8 ) {
            //check if all input files are not greater then 8
            if (drag_drop_files.length <= 8 - uploadImages.length) {
                // create url to images
                readURL(drag_drop);//this = input

                setTimeout(() => {
                    $('#images').children().remove();
                    for(let i = 0; i < uploadImages.length; i++){
                        $('#images')
                            .append(`<div style="position:relative">`+
                                `<img src="${uploadImages[i]}" id="load-image-${i}" style="width:100px;height:auto;margin:0 2px;border:2px solid #ffdd22;">`+
                                `<span style="position:absolute; width: 20px; text-align: center;font-weight: bold; top: 5px; right: 10px; cursor: pointer; border-radius: 50%; background-color: #fff;">X</span>`+
                                `<p style="display: flex; justify-content: center;"></p>`+
                                `</div>`);
                    };
                    for(let i of $('#images div span')){
                        i.addEventListener('click', function (i) {
                            uploadImages.splice(uploadImages.indexOf(this.previousSibling.id.slice(-1)),1);
                            this.parentElement.remove();
                            $scope.$apply(()=>{
                                $scope.uploadImagesQuantity = uploadImages.length;
                            });
                        })
                    }
                    $scope.$apply(()=>{
                        $scope.uploadImagesQuantity = uploadImages.length;
                    });
                }, 1000)//dont know how to do this with promises,
                // i tried but it fiers only after i second time press upload button
                // second click and even then it shows images what were be loaded on first click

            }else {
                // $('input[type=file]')[0].value = '';
                alert('ONLY 8 FILES ALLOWED FOR UPLOAD');
            }
        }else {
            // $('input[type=file]')[0].value = '';
            $('#images').remove();
            // drag_drop_files.length = 0;
            alert('ONLY 8 FILES ALLOWED FOR UPLOAD');
        }
    });


    //=================================================================================
    //=================================================================================
    //=================================================================================

    //jquery mask telephone number pretyfy input
    $('document').ready(function () {
        $(function(){
            $("#phone").mask("+(999) 99 999-99-99");
        });
        $('header')[0].children[0].addEventListener('click', function(){
            $scope.$apply(() => {
                $scope.userNewAdd = false;
                $('header')[0].children[1].classList.remove('active-btn');
                $('header')[0].children[0].classList.add('active-btn');
            });
        });
        $('header')[0].children[1].addEventListener('click', function(){
            $scope.$apply(() => {
                $scope.userNewAdd = true;
                $('header')[0].children[0].classList.remove('active-btn');
                $('header')[0].children[1].classList.add('active-btn');
            });
        });
    });

});

