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


var app = angular.module('myApp', ['ngSanitize']);
app.controller('navController',function($scope){
    $scope.isVisible = false;
});
  app.controller('formCtrl', function($scope,$http) {
    $scope.user = {
      FirstName: "", 
      LastName: "",
      Mobile:"",
      Email:"",
      DateOfBirth:"",
      SSN:"",
      Employeestatus:"",
      password:"",
      confirmpassword:"",
    };
    $scope.reset = function() {
     
    };
    $scope.crypto = (function(){
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
              $scope.user.DateOfBirth = new Date($scope.user.DateOfBirth);
              $scope.user.password = $scope.crypto.decryptMessage( $scope.user.password);
              $scope.user.confirmpassword = $scope.user.password;
              
    }, function(response) {
        // this function handles error
        console.log(response);
    })
},
    $scope.goToProfile = function(){
        location.href = "/profile";
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
      
      $scope.user.DateOfBirth = $scope.user.DateOfBirth; 
      var data = $scope.user;
      data.DateOfBirth = formatDate($scope.user.DateOfBirth);
      data.SSN = parseInt($scope.user.SSN);
      data.password = $scope.crypto.encryptMessage(data.password);
        $http.post('http://localhost:3000/register/updateUser', data, config).then(function (response) {
          // This function handles succes
          console.log(response); 
          var data = {
            "subject": "Profile update",
            "text": '<img src="cid:unique@kreata.ee" width="600px" height="500px" /> <br><h1 style="color:#008f95;"> Hello '+$scope.user.FirstName+ ', your profile has been updated successfully</h1>',
            "email": $scope.user.Email,
            "src":"updated.jpg"
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
    location.href = '/profile';
});


  