"use strict";

 
var cs194hApp = angular.module('cs194hApp', []);
/**
 * Create a controller named 'MainController'.  The array argument specifies the controller
 * function and what dependencies it has.  We specify the '$scope' service so we can have access
 * to the angular scope of view template.
 */
cs194hApp.controller('HomeController', ['$scope', function($scope) {
   // We defined an object called 'main' with a single property 'title' that is used
   // by the html view template to get the page's title in the browser tab.

   Parse.initialize("3r4Ojai6mYESGymkDVf48wzZDIuBPaF9J0CHCCS7", "I2IBiCAt0Tf0lrXiX8MoMvpwbzIEyjz3Td8GrLYC");

   $scope.title = 'MRTRUMP';

   $scope.teacherName = "MR. TRUMP";
   // UB4KnOZOoJ = Mr.Trump's TeacherID
   //password: 2 ,email: 2@test.com
   var myID = 'UB4KnOZOoJ';

   var Class = Parse.Object.extend("Class");
   var classesQuery = new Parse.Query(Class);
   classesQuery.equalTo("TeacherID", myID);
   $scope.myClasses=[];
   classesQuery.find({
       success: function(classes) {
       for (var i=0; i < classes.length; i++){
           //if(true) {//classes[i].get("TeacherID") === $scope.teacherID){
            var result = [];
            result.name = classes[i].get("ClassName");
            result.id = classes[i].id;
            result.parseObject = classes[i];
            $scope.myClasses.push(result);
       }
       $scope.$apply();

       },
       error: function(error) {
           console.log('error');
           alert("Error: " + error.code + " " + error.message);
       }
   });

   $scope.selectClass = function(c) {
      console.log(c.name);
   }

   $scope.newClass = function() {
      console.log('new class');
   }


}]);


