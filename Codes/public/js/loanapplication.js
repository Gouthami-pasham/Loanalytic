(function() {
    $('#spinner').hide();
    window.onload = (event) => {
      validate();
    };
  /*window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
     
      validate();
  }, false);*/

})();


var app = angular.module('myApp', ['ngSanitize']);
app.controller('navController',function($scope){
    $scope.isVisible = false;
});
function validate() {
  // Loop over them and prevent submission
  var form = $('#loanApplication')[0];
  var scope = angular.element('[ng-controller=formCtrl]').scope()
  form.addEventListener('submit', scope.submitForm);


}

function formatDate() {
  var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}


function randomNumber(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var creditScores = ["802", "594", "678", "734", "893", "696", "598", "610", "900", "843", "768", "668", "545", "864", "620", "659", "524", "792", "885", "616", "571", "607"];


function displayImage(input) {
  var img_id = "";
  if (input.files && input.files[0]) {
      if (input.id == "addressProof") {
          img_id = "#address_img";
      } else if (input.id == "ssnProof") {
          img_id = "#ssn_img";
      } else {
          img_id = "#income_img";
      }
      var reader = new FileReader();

      reader.onload = function(e) {
          $(img_id)
              .attr('src', e.target.result)
              .width(100)
              .height(100);
      };

      reader.readAsDataURL(input.files[0]);
  }
}


function uploadFiles(input) {
  var fd = new FormData();
  //Take the first selected file
  fd.append("file", input.files[0]);

  /*$http.post("http://localhost:3000/loanapplication/uploadDocument", fd, {
      withCredentials: true,
      headers: {'Content-Type': undefined },
      transformRequest: angular.identity
  }).then(function (response) {
    console.log(response);
  },
  function(response){
    console.log(response);
  });*/
}


function addHidden(theForm, key, value) {
  // Create a hidden input element, and append it to the form:
  var input = document.createElement('input');
  input.type = 'hidden';
  input.name = key; // 'the key/name of the attribute/field that is sent to the server
  input.value = value;
  theForm.appendChild(input);
}

// Form reference:


app.controller('formCtrl', function($scope, $http) {
  $scope.loanApplication = {
      applicationId: "",
      User_id: sessionStorage.getItem("userEmail"),
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      loanAmount: "",
      propertyTax: "",
      downPayment: "",
      loanTerm: "",
      interestType: "",
      ssn: "",
      gender: "",
      loanType: "",
      income: "",
      applicationDate: formatDate(),
      status: "In Progress",
      creditScore: creditScores[randomNumber(0, 20)],
      premium:""
  };
  $scope.reset = function() {

  };

  $scope.getApplicationId = function($event) {
      var toDate = new Date();
      var month = toDate.getMonth() + 1;
      var day = toDate.getDate();
      var year = toDate.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return year + "" + month + "" + day + "" + toDate.getHours() + "" + toDate.getMinutes() + "" + toDate.getSeconds();
  }

  $scope.calculateInterest = function(total,year,rate){
      return (rate/ 100) * total;
  },

  $scope.calculatePremium = function(){
    var loanTerm = $scope.loanApplication.loanTerm;
    var loanAmount = parseInt($scope.loanApplication.loanAmount);
    var interestType = $scope.loanApplication.interestType;
    var premium = "";
    switch(interestType){
      case "Monthly":
          var term = parseInt(loanTerm.split(" ")[0]);
          var totalMonths = term * 12;
          var interest = ($scope.calculateInterest(loanAmount,term,15))/totalMonths;
          premium = (loanAmount/totalMonths) + interest;
          break;
      case "Quarterly":
              var term = parseInt(loanTerm.split(" ")[0]);
              var totalMonths = (term * 4);
              var interest = ($scope.calculateInterest(loanAmount,term,15))/totalMonths;
              premium = (loanAmount/totalMonths) + interest;
              break;
      
      case "Halfyearly":
              var term = parseInt(loanTerm.split(" ")[0]);
              var totalMonths = (term * 2);
              var interest = ($scope.calculateInterest(loanAmount,term,15))/totalMonths;
              premium = (loanAmount/totalMonths) + interest;
              break;
      
      case "Yearly":
              var term = parseInt(loanTerm.split(" ")[0]);
              var totalMonths = term;
              var interest = ($scope.calculateInterest(loanAmount,term,15))/totalMonths;
              premium = (loanAmount/totalMonths) + interest;
              break;
      }
      return premium;
  }

  $scope.submitForm = function(event) {
    $('#spinner').show();
      var form = $('#loanApplication')[0];
      //var data =  $('#loanApplication').serialize();
      if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          $('#spinner').hide();
      }
      form.classList.add('was-validated');
      var theForm = document.getElementById('documentForm');
      if (theForm[0].files.length == 0 && theForm[1].files.length == 0 && theForm[2].files.length == 0) {
        $('#spinner').hide();
          window.alert("Please upload required documents");
          return;
      }
      if (form.checkValidity()) {
          var config = {
              headers: {
                  'Content-Type': 'application/json'
              }
          }
          var data = $scope.loanApplication;
          data.ssn = parseInt($scope.loanApplication.ssn);
          data.applicationId = parseInt($scope.getApplicationId());
          data.premium = $scope.calculatePremium();
          
          $http.post('http://localhost:3000/loanapplication/saveApplication', data, config).then(function(response) {
              // This function handles succes
              console.log(response);
              var theForm = document.forms['documentForm'];
              // Add data:
              addHidden(theForm, 'application_id', $scope.loanApplication.applicationId);
              // Submit the form:
              /* $('#documentForm').ajaxSubmit(function() {
              });*/
              var fd = new FormData(document.forms['documentForm']);
              //Take the first selected file

              $http.post("http://localhost:3000/loanapplication/uploadDocument", fd, {
                  withCredentials: true,
                  headers: {
                      'Content-Type': undefined
                  },
                  transformRequest: angular.identity
              }).then(function(response) {
                      console.log(response);
                     
                  },
                  function(response) {
                      console.log(response);
                      $('#spinner').hide();
                  });
              var data = {
                  "subject": "Loan Application status",
                  "text": '<img src="cid:unique@kreata.ee" width="600px" height="500px" /> <br><h1 style="color:#008f95;">Your Loan Application created sucessfully</h1>',
                  "email": $scope.loanApplication.email,
                  "src": "apply.png"
              }

              $http.post('http://localhost:3000/loanapplication/sendEmail', data, config).then(function(response) {
                  // This function handles succes
                  console.log(response);
                  if(response.status == 200 && response.statusText == "OK"){
                    $('#spinner').hide();
                    $('#applicationModal').modal('show');
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
  }
});

$('#applicationModal').on('hidden.bs.modal', function(e) {
  location.href = '/viewapplication';
});