app.controller('newsCtrl', function($scope,modalForm, firebaseAuthorization){
    (function() {
        var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = 'img/news-s.png';
        document.getElementsByTagName('head')[0].appendChild(link);
    })();
});
