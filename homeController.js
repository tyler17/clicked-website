"use strict";

 
//var cs194hApp = angular.module('cs194hApp', []);
/**
 * Create a controller named 'MainController'.  The array argument specifies the controller
 * function and what dependencies it has.  We specify the '$scope' service so we can have access
 * to the angular scope of view template.
 */
cs194hApp.controller('HomeController', ['$scope', function($scope) {
   // We defined an object called 'main' with a single property 'title' that is used
   // by the html view template to get the page's title in the browser tab.

   Parse.initialize("3r4Ojai6mYESGymkDVf48wzZDIuBPaF9J0CHCCS7", "I2IBiCAt0Tf0lrXiX8MoMvpwbzIEyjz3Td8GrLYC");

   $scope.title = 'Mr. Donald - class';
   $scope.teacherName = "Mr. Donald";
   // UB4KnOZOoJ = Mr.Trump's TeacherID
   //password: 2 ,email: 2@test.com
   var myID = 'UB4KnOZOoJ';
   var myName = 'Mr. Trump';

   myName = "Dr. " + $scope.container.successUser.get("lastName");
   $scope.teacherName = myName;
   myID = $scope.container.successUser.id;
   //$scope.container.selectClass;



   var loadClasses = function() {
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
   };
   loadClasses();
   $scope.randPic = function() {
      var pict = 1;
      return "img/" + pict + ".jpg";
   }


   $scope.selectClass = function(c) {
      console.log(c.name);
   }

   $scope.formMessage = "Create a New Class";

   $scope.addingClass = false;

   $scope.create = {};
   $scope.create.classCode = '';
   $scope.create.nameClass = '';

   $scope.cancelCreate = function() {
      $scope.editClassIs = undefined;
      $scope.create.classCode = '';
      $scope.create.nameClass = '';
      $scope.addingClass = false;
   }

   $scope.createClass = function() {
      if($scope.editingClass) {
         //change name of existing class
         if($scope.create.nameClass !== ''){
            console.log($scope.editClassIs);
            var classObj = $scope.editClassIs;
            $scope.editClassIs.parseObject.set("ClassName", $scope.create.nameClass);
            $scope.editClassIs.parseObject.save(null, {
               success: function(objClass) {
                  console.log("updated Successfully")
                  classObj.name = objClass.get("ClassName");
                  $scope.$apply(); //should update view
               }
            });
         }
         $scope.editClassIs = undefined;
      }else {
         if(($scope.create.nameClass !== '') && ($scope.create.classCode !== 0)) {
            //add class
            console.log($scope.create.classCode);
            console.log($scope.create.nameClass);
            var newClass = new Parse.Object("Class");
            newClass.set("ClassCode", $scope.create.classCode);
            newClass.set("TeacherName", myName);
            newClass.set("TeacherID", myID);

            newClass.set("ClassName", $scope.create.nameClass);


            newClass.save(null, {
               success: function(newClass) {
                  loadClasses();
               },
               error: function(newClass, error) {
                  console.log("error on signin");
                  alert("Error: " + error.code + " " + error.message);
               }
            });


         }
      }

      $scope.create.classCode = '';
      $scope.create.nameClass = '';
      $scope.addingClass = false;
   }

   $scope.deleteClass = function() {
      console.log($scope.editClassIs);
      console.log("delete^");
      $scope.editClassIs.parseObject.destroy({
         success: function(myObject) {
            console.log("destroyed!");
            loadClasses();
         },
         error: function(myObject, error) {
            console.log("no destroy :(");
            alert("No Delete: error: " + error.code + " " + error.message);
         }
      });
      $scope.cancelCreate();

   }

   $scope.createMessage = "Create Class";

   $scope.editClassIs = undefined;
   $scope.editingClass = true;
   $scope.editClass = function(classClicked) {
      $scope.editClassIs = classClicked;
      $scope.create.nameClass = classClicked.name;
      $scope.editingClass = true;
      $scope.formMessage = "Edit Class Name";
      $scope.createMessage = "Save Changes";
      $scope.addingClass = true;
   }

   $scope.questionsClass = function(classClicked) {
      $scope.container.selectClass = classClicked;
   }

   $scope.deselectClass = function() {
      $scope.container.selectClass = undefined;
   }


   $scope.newClass = function() {
      console.log('new class');
      $scope.formMessage = "Create a New Class";
      $scope.createMessage = "Create Class";
      $scope.editingClass = false;
      $scope.addingClass = true;
   }

   $scope.list = false;
   $scope.swapLayout = function() {
      $scope.list = !($scope.list);
   }

   $scope.logOut = function() {
      console.log("out");
      $scope.container.successUser = undefined;
      $scope.container.selectClass = undefined;
   }


   /*
   var newClass = new Parse.Object(Class);
         newClass.set("ClassCode", );
         newClass.set("TeacherName", $scope.main.password);
         newClass.set("TeacherID", $scope.main.emailAddr);

         newClass.set("ClassName", $scope.main.firstName);


         newClass.save(null, {
            success: function(newClass) {
               loadClasses();
            },
            error: function(newClass, error) {
               console.log("error on signin");
               alert("Error: " + error.code + " " + error.message);
            }
         });
*/

}]);



