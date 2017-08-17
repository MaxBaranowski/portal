app.service("firebaseAuthorization", function ( $rootScope, $firebase) {
    var config = {
        apiKey: "AIzaSyDB41LxCDVzsJWNLPnYx2KOUbRKfYY960Y",
        authDomain: "fir-testapp-one-mb.firebaseapp.com",
        databaseURL: "https://fir-testapp-one-mb.firebaseio.com",
        projectId: "fir-testapp-one-mb",
        storageBucket: "fir-testapp-one-mb.appspot.com",
        messagingSenderId: "447948519886"
    };
    //to check if user loged in or not
    $rootScope.userLoginIn = false;

    firebase.initializeApp(config);

    const emailSignUp = $('#emailFieldLoginUp');
    const passwordSignUp = $('#passwordFieldLoginUp');
    const signUpBtn = $('#signUpBtn');

    const emailLoginIn = $('#emailFieldLoginIn');
    const passwordLoginIn = $('#passwordFieldLoginIn');
    const logInBtn = $('#logInBtn');

    const googleLOgInBtn = $('.auth-google');

    const logOutBtn = $('#userLogOut');

    //realtime check for uer status (logged in or logged out)
    firebase.auth().onAuthStateChanged(user => {
        if(user){
            console.log('USER LOGGED IN: ', user);
            $rootScope.$apply(() => {
                $rootScope.userLoginIn = true;
            });
        }else{
            console.log('USER NOT LOGGED IN');
            $rootScope.$apply(() => {
                $rootScope.userLoginIn = false;
            });
        }
    });

    //sign up event
    signUpBtn.click(e => {
        if($(':input[required]:visible')[0].checkValidity() == true && $(':input[required]:visible')[1].checkValidity() == true){
            let email = emailSignUp[0].value;
            let pass = passwordSignUp[0].value;

            const auth = firebase.auth();
            const promise = auth.createUserWithEmailAndPassword(email, pass);

            promise
                .then( user => {
                    var textUserName = $('#userName')[0].value;
                    var textUserSurname = $('#userSurname')[0].value;

                    var username = (textUserName.charAt(0).toUpperCase() + textUserName.slice(1)) + ' ' + (textUserSurname.charAt(0).toUpperCase() + textUserSurname.slice(1));
                    if(username == " "){
                        username = 'Anonymous User';
                    }
                    user.updateProfile({
                        displayName: username
                    });
                    $('.close-animatedModal').click();
                    document.querySelectorAll('input').forEach(function(el){el.value = '';});
                    $('#animatedModal').css("display","none");
                })
                .catch(e => {
                    // console.log(e.message);
                    swal({
                        title: "Ошибочка",
                        text: e.message,
                        type: "error",
                        confirmButtonColor: "#AEDEF4",
                        confirmButtonText: "OK",
                        allowEscapeKey: true
                    });
                });
        }
    });

    //log in event
    logInBtn.click(e => {
        if($(':input[required]:visible')[0].checkValidity() == true && $(':input[required]:visible')[1].checkValidity() == true){
            let email = emailLoginIn[0].value;
            let pass = passwordLoginIn[0].value;

            const auth = firebase.auth();
            const promise = auth.signInWithEmailAndPassword(email, pass);
            promise
                .then(() => {
                    $('.close-animatedModal').click();
                    document.querySelectorAll('input').forEach(function(el){el.value = '';});
                    $('#animatedModal').css("display","none");
                })
                .catch(e => {
                    // console.log('ERROR: ' + e.message);
                    swal({
                        title: "Ошибочка",
                        text: e.message,
                        type: "error",
                        confirmButtonColor: "#AEDEF4",
                        confirmButtonText: "OK",
                        allowEscapeKey: true
                    });
                });
        }
    });

    //LogIn with google account
    googleLOgInBtn.click( () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        provider.addScope('https://www.googleapis.com/auth/plus.me');
        return firebase.auth().signInWithPopup(provider)
            .catch(error => {
                // alert("GOOGLE SIGN IN ERROR: " + e.message);
                swal({
                    title: "Ошибочка",
                    text: error.message,
                    type: "error",
                    confirmButtonColor: "#AEDEF4",
                    confirmButtonText: "OK",
                    allowEscapeKey: true
                });
            });
    });


    //log out event
    logOutBtn.click(e => {
        const auth = firebase.auth();
        console.log(auth);
        firebase.auth().signOut();
    });
});
