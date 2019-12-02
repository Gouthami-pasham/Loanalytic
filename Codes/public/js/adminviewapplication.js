(function() {
    $('#spinner').hide();
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
    
    //   var scope = angular.element('[ng-controller=viewApplications]').scope()
    //   scope.getTotalApplication();
    }, false);
    //collapseList();
  })

 var panelTest = $('.panel');
 var app = angular.module('myApp',['ngSanitize']);
 app.controller('navController',function($scope){
     $scope.isVisible = false;
 });

 var panelList = document.getElementsByClassName('panel');
 for (var i = 0; i < panelList.length; ++i) {
     var item = panelList[i];  
     $(item).find('.panel-body').slideUp();
     $(item).find('div.panel-heading.panelColor').addClass('panel-collapsed');
     //item.innerHTML = 'this is value';
 }
  $(document).on('click', '.panel-heading.panelColor', function(e){
    var $this = $(this);
	if(!$this.hasClass('panel-collapsed')) {
		$this.parents('.panel').find('.panel-body').slideUp();
		$this.addClass('panel-collapsed');
		$this.find('i').removeClass('fa fa-minus').addClass('fa fa-plus');
		
	} else {
		$this.parents('.panel').find('.panel-body').slideDown();
		$this.removeClass('panel-collapsed');
		$this.find('i').removeClass('fa fa-plus').addClass('fa fa-minus');	
	}
})


//ng-init="getTotalApplication()"
var app = angular.module('myApp', ['ngSanitize']);
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
    $scope.getTotalApplication = function(){
        var data = {
            test: "test"
        };
        $('#spinner').show();
        var sampleResponse = [
            {
                "FirstName":"Gangadhar",
                "Email":"asasdjndsank@gmail.com",
                "Phone":"66055280325",
                "LoanAmount": "43000",
                "LoanTerm":"3 years",
                "InterestType": "CreditScore",
                "CreditScore":"678",
                "Status":"In Progress",
                "ApplicationDate":"11-09-2019"
            }
        ]
        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
        $scope.totalApplication = sampleResponse;
       $http.get('http://localhost:3000/adminviewapplication/getTotal').then(function(response) {
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
        $('#spinner').hide();
          
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
$scope.updateApplicationStatus = function(status){
    $('#spinner').show();
    var applicationData = {}; 
    var src = "";
    if(status == "Approved"){
        applicationData = $scope.totalApplication[$scope.approveApplication]
        src = "approved.png"

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
          var data = {
            "subject": "Application Status #" +applicationData.Application_id,
            "text": '<img src="cid:unique@kreata.ee" width="600px" height="500px" /> <br><h1 style="color:#008f95;">Loanalytic</h1>',
            "email": applicationData.Email,
            "src":src
        } 
        $http.post('http://localhost:3000/loanapplication/sendEmail', data, config).then(function(response) {
                  // This function handles succes
                  console.log(response);
                  if(response.status == 200 && response.statusText == "OK"){
                    if(status == "Approved"){
                        $('#approveModal').modal('hide');
                        $('#approveSuccessModal').modal('show');
                        $('#spinner').hide();
                      }
                      else{
                        $('#rejectModal').modal('hide');
                        $('#rejectSuccessModal').modal('show');
                        $('#spinner').hide();
                      }
                }
                     
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