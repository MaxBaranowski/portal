app.controller('autoDetailCtrl', function ($scope, modalForm, firebaseAuthorization, getCarsModels, $stateParams, $state, $location) {

    $scope.carData;
    getCarsModels.getOneCarById($stateParams.id)
        .then(function (data) {
            $scope.carData = data;
        });

//можно добавить проверку существует ли такой айди

    //=======================================================================
    //=======================================================================
    //=======================================================================

    //slider
    //run code after page renders (works only if event is on ng-repeat)
    // + needs to create directive 'onFinishRender'
    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {

            var images = document.querySelectorAll('.thumb');
            var mainImage = document.querySelector('.auto-photos-img');
            var currentImage = mainImage.children[0].src;
            var currentIndex = 0;

            images.forEach(function(item,index){
                var that = item;
                var index = index;
                that.addEventListener('click', function () {
                    currentIndex = index;
                    var srcToNewMainImage = that.childNodes[1].childNodes[1].currentSrc;
                    mainImage.children[0].src = srcToNewMainImage;
                    images.forEach(function(item){
                        item.classList.remove('active-thumb');
                    });
                    that.classList.add('active-thumb');
                    return;
                })
            });
            //next image
            var next = document.querySelector('.next');
            next.addEventListener('click', function(){
                currentIndex = currentIndex + 1;
                if(currentIndex >= images.length){
                    currentIndex = 0;
                }
                var srcToNewMainImage = images[currentIndex].childNodes[1].childNodes[1].currentSrc;
                mainImage.children[0].src = srcToNewMainImage;
                images.forEach(function(item){
                    item.classList.remove('active-thumb');
                });
                images[currentIndex].classList.add('active-thumb');
                return;
            });
            //previous image
            var prev = document.querySelector('.prev');
            prev.addEventListener('click', function() {
                currentIndex = currentIndex - 1;
                if (currentIndex < 0) {
                    currentIndex = images.length - 1;
                }
                var srcToNewMainImage = images[currentIndex].childNodes[1].childNodes[1].currentSrc;
                mainImage.children[0].src = srcToNewMainImage;
                images.forEach(function (item) {
                    item.classList.remove('active-thumb');
                });
                images[currentIndex].classList.add('active-thumb');
                return;
            });
    });

});