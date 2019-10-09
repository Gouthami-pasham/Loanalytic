function validate(){
    // Loop over them and prevent submission
    var form = $('#userRegsitration')[0];
    var scope = angular.element('[ng-controller=formCtrl]').scope()
    form.addEventListener('submit', scope.submitForm);
  }

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
  var app = angular.module('myApp', []);
  app.controller('formCtrl', function($scope,$http) {
    $scope.user = {
      firstName: "", 
      lastName: "",
      phone:"",
      email:"",
      dateofbirth:"",
      ssn:"",
      employeestatus:"",
      password:"",
      confirmpassword:"",
    };
    $scope.reset = function() {
     
    };

    $scope.validateDate = function($event){
      var birthday = event.currentTarget.valueAsDate;
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        var age =  Math.abs(ageDate.getUTCFullYear() - 1970);
       if(age < 21){
          $('#date-failed').show();
       }
       else{
        $('#date-failed').hide();
       }
       
    }
    
    $scope.submitForm = function(event){
      var form = $('#userRegsitration')[0];
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated'); 
      if($scope.user.password != "" && $scope.user.confirmpassword != ""){
        if($scope.user.password == $scope.user.confirmpassword){
          $('#password-success').show();
          $('#password-failed').hide();
        }
        else{
          $('#password-success').hide();
          $('#password-failed').show();
          return;
        }
      }
      if (form.checkValidity()) {
        $('#date-failed').hide();
        var config = {
          headers : {
              'Content-Type': 'application/json'
          }
      }
      
      $scope.user.dateofbirth = new Date($scope.user.dateofbirth); 
      var data = $scope.user;
      data.dateofbirth = formatDate($scope.user.dateofbirth);
      data.ssn = parseInt($scope.user.ssn);
        $http.post('http://localhost:3000/register/createuser', data, config).then(function (response) {
          // This function handles succes
          console.log(response); 
          var data = {
            "subject": "User Registration",
            "text": '<img src="cid:unique@kreata.ee" width="600px" height="500px" /> <br><h1 style="color:#008f95;">Welcome to Loanalytic</h1>',
            "email": $scope.user.email,
            "src":"register.png"
        }
        $http.post('http://localhost:3000/register/sendEmail', data, config).then(function(response) {
            // This function handles succes
            console.log(response);
            if(response.status == 200 && response.statusText == "OK"){
              $('#registerModal').modal('show');
            }
            
        }, function(response) {

            // this function handles error
            console.log(response);
        });
          
          }, function (response) {
          
          // this function handles error
          console.log(response);
          });
      }  
    }
  });

  $('#registerModal').on('hidden.bs.modal', function (e) {
    location.href = '/';
});
