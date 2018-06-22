var app = angular.module('myApp',['ngRoute']);
app.config(function($routeProvider){
    $routeProvider.when('/login',{
        templateUrl : '/login.html',
        controller : 'loginController'
    }).when('/signup',{
        templateUrl : '/signup.html',
        controller : 'signUpController',
        resolve : ['authService',function(authService){
            return authService.checkUserStatus();
        }]
    })
});
var userLogin = {
        userName: '',
        password: ''
}
app.factory('authService',function($http,$q){
return {
    checkUserStatus : function(){
        var defer = $q.defer();
        $http.post('http://localhost:4000/checkLogin',JSON.stringify(userLogin)).then(function(data){
        if(data.data.validUser){
            defer.resolve();
        }
        else{
            defer.reject();
        }
        })
        return defer.promise;
    }
}
});
app.controller('loginController',function($scope,authService){
userLogin = {
    userName: $scope.userName,
    password: $scope.password
}
});

app.controller('signUpController',function($scope){
$scope.createNewUser =  function(){
    
}
});