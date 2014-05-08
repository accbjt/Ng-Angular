var app = angular.module("myApp", []);

app.config(function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: "templates/home.html",
        controller: 'HomeController'
    })
        .when ('/settings',{
        templateUrl: "templates/settings.html",
        controller: 'SettingsController'
    })
        .otherwise({redirectTo: '/'});
});

app.controller('HomeController', function($scope){
    $scope.selectedMail;

    $scope.setSelectedMail = function(mail){
        $scope.selectedMail = mail
    };

    $scope.isSelected = function(mail){
        if ($scope.selectedMail){
            return $scope.selectedMail === mail
        }
    }
});

app.controller('MailListingController', ['$scope', '$http', function($scope, $http){
    $scope.email = [];

    $http({
        method: 'GET',
        url: '/api/mail'
    })
        .success(function(data, status, headers){
            $scope.email = data.all;
        })
        .error(function(data, status, headers){

        })

}]);

app.controller('ContentController', function($scope){

});

app.controller('SettingsController', function($scope){
    $scope.settings = {
        name: "Ari",
        email: "me@example.com"

    }

    $scope.updateSettings = function(){
        console.log ("updateSettings was called");
    }
});