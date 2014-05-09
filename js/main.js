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

app.service('mailService', ['$http', '$q', function($http, $q){
    var getMail = function(){
        return $http({
            method: 'GET',
            url: '/api/mail'

        })
    };

    var sendEmail = function(mail){
        var d =$q.defer();
        $http({
            method: 'POST',
            data: mail,
            url: 'api/send'
        }).success(function(data, status, headers){
            d.resolve(data);
        }).error(function(data, status, headers){
            d.reject(data);
        });
        return d.promise;
    };

    return{
        getMail: getMail,
        sendMail: sendMail
    };
}]);

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

app.controller('MailListingController', ['$scope', 'mailService', function($scope, $http){
    $scope.email = []

        mailService.getMail()
        .success(function(data, status, headers){
            $scope.email = data.all;
        })
        .error(function(data, status, headers){

        });

}]);

app.controller('ContentController', ['$scope', '$rootScope', 'mailService', function($scope, mailService, $rootScope){
    $scope.showingReply = false;
    $scope.reply = {};


    $scope.toggleReplyForm = function(){
        $scope.showingReply = !$scope.showingReply;
        $scope.reply = {};
        $scope.reply.to = $scope.selectedMail.from.join(", ");
        $scope.reply.body = "\n\n ---------------- \n\n" + $scope.selectedMail.body;
    };

    $scope.sendReply = function(){
        $scope.showingReply = false;
        mailService.sendEmail($scope.reply)
            .then(function(status){

            }, function(err){

            });
    };

    $scope.$watch('selectedMail', function(evt){
        $scope.showingReply = false;
    })
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