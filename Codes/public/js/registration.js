(function() {
    $('#spinner').hide();
    window.onload = (event) => {
      $('#password-failed').hide();
      $('#password-success').hide();
      $('#date-failed').hide();
      validate();
    };
   /* window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      $('#password-failed').hide();
      $('#password-success').hide();
      $('#date-failed').hide();
      validate();
    }, false);*/
   
  })();

  

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

let crypto = (function(){
  return{
    encryptMessage: function(messageToencrypt){
      var encryptedMessage = CryptoJS.AES.encrypt(messageToencrypt, "password");
      console.log(encryptedMessage);
      return encryptedMessage.toString();
    },
    decryptMessage: function(encryptedMessage){
      var decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage, "password");
      var decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);

      return decryptedMessage;
    }
  }
})();

var app = angular.module('myApp', ['ngSanitize']);
app.controller('navController',function($scope){
    $scope.isVisible = false;
});
  app.controller('formCtrl', function($scope,$http) {
    $scope.user = {
      firstName: "", 
      lastName: "",
      gender:"",
      phone:"",
      email:"",
      dateofbirth:"",
      ssn:"",
      employeestatus:"",
      password:"",
      confirmpassword:"",
      isactivated:"N"
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
    
    $scope.matchPassword = function($event){
      if($event.key == "CapsLock"){
        return; 
      }
      if(($scope.user.password != "") && ($event.target.value != "")){
          if($scope.user.password == $event.target.value + $event.key){
            $('#password-failed').hide();
            $('#password-success').show();
            
          }
          else{
            $('#password-success').hide();
            $('#password-failed').show();
          }
      }
      else{
        $('#password-success').hide();
        $('#password-failed').show();
      }

      if($event.key == "Backspace"){
        var valueLength = $event.target.value.length - 1;
        if($event.target.value == "" || !valueLength){
          $('#password-failed').hide();
        }   
      }
    }
    $scope.submitForm = function(event){
      $('#spinner').show();
      var form = $('#userRegsitration')[0];
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        $('#spinner').hide();
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
          $('#spinner').hide();
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
      data.password = crypto.encryptMessage(data.password);
        $http.post('http://localhost:3000/register/createuser', data, config).then(function (response) {
          // This function handles succes
          console.log(response); 
          var data = {
            "subject": "Email Verification",
            "text": '<img src="cid:unique@kreata.ee" width="600px" height="500px" />' +
            '<br><h1 style="color:#008f95;">Welcome to Loanalytic</h1>'+
            '<br><a href="http://localhost:3000/register/activateUser/'+$scope.user.email+'"'+' style="font-size:40px;">Click here to confirm your email</a>',
            "email": $scope.user.email,
            "src":"register.png"
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
          
          }, function (response) {
            $('#spinner').hide();
          // this function handles error
          console.log(response);
          });
      }  
    }
  });

  $('#registerModal').on('hidden.bs.modal', function (e) {
    location.href = '/';
});


  