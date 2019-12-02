(function() {
$('#spinner').hide();
  $('#sendEmail').show();
  $('#email-failed').hide();
      $('#changePassword').hide();
      $('#password-success').hide();
      $('#password-failed').hide();
      $('#autopassword-success').hide();
      $('#autopassword-failed').hide();
  window.addEventListener('load', function() {
      validate();
  });
})();

/**
* sets of charachters
*/
var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
var lower = 'abcdefghijklmnopqrstuvwxyz'
var digit = '0123456789'
var special = '@?.#$%&*'
var all = upper + lower + digit + special

/**
* generate random integer not greater than `max`
*/

function rand(max) {
  return Math.floor(Math.random() * max)
}

/**
* generate random character of the given `set`
*/

function random(set) {
  return set[rand(set.length - 1)]
}

/**
* generate an array with the given `length` 
* of characters of the given `set`
*/

function generate(length, set) {
  var result = []
  while (length--) result.push(random(set))
  return result
}

/**
* shuffle an array randomly
*/
function shuffle(arr) {
  var result = []

  while (arr.length) {
      result = result.concat(arr.splice(rand[arr.length - 1]))
  }

  return result
}
/**
* do the job
*/
function password(length) {
  var result = [] // we need to ensure we have some characters

  result = result.concat(generate(1, upper)) // 1 upper case
  result = result.concat(generate(1, lower)) // 1 lower case
  result = result.concat(generate(1, digit))
  result = result.concat(generate(1, special)) // 1 digit
  result = result.concat(generate(length - 4, all)) // remaining - whatever
  return shuffle(result).join('') // shuffle and make a string
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

function validate() {
  // Loop over them and prevent submission
  var mailform = $('#sendEmail')[0];
  var changePasswordform = $('#changePassword')[0];
  var mailScope = angular.element('[ng-controller=mailformCtrl]').scope()
  var passwordScope = angular.element('[ng-controller=passwordformCtrl]').scope()
  mailform.addEventListener('submit', mailScope.searchMail);
  changePasswordform.addEventListener('submit', passwordScope.submitPassword);
}


var app = angular.module('myApp', ['ngSanitize']);
app.controller('navController',function($scope){
    $scope.isVisible = false;
});

var modalController = function($scope){
  $scope.modal = {
    title : "Success",
    message:"Password has been sent to your mail.",
    iconCode:'check_circle_outline'
  }

  $scope.changeModalContent = function(message){
    $scope.message = message;
  }
}
app.controller('modalController',modalController);
$('#emailModal').on('hidden.bs.modal', function (e) {
  $('#sendEmail').hide();
  $('#changePassword').show();
  
});
$('#passwordModal').on('hidden.bs.modal', function (e) {
    location.href = '/';
});
app.controller('mailformCtrl', function($scope, $http) {
  $scope.user = {
      email: "",
  };
  
  $scope.subject = "Password Recovery";
  $scope.email = "";
  $scope.randomPassword = function() {
      return password(8);
  }
  sessionStorage.setItem("password", $scope.randomPassword());
  $scope.htmlTemplate = '<img src="cid:unique@kreata.ee"/><br><h2 style="justify-content:center;"> Please find the New password below</h2><br>' +
      '<h1 style="justify-content:center;">Password : ' + sessionStorage.getItem("password") + '</h1><br>' +
      '<h4 style="justify-content:center;">Please enter this password in the change password page and then enter your custom password</h4>';

  $scope.searchMail = function(event) {
    $('#spinner').show();
      var form = $('#sendEmail')[0];
      if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          $('#spinner').hide();
      }
      form.classList.add('was-validated');
      var data = $scope.user;
      if (form.checkValidity()) {
          var config = {
              headers: {
                  'Content-Type': 'application/json'
              }
          }
          $http.post('http://localhost:3000/forgotpassword/getUserById', data, config).then(function(response) {
              // This function handles succes
              console.log(response);
              if (!response.data.length) {
                  $('#email-failed').show();
                  $('#spinner').hide();
              } else {
                  $scope.email = response.data[0].Email;
                  sessionStorage.setItem("email", $scope.email);
                  var data = {
                      "subject": $scope.subject,
                      "text": $scope.htmlTemplate,
                      "email": $scope.email,
                      "src":"Password.jpg"
                  }
                  $http.post('http://localhost:3000/forgotpassword/sendEmail', data, config).then(function(response) {
                      // This function handles succes
                      console.log(response);
                      if(response.status == 200 && response.statusText == "OK"){
                        $('#emailModal').modal('show');
                        $('#spinner').hide();
                      }
                      
                  }, function(response) {
                    $('#spinner').hide();
                      // this function handles error
                      console.log(response);
                  });
              }
          }, function(response) {
            $('#spinner').hide();
              // this function handles error
              console.log(response);
          });
      };
  }
});

app.controller('passwordformCtrl', function($scope, $http) {
  $scope.user = {
      autopassword: "",
      password: "",
      confirmpassword: "",
      email: ""
  };
  var autoPassword = sessionStorage.getItem("password")

  $scope.matchPasswordOnchange = function($event) {
    var emailData = $event.originalEvent.clipboardData.getData('text/plain')
      if ((autoPassword != "") && (emailData != "")) {
          if (autoPassword.localeCompare(emailData) == 0) {
              $('#autopassword-failed').hide();
              $('#autopassword-success').show();

          } else {
              $('#autopassword-success').hide();
              $('#autopassword-failed').show();
          }
      } else {
          $('#autopassword-success').hide();
          $('#autopassword-failed').show();
      }
  };

  $scope.matchAutoPassword = function($event) {
      if ($event.key == "CapsLock") {
          return;
      }
      if ((autoPassword != "") && ($event.target.value != "")) {
          if (autoPassword.localeCompare($event.target.value + $event.key) == 0) {
              $('#autopassword-failed').hide();
              $('#autopassword-success').show();

          } else {
              $('#autopassword-success').hide();
              $('#autopassword-failed').show();
          }
      } else {
          $('#autopassword-success').hide();
          $('#autopassword-failed').show();
      }

      if ($event.key == "Backspace") {
          var valueLength = $event.target.value.length - 1;
          if ($event.target.value == "" || !valueLength) {
              $('#autopassword-failed').hide();
          }
      }

  }
  $scope.matchPassword = function($event) {
      if ($event.key == "CapsLock") {
          return;
      }
      if (($scope.user.password != "") && ($event.target.value != "")) {
          if ($scope.user.password == $event.target.value + $event.key) {
              $('#password-failed').hide();
              $('#password-success').show();

          } else {
              $('#password-success').hide();
              $('#password-failed').show();
          }
      } else {
          $('#password-success').hide();
          $('#password-failed').show();
      }

      if ($event.key == "Backspace") {
          var valueLength = $event.target.value.length - 1;
          if ($event.target.value == "" || !valueLength) {
              $('#password-failed').hide();
          }
      }

  }

  $scope.submitPassword = function(event) {
    $('#spinner').show();
      var form = $('#changePassword')[0];
      var autoPassword = sessionStorage.getItem("password")
      if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
      }
      form.classList.add('was-validated');
      if (autoPassword != "" && $scope.user.autopassword != "") {
          if (autoPassword == $scope.user.autopassword) {
              $('#autopassword-success').show();
              $('#autopassword-failed').hide();
          } else {
              $('#autopassword-success').hide();
              $('#autopassword-failed').show();
              return;
          }
      }
      if ($scope.user.password != "" && $scope.user.confirmpassword != "") {
          if ($scope.user.password == $scope.user.confirmpassword) {
              $('#password-success').show();
              $('#password-failed').hide();
          } else {
              $('#password-success').hide();
              $('#password-failed').show();
              return;
          }
      }
      if (form.checkValidity()) {
          var config = {
              headers: {
                  'Content-Type': 'application/json'
              }
          }
          var data = $scope.user;
          data.email = sessionStorage.getItem("email");
          data.password = crypto.encryptMessage(data.password);
          $http.post('http://localhost:3000/forgotpassword/updateUserById', data, config).then(function(response) {
              // This function handles succes
              console.log(response);
              let data = {
                "subject": "Password Changed",
                "email": sessionStorage.getItem("email"),
                "text":'<img src="cid:unique@kreata.ee"/>',
                "src":"password_changed.png"
            }
            $http.post('http://localhost:3000/forgotpassword/sendEmail', data, config).then(function(response) {
                // This function handles succes
                console.log(response);
                $('#spinner').hide();
                $('#passwordModal').modal('show');
            }, function(response) {
                $('#spinner').hide();
                // this function handles error
                console.log(response);
            });
          }, function(response) {
            $('#spinner').hide();
              // this function handles error
              console.log(response);
          });
      }
  }
});