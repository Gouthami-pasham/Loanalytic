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
              }, function (response) {
              
              // this function handles error
              console.log(response);
              });
          } 
    }
  });