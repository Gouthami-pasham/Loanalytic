(function() {
    $('#spinner').hide();
    window.onload = (event) => {
        validate();
      };
  })();

var app = angular.module('myApp', ['ngSanitize']);

app.controller('navController',function($scope){
    $scope.isVisible = false;
});

function validate(){
    // Loop over them and prevent submission
    var form = $('#contact')[0];
    var scope = angular.element('[ng-controller=contactCtrl]').scope()
    form.addEventListener('submit', scope.submitForm);
  }

var contact = function($scope, $http) {
    $scope.user= {};
    $scope.contactForm= {
        name:"",
        email:"",
        message:""
    };
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
      $scope.goToHome = function(){
        location.href = "/userhome";
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
              $scope.contactForm.name = $scope.user.FirstName + " "+ $scope.user.LastName;
              $scope.contactForm.email = $scope.user.Email;
    }, function(response) {

        // this function handles error
        console.log(response);
    });
},
$scope.submitForm = function(event){
    $('#spinner').show();
    var form = $('#contact')[0];
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        $('#spinner').hide();
      }
      form.classList.add('was-validated'); 
      if (form.checkValidity()) {
      var config = {
        headers : {
            'Content-Type': 'application/json'
        }
    }
        var data = {
          "subject": "Query's & Questions",
          "text": '<img src="cid:unique@kreata.ee" width="600px" height="500px" />'+
           '<br><h1 style="color:#008f95;"> Name : ' +$scope.contactForm.name+'</h1>'+
           '<br><h1 style="color:#008f95;"> Email : ' +$scope.contactForm.email+'</h1>'+
           '<br><h1 "> Message : ' + $scope.contactForm.message+'</h1>',
          "email":"supp.loanalytic2019@gmail.com",
          "src":"contactus.png"
      }
      $http.post('http://localhost:3000/register/sendEmail', data, config).then(function(response) {
          // This function handles succes
          console.log(response);
          if(response.status == 200 && response.statusText == "OK"){
            $('#spinner').hide();
            $('#registerModal').modal('show');
          }
          
      }, function(response) {
        $('#spinner').hide();
          // this function handles error
          console.log(response);
      });
        
     
    }  
  }
}


app.controller('contactCtrl', contact);

$('#registerModal').on('hidden.bs.modal', function (e) {
    location.href = '/userhome';
});