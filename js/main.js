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

app.controller('ContentController', ['$scope', function($scope){
    $scope.showingReply = false;
    $scope.reply = {};


    $scope.toggleReplyForm = function(){
        $scope.showingReply = !$scope.showingReply;
        $scope.reply = {};
        $scope.reply.to = $scope.selectedMail.from.join(", ");
        $scope.reply.body = "\n\n ----------------\n\n" + $scope.selectedMail.body;

    }
}]);

app.controller('SettingsController', function($scope){
    $scope.settings = {
        name: "Ari",
        email: "me@example.com"

    };

    $scope.updateSettings = function(){
        console.log ("updateSettings was called");
    }
});