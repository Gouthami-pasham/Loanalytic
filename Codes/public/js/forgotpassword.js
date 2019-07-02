(function(){
    window.addEventListener('load', function() {
    $('#sendEmail').show();
    $('#changePassword').hide();
    validate();
    });
})();


function validate(){
    // Loop over them and prevent submission
    var form = $('#sendEmail')[0];
    var scope = angular.element('[ng-controller=mailformCtrl]').scope()
    form.addEventListener('submit', scope.searchMail);
  }

  var app = angular.module('myApp', []);
  app.controller('mailformCtrl', function($scope,$http) {
    $scope.user = {
      mail: "", 
    };

    $scope.subject = "New Password change";
    $scope.email = "";
    $scope.randomPassword = function(){
          return "test123$";
    }
    $scope.htmlTemplate = "<!DOCTYPE html> <html lang=\"en\"><h2 style=\"justify-content:center;\"> Please find the New password below</h2>"+
    "<h3 style=\"justify-content:center;\">"+$scope.randomPassword()+"</h3>"+
    "<p style=\"justify-content:center;\">Please enter this password in the change password page and then enter your custom password</p></html>"

    $scope.searchMail = function(event){
        var form = $('#sendEmail')[0];
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated'); 
        var data = $scope.user;
        if (form.checkValidity()) {
            var config = {
              headers : {
                  'Content-Type': 'application/json'
              }
          }
            $http.post('http://localhost:3000/forgotpassword/getUserById', data, config).then(function (response) {
              // This function handles succes
              console.log(response); 
              if(!response.data.length){
                alert("User Id is not found");
              }
              else{
                alert("sucess");
                $('#sendEmail').hide();
                $('#changePassword').show();
                $scope.email = response.data[0].Email;
                var data = {
                  "subject" : $scope.subject,
                  "text":$scope.htmlTemplate,
                  "email":$scope.email
                }
                $http.post('http://localhost:3000/forgotpassword/sendEmail', data, config).then(function (response) {
                  // This function handles succes
                  console.log(response); 
                 
              }, function (response) {
              
              // this function handles error
              console.log(response);
              });
          } 
    },function (response) {
              
      // this function handles error
      console.log(response);
      });
    };
  }
});
  
