describe('HomeController', function() {
  
  beforeEach(module('myApp'));
  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller('HomeController', {
      $scope: scope
    });
  }));
  
  var scope;
  var emails = [{
    from: ['ari@example.com'], to: 'me@example.com', subject: 'Test email 1'
  },
  {
    from: ['q@example.com'], to: 'me@example.com', subject: 'test email 2'
  }];
  
  it('sets selectedMail as undefined by default', function() {
    expect(scope.selectedMail).toBeUndefined();
  });
  
  it('sets a piece of mail as the selected piece of mail', function() {
    scope.setSelectedMail(emails[0]);
  });
});