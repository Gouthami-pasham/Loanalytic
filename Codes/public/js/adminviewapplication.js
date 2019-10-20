(function() {
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
    
    //   var scope = angular.element('[ng-controller=viewApplications]').scope()
    //   scope.getTotalApplication();
    }, false);
   
  })();
//ng-init="getTotalApplication()"
var app = angular.module('myApp', []);
app.controller('viewApplications', function($scope, $http) {
    $scope.totalApplication = [];
    $scope.onApprove = function(application){
        $scope.approveApplication = application;
        $('#approveModal').modal('show');
    }

    $scope.onReject = function(application){
        $scope.rejectApplication = application;
        $('#rejectModal').modal('show');
    }
    $scope.getTotalApplication = function(){
        var data = {
            test: "test"
        };
        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
        $http.get('http://localhost:3000/adminviewapplication/getTotal').then(function(response) {
              // This function handles succes
              console.log(response);
              $scope.totalApplication = response.data;
        
    }, function(response) {

        // this function handles error
        console.log(response);
    });
}
$scope.updateApplicationStatus = function(status){
    var applicationData = {}; 
    var src = "";
    if(status == "Approved"){
        applicationData = $scope.totalApplication[$scope.approveApplication]
        src = "approve.png"

      }
      else{
        applicationData = $scope.totalApplication[$scope.rejectApplication]
        src = "rejected.jpg"
      }
    var data = {
        status: status,
        applicationId:applicationData.Application_id
    };
    var config = {
        headers : {
            'Content-Type': 'application/json'
        }
    }
    $http.post('http://localhost:3000/adminviewapplication/updateStatus',data,config).then(function(response) {
          // This function handles succes
          console.log(response);
          $scope.approveApplication = "";
          $scope.rejectApplication = ""
          if(status == "Approved"){
            $('#approveModal').modal('hide');
            $('#approveSuccessModal').modal('show');
          }
          else{
            $('#rejectModal').modal('hide');
            $('#rejectSuccessModal').modal('show');
          }
          /*var data = {
            "subject": "Application Status",
            "text": '<img src="cid:unique@kreata.ee" width="600px" height="500px" /> <br><h1 style="color:#008f95;">Welcome to Loanalytic</h1>',
            "email": applicationData.Email,
            "src":src
        }
       
                if(status == "Approved"){
                    $('#approveModal').modal('hide');
                    $('#approveSuccessModal').modal('show');
                  }
                  else{
                    $('#rejectModal').modal('hide');
                    $('#rejectSuccessModal').modal('show');
                  }
            }
            
        }, function(response) {

            // this function handles error
            console.log(response);
        });*/
         
          
    
}, function(response) {

    // this function handles error
    console.log(response);
});
}
});

$('#approveSuccessModal').on('hidden.bs.modal', function (e) {
    var scope = angular.element('[ng-controller=viewApplications]').scope()
    scope.getTotalApplication();
});

$('#rejectSuccessModal').on('hidden.bs.modal', function (e) {
    var scope = angular.element('[ng-controller=viewApplications]').scope()
    scope.getTotalApplication();
});

function updateStatus(applicationStatus){
    var scope = angular.element('[ng-controller=viewApplications]').scope()
    scope.updateApplicationStatus(applicationStatus);
}