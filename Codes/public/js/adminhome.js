function goToPage(path){
    location.href = path;
}

function checkUser(){
    
}
var app = angular.module('myApp', ['ngSanitize']);
app.controller('navController',function($scope){
    $scope.isVisible = false;
});