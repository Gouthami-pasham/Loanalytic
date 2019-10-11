(function() {
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
    
    //   var scope = angular.element('[ng-controller=viewApplications]').scope()
    //   scope.getTotalApplication();
    }, false);
   
  })();
//ng-init="getTotalApplication()"
var app = angular.module('myApp', []);
app.controller('userViewApplications', function($scope, $http) {
    $scope.totalApplication = [];

    $scope.getApplication = function(){
        var data = {
            email: sessionStorage.getItem("userEmail")
        };
        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
        $http.post('http://localhost:3000/viewapplication/getApplication',data,config).then(function(response) {
              // This function handles succes
              console.log(response);
              $scope.totalApplication = response.data;
        
    }, function(response) {

        // this function handles error
        console.log(response);
    });
}

});

