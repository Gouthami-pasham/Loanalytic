(function() {
    
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      $('#password-failed').hide();
      $('#password-success').hide();
      validate();
    }, false);
   
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
          }, function (response) {
          
          // this function handles error
          console.log(response);
          });
      }  
    }
  });


  