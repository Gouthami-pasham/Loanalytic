(function() {
    $('#sendEmail').show();
    $('#email-failed').hide();
    $('#password-failed').hide();
    $('#activate-failed').hide();
    
    $('#spinner').hide();
    window.onload = (event) => {
        //console.log('page is fully loaded');
        validate();
      };
})();



$(document).on('click', '#admin-tab', function(e){
    var $this = $(this);
    $('#adminemail-failed').hide();
    $('#adminpassword-failed').hide();
    $('#activate-failed').hide();
    $('#spinner').hide();
    validate();
})

$(document).on('click', '#user-tab', function(e){
    var $this = $(this);
    $('#email-failed').hide();
    $('#password-failed').hide();
    $('#activate-failed').hide();
    $('#spinner').hide();
    validate();
})

function validate() {
    // Loop over them and prevent submission
    var loginForm = $('#userLoginForm')[0];
    var adminForm = $('#adminLogin')[0];
    var loginScope = angular.element('[ng-controller=loginFormController]').scope()
    var adminScope = angular.element('[ng-controller=adminFormController]').scope()
    adminForm.addEventListener('submit', adminScope.submitAdmin);
    loginForm.addEventListener('submit', loginScope.searchUser);
}

let crypto = (function(){
    return{
      encryptMessage: function(messageToencrypt){
        var encryptedMessage = CryptoJS.AES.encrypt(messageToencrypt, "password");
        return encryptedMessage.toString();
      },
      decryptMessage: function(encryptedMessage){
        var decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage, "password");
        var decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
  
        return decryptedMessage;
      }
    }
  })();

  

  
       

var app = angular.module('myApp', ['ngSanitize']);
app.controller('navController',function($scope){
    $scope.isVisible = true;
});
app.controller("adminFormController",function($scope,$http){
    $scope.admin = {
        email: "",
        password: ""
    };
    $scope.validate = function(){
        var loginForm = $('#userLoginForm')[0];
        var adminForm = $('#adminLogin')[0];
        var loginScope = angular.element('[ng-controller=loginFormController]').scope()
        var adminScope = angular.element('[ng-controller=adminFormController]').scope()
        adminForm.addEventListener('submit', adminScope.submitAdmin);
        loginForm.addEventListener('submit', loginScope.searchUser);
    },
    $scope.userAuthentication = function(response) {
        var userDetails = response.data[0];
        var decryptedPassword = crypto.decryptMessage(userDetails.password);
        if (decryptedPassword.localeCompare($scope.admin.password) == 0) {
            sessionStorage.setItem("userEmail", userDetails.Email);
            sessionStorage.setItem("userName", userDetails.FirstName);
            $('#spinner').hide();
            location.href = '/adminhome';
        } else {
            $('#spinner').hide();
            $('#adminpassword-failed').show();
            return;
        }
    }
    $scope.submitAdmin = function(event){
        $('#spinner').show();
        var adminForm = $('#adminLogin')[0];
        if (adminForm.checkValidity() === false) {
            $('#spinner').hide();
            event.preventDefault();
            event.stopPropagation();
        }
        adminForm.classList.add('was-validated');
        var data = $scope.admin;
        if (adminForm.checkValidity()) {
            
            $('#adminemail-failed').hide();
            $('#adminpassword-failed').hide();
            var config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            $http.post('http://localhost:3000/getUserById', data, config).then(function(response) {
                // This function handles succes
                console.log(response);
                if (response.data.length == 0) {
                    $('#spinner').hide();
                    $('#adminemail-failed').show();
                   
                } else {
                    $scope.userAuthentication(response);
                }
            }, function(response) {
                $('#spinner').hide();
                // this function handles error
                console.log(response);
            });
        }
    }
});


var loginFormController = function($scope, $http) {
    $scope.user = {
        email: "",
        password: ""
    };
    $scope.validate = function(){
        var loginForm = $('#userLoginForm')[0];
        var adminForm = $('#adminLogin')[0];
        var loginScope = angular.element('[ng-controller=loginFormController]').scope()
        var adminScope = angular.element('[ng-controller=adminFormController]').scope()
        adminForm.addEventListener('submit', adminScope.submitAdmin);
        loginForm.addEventListener('submit', loginScope.searchUser);
    },
    $scope.userAuthentication = function(response) {
        var userDetails = response.data[0];
        var decryptedPassword = crypto.decryptMessage(userDetails.password);
        if(userDetails.isActivated == 'N'){
            $('#activate-failed').show();
            $('#spinner').hide();
            return;
        }
        else if (decryptedPassword.localeCompare($scope.user.password) == 0) {
            sessionStorage.setItem("userEmail", userDetails.Email);
            sessionStorage.setItem("userName", userDetails.FirstName);
            $('#spinner').hide();
            location.href = '/userhome';
        } else {
            $('#password-failed').show();
            $('#spinner').hide();
            return;
        }
    }
    $scope.searchUser = function(event) {
        $('#spinner').show();
        var form = $('#userLoginForm')[0];
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            $('#spinner').hide();
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
                    $('#spinner').hide();
                } else {
                    $scope.userAuthentication(response);
                }
            }, function(response) {
                $('#spinner').hide();
                // this function handles error
                console.log(response);
            });
        }
    }
}


app.controller('loginFormController', loginFormController);
