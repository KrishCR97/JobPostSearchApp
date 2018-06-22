var app = angular.module('myApp', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: '/login.html',
        controller: 'loginController'
    }).when('/signup', {
        templateUrl: '/signup.html',
        controller: 'signUpController'
    })
});
// ,
//         resolve : ['authService',function(authService){
//             return authService.checkUserStatus();
//         }]
var userLogin = {
    userName: '',
    password: ''
}
app.factory('authService', function ($http, $q) {
    return {
        checkUserStatus: function () {
            var defer = $q.defer();
            console.log(userLogin);
            $http.post('http://localhost:4000/checkLogin', JSON.stringify(userLogin)).then(function (data) {
                //console.log(data);
                console.log(data);
                if (data.data.validUser) {
                    defer.resolve();
                }
                else {
                    defer.reject();
                }
            })
            return defer.promise;
        }
    }
});
app.controller('loginController', function ($scope, authService) {

    $scope.checkLogin = function () {
        userLogin.userName = $scope.userName;
        userLogin.password = $scope.password;
        console.log(userLogin);
        alert('Hello');
        authService.checkUserStatus().then(function () {
            console.log('Sucess');
        }, function () {
            console.log('Failed');
        });
    }
});

app.controller('signUpController', function ($scope, $http,$location) {
    $scope.userType = [
        "Comapny", "JobSeeker"
    ];
    $scope.createNewUser = function () {
        var newUserDetails = {
            userName: $scope.signUpForm.userName,
            password: $scope.signUpForm.password,
            firstName: $scope.signUpForm.firstName,
            lastName: $scope.signUpForm.lastName,
            email: $scope.signUpForm.email,
            phoneNum: $scope.signUpForm.phNum,
            location: $scope.signUpForm.location,
            userType: $scope.selectedUser
        }
        $http.post("http://localhost:4000/saveUser", JSON.stringify(newUserDetails)).then((data) => {
            if (data.data.savedUser) {
                $location.path('/login');
            }
        });
    }
});