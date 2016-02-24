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
            result.code = classes[i].get("ClassCode");
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
   $scope.randPic = function() {
      var pict = 1;
      return "img/" + pict + ".jpg";
   }


   $scope.selectClass = function(c) {
      console.log(c.name);
   }

   $scope.formMessage = "Create a New Class";

   $scope.addingClass = false;
   $scope.classCode;
   $scope.className;
   $scope.createClass = function() {
      if($scope.editingClass) {
         //change name of existing class
         console.log($scope.editClassIs);


         $scope.editClassIs = undefined;
      }else {
         //add class

      }

      $scope.addingClass = false;
   }
   $scope.editClassIs = undefined;
   $scope.editingClass = true;
   $scope.editClass = function(classClicked) {
      $scope.editClassIs = classClicked;
      $scope.editingClass = true;
      $scope.formMessage = "Edit Class Name";
      $scope.addingClass = true;
   }


   $scope.newClass = function() {
      console.log('new class');
      $scope.formMessage = "Create a New Class";
      $scope.editingClass = false;
      $scope.addingClass = true;
   }

   $scope.list = false;
   $scope.swapLayout = function() {
      $scope.list = !($scope.list);
   }

   $scope.logOut = function() {
      console.log("out");
   }

}]);



