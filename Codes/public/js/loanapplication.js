(function() {
    
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    validate();
  }, false);
 
})();
var app = angular.module('myApp', []);
function validate(){
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




function uploadFile(input){
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
        $('#blah')
            .attr('src', e.target.result)
            .width(150)
            .height(200);
    };

    reader.readAsDataURL(input.files[0]);
  var fd = new FormData();
  //Take the first selected file
  fd.append("file", input.files[0]);

  $http.post("http://localhost:3000/loanapplication/uploadDocument", fd, {
      withCredentials: true,
      headers: {'Content-Type': undefined },
      transformRequest: angular.identity
  }).then(function (response) {
    console.log(response);
  },
  function(response){
    console.log(response);
  });
}
}
  var app = angular.module('myApp', []);
  app.controller('formCtrl', function($scope,$http) {
    $scope.loanApplication = {
      applicationId :"",
      User_id:0,
      firstName: "", 
      lastName: "",
      phone:"",
      email:"",
      loanAmount:"",
      propertyTax:"",
      downPayment:"",
      loanTerm:"",
      interestType:"",
      ssn:"",
      gender:"",
      loanType:"",
      income:"",
      applicationDate:formatDate(),
      status:"In Progress",
      creditScore:""
    };
    $scope.reset = function() {
     
    };

   

    $scope.getApplicationId = function($event){
      var toDate = new Date();
      var month = toDate.getMonth()+1;
      var day = toDate.getDate();
      var year = toDate.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return year+""+month+""+day+""+toDate.getHours()+""+toDate.getMinutes()+""+ toDate.getSeconds();    
    }

    $scope.uploadDocument = function(input){
       /* var data = {
          hello : "test",
          fileName : files[0].name,
          fileType : files[0].type,
          file: files[0]
        }
        var config = {
          headers : {
              'Content-Type': 'application/json'
          }
        }
      $http.post('http://localhost:3000/loanapplication/uploadDocument', data, config).then(function(response) {
            // This function handles succes
            console.log(response);
            if(response.status == 200 && response.statusText == "OK"){
              
            }
            
        }, function(response) {

            // this function handles error
            console.log(response)
        })*/
      var fd = new FormData();
      fd.append('file',input.files);
      
      $http.post("http://localhost:3000/loanapplication/uploadDocument", fd, {
          headers: {'Content-Type': undefined },
          transformRequest: angular.identity
      }).then(function (response) {
        console.log(response);
      },
      function(response){
        console.log(response);
      });

      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah')
                .attr('src', e.target.result)
                .width(150)
                .height(200);
        };

        reader.readAsDataURL(input.files[0]);
    }
  var formData = document.getElementById('loanApplication');
  var dataSet = 12;
    
    }
    
    $scope.submitForm = function(event){
      var form = $('#loanApplication')[0];
     //var data =  $('#loanApplication').serialize();
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated'); 
      
      if (form.checkValidity()) {
        var config = {
          headers : {
              'Content-Type': 'application/json'
          }
        }
     
      var data = $scope.loanApplication;
      data.ssn = parseInt($scope.loanApplication.ssn);
      data.applicationId = parseInt($scope.getApplicationId());
        $http.post('http://localhost:3000/loanapplication/saveApplication', data, config).then(function (response) {
          // This function handles succes
          console.log(response); 
          var data = {
            "subject": "Loan Application",
            "text": '<img src="cid:unique@kreata.ee" width="600px" height="500px" /> <br><h1 style="color:#008f95;">Your Loan Application created sucessfully</h1>',
            "email": $scope.loanApplication.email,
            "src":"register.png"
        }

        var form_data = new FormData();
        
        /*$http.post('http://localhost:3000/loanapplication/createDocument', data, config).then(function(response) {
            // This function handles succes
            

            console.log(response);
            if(response.status == 200 && response.statusText == "OK"){
              
            }
            
        }, function(response) {

            // this function handles error
            console.log(response);
        });*/
        /*$http.post('http://localhost:3000/loanapplication/sendEmail', data, config).then(function(response) {
            // This function handles succes
            console.log(response);
            if(response.status == 200 && response.statusText == "OK"){
              
            }
            
        }, function(response) {

            // this function handles error
            console.log(response);
        });*/
          
          }, function (response) {
          
          // this function handles error
          console.log(response);
          });
      }  
    }
  });

 /*$('#registerModal').on('hidden.bs.modal', function (e) {
    location.href = '/';
});*/
