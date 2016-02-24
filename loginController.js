"use strict";

/**
 * Create a controller named 'MainController'.  The array argument specifies the controller
 * function and what dependencies it has.  We specify the '$scope' service so we can have access
 * to the angular scope of view template.
 */
cs194hApp.controller('LoginController', ['$scope', function($scope) {
   // We defined an object called 'main' with a single property 'title' that is used
   // by the html view template to get the page's title in the browser tab.
   $scope.main = {};
   $scope.main.title = 'Login to clickED';

   Parse.initialize("3r4Ojai6mYESGymkDVf48wzZDIuBPaF9J0CHCCS7", "I2IBiCAt0Tf0lrXiX8MoMvpwbzIEyjz3Td8GrLYC");


   $scope.userSignIn = true;
   $scope.logIn = 'tab active';
   $scope.signUp = 'tab';
   $scope.main.emailAddr = 'martian@a.bc';
   $scope.main.firstName = 'John';
   $scope.main.lastName = 'Jones';
   $scope.main.password = 'martian';
   $scope.main.failLogin = '';


   $scope.main.successAs = '';
   $scope.main.curUser;

   //These are fields that might get changed later.
   //teacher currently always set, password confirm ignored.
   $scope.main.isTeacher = true;
   $scope.main.passwordConfirm = '';


   $scope.logInTab = function() {
   		$scope.logIn = 'tab active';
   		$scope.signUp = 'tab';
   		$scope.userSignIn = true;
   }
   $scope.signUpTab = function() {
   		$scope.logIn = 'tab';
   		$scope.signUp = 'tab active';
   		$scope.userSignIn = false;
   }

   $scope.logInUser = function() {
   		console.log($scope.main.emailAddr + ' ' + $scope.main.password);
   		Parse.User.logIn($scope.main.emailAddr, $scope.main.password, {
   			success: function(user) {
   				console.log("successfully logged in");
   				$scope.main.curUser = user;
               $scope.container.successUser = user;
   				$scope.main.successAs = "logged in: " + user.get("firstName");
   			   $scope.$apply();
            },
   			error: function(user, error) {
   				console.log("error");
   				alert("Error: " + error.code + " " + error.message);
   				$scope.main.failLogin = 'failed';
   				console.log($scope.main.failLogin);

   			}
   		});
   }

   $scope.signUpUser = function() {
   		console.log($scope.main.emailAddr + ' ' + $scope.main.password);
   		console.log($scope.main.firstName + ' ' + $scope.main.lastName);
   		var user = new Parse.User();
   		user.set("username", $scope.main.emailAddr);
   		user.set("password", $scope.main.password);
   		user.set("email", $scope.main.emailAddr);

   		user.set("firstName", $scope.main.firstName);
   		user.set("lastName", $scope.main.lastName);
   		user.set("isATeacher", $scope.main.isTeacher);
   		user.set("salutation", "Dr.");

   		user.signUp(null, {
   			success: function(user) {
   				$scope.main.curUser = user;
   				$scope.main.successAs = "signed in: " + user.get("firstName");
               $scope.container.successUser = user;
               $scope.main.curUser = user;
               $scope.$apply();
   			},
   			error: function(error) {
   				console.log("error on signin");
   				alert("Error: " + error.code + " " + error.message);
   			}
   		});

   }

}]);



