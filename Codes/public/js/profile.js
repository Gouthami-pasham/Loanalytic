(function() {
    /*window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
    
    //    var scope = angular.element('[ng-controller=userProfile]').scope()
    //    scope.getTotalApplication();
    }, false);*/
   
  })();

var app = angular.module('myApp', ['ngSanitize']);

app.controller('navController',function($scope){
    $scope.isVisible = false;
});

function goToEdit(){
  location.href = "/editprofile";
}

var userProfile = function($scope, $http) {
    $scope.user= {};
    $scope.formatDate = function(stringDate) {
        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
        var date = new Date(stringDate);
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
      
        return day + ' ' + monthNames[monthIndex] + ' ' + year;
      }
      $scope.goToEdit = function(){
        location.href = "/editprofile";
      }
    $scope.getUser = function(){
        var data = {
            email: sessionStorage.getItem("userEmail")
        };
        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
        $http.post('http://localhost:3000/register/getUserById',data,config).then(function(response) {
              // This function handles succes
              //console.log(response);
              $scope.user = response.data[0]; 
    }, function(response) {

        // this function handles error
        console.log(response);
    });
}

}
app.controller('userProfile', userProfile);
