(function() {
    $('#sendEmail').show();
    $('#email-failed').hide();
    $('#password-failed').hide();
    window.addEventListener('load', function() {
        validate();
    });
})();


function validate() {
    // Loop over them and prevent submission
    var loginForm = $('#userLoginForm')[0];
    var loginScope = angular.element('[ng-controller=loginFormController]').scope()
    loginForm.addEventListener('submit', loginScope.searchUser);
}


var app = angular.module('myApp', []);
var loginFormController = function($scope, $http) {
    $scope.user = {
        email: "",
        password: ""
    };
    $scope.userAuthentication = function(response) {
        var userDetails = response.data[0];
        if (userDetails.password.localeCompare($scope.user.password) == 0) {
            location.href = '/userhome';
        } else {
            $('#password-failed').show();
            return;
        }
    }
    $scope.searchUser = function(event) {
        var form = $('#userLoginForm')[0];
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
        var data = $scope.user;
        if (form.checkValidity()) {
            $('#email-failed').hide();
            $('#password-failed').hide();
            var config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            $http.post('http://localhost:3000/getUserById', data, config).then(function(response) {
                // This function handles succes
                console.log(response);
                if (!response.data.length) {
                    $('#email-failed').show();
                } else {
                    $scope.userAuthentication(response);
                }
            }, function(response) {

                // this function handles error
                console.log(response);
            });
        }
    }
}


app.controller('loginFormController', loginFormController);