(function() {

  window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      validate();
  }, false);

})();
var app = angular.module('myApp', []);

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


var app = angular.module('myApp', []);
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
      creditScore: creditScores[randomNumber(0, 20)]
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

  $scope.submitForm = function(event) {
      var form = $('#loanApplication')[0];
      //var data =  $('#loanApplication').serialize();
      if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
      }
      form.classList.add('was-validated');
      var theForm = document.getElementById('documentForm');
      if (theForm[0].files.length == 0 && theForm[1].files.length == 0 && theForm[2].files.length == 0) {
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
                      $('#applicationModal').modal('show');
                  },
                  function(response) {
                      console.log(response);
                  });
              var data = {
                  "subject": "Loan Application",
                  "text": '<img src="cid:unique@kreata.ee" width="600px" height="500px" /> <br><h1 style="color:#008f95;">Your Loan Application created sucessfully</h1>',
                  "email": $scope.loanApplication.email,
                  "src": "register.png"
              }

              /*$http.post('http://localhost:3000/loanapplication/sendEmail', data, config).then(function(response) {
                  // This function handles succes
                  console.log(response);
                  if(response.status == 200 && response.statusText == "OK"){
                    
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
  }
});

$('#applicationModal').on('hidden.bs.modal', function(e) {
  location.href = '/viewapplication';
});