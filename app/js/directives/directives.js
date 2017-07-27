function directiveCtrl(){

}
//header with navigation buttons
app.directive('navigationDirective',function(){
    return{
        restrict:'E',
        templateUrl:'public/header.html',
        controller: directiveCtrl
    }
});
//footer with navigation buttons
app.directive('footerDirective',function () {
    return{
        restrict:'E',
        templateUrl:'public/footer.html',
        controller: directiveCtrl
    }
});
//run slider js code after page renders (works only if event is on ng-repeat)
app.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit(attr.onFinishRender);
                });
            }
        }
    }
});