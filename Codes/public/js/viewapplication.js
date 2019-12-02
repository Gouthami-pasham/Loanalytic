(function() {
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
    
    //   var scope = angular.element('[ng-controller=viewApplications]').scope()
    //   scope.getTotalApplication();
    }, false);
   
  })();
//ng-init="getTotalApplication()"
var app = angular.module('myApp', ['ngSanitize']);
app.controller('navController',function($scope){
    $scope.isVisible = false;
});
app.controller('userViewApplications', function($scope, $http) {
    $scope.totalApplication = [];
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
      
        return "Application Date :"+ day + ' ' + monthNames[monthIndex] + ' ' + year;
      }
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
              var ids = "";
              for(var i=0;i<$scope.totalApplication.length;i++){
                    ids += ","+"'"+$scope.totalApplication[i].Application_id+"'";
                    $scope.totalApplication[i]["incomeProof"] = "";
                    $scope.totalApplication[i]["ssnProof"] = "";
                    $scope.totalApplication[i]["addressProof"] = "";
              }
              ids = ids.substring(1,ids.length);
              var data = {
                  "ids":ids
              }
        $http.post('http://localhost:3000/adminviewapplication/getDocuments',data,config).then(function(response) {
        // This function handles succes
            console.log(response);
            var documentData = response.data;
            for(var i=0;i<$scope.totalApplication.length;i++){
                for(var j=0;j<documentData.length;j++){
                        if($scope.totalApplication[i].Application_id == documentData[j].Application_id){
                            switch(documentData[j].DocumentType){
                                case "Address Proof":
                                    $scope.totalApplication[i].addressProof = documentData[j].DocumentPath;
                                    break;
                                case "Income Proof":
                                    $scope.totalApplication[i].incomeProof = documentData[j].DocumentPath; 
                                    break;
                                case "SSN Proof":
                                    $scope.totalApplication[i].ssnProof = documentData[j].DocumentPath; 
                                    break;
                            }
                        }
                }
            }
          
      }, function(response) {
  
          // this function handles error
          console.log(response);
      });
    }, function(response) {

        // this function handles error
        console.log(response);
    });
}

});

$(document).on("hide.bs.collapse show.bs.collapse", ".collapse", e => {
    $(this).prev().find("i:last-child").toggleClass("fa fa-minus fa fa-plus");
     var id = e.currentTarget.id.substring(11,e.currentTarget.id.length);
     $(e.currentTarget.parentElement).find("#btnText"+id)[0].innerHTML = "View Details" + " "+'<span class="fa-stack fa-sm"><i class="fa fa-arrow-up"></i></span>';
     $(e.currentTarget.parentElement).find("i").toggleClass("fa-arrow-up fa-arrow-down");
   });
 
   $(document).on("show.bs.collapse", ".collapse", e => {
     $(this).prev().find("i:last-child").toggleClass("fa fa-minus fa fa-plus");
      var id = e.currentTarget.id.substring(11,e.currentTarget.id.length);
      $(e.currentTarget.parentElement).find("#btnText"+id)[0].innerHTML = "Hide Details"+" " +'<span class="fa-stack fa-sm"><i class="fa fa-arrow-down"></i></span>';
      
      $(e.currentTarget.parentElement).find("i").toggleClass("fa-arrow-up fa-arrow-down");
    });