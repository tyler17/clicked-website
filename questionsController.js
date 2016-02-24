"use strict";

/**
 * Create a controller named 'MainController'.  The array argument specifies the controller
 * function and what dependencies it has.  We specify the '$scope' service so we can have access
 * to the angular scope of view template.
 */
cs194hApp.controller('QuestionsController', ['$scope', function($scope) {
   // We defined an object called 'main' with a single property 'title' that is used
   // by the html view template to get the page's title in the browser tab.
   $scope.main = {};
   $scope.main.title = 'clickED - All Classes';

   $scope.showThis = 'ha';

   	$scope.wordsIn = '';
   	$scope.passIn = '';
   	$scope.logIn = function(wordsIn, passIn) {
   		console.log("logIn clicked");
   		$scope.showThis = wordsIn + ' ' + passIn;
   	}

	Parse.initialize("3r4Ojai6mYESGymkDVf48wzZDIuBPaF9J0CHCCS7", "I2IBiCAt0Tf0lrXiX8MoMvpwbzIEyjz3Td8GrLYC");

	$scope.teacherID = 12345; //undo hardcode later
	var showAll = [];
	showAll.name = "All Classes";
	showAll.id = -1;
	//showAll.answered = true;
	$scope.curFilt = showAll; //default show all classes
	$scope.answered = false; //only show unanswered


	$scope.refresh = function (){
	    getQuestions();
	}          

	$scope.addressQuestion = function(q){
	    parseQ = q.parseObject;
	    parseQ.save(null, {
	        success: function(parseQ){
	            parseQ.set("Addressed", true);
	            parseQ.save();
	        }
	    });

	}

	$scope.changeFilt = function(filt) {
	    $scope.curFilt = filt;
	    $scope.questions = [];
	    for (var i=0; i < $scope.allQuestions.length; i++){
	        var question = $scope.allQuestions[i];

	        if(question.cc === filt.id || filt.id === -1){
	            if($scope.answered === question.answered) {
	                $scope.questions.push(question);
	            }
	        }
	        
	    }
	    $scope.main.title = 'clickED - ' + filt.name;
	    //$scope.$apply();
	}


	var Class = Parse.Object.extend("Class");
	var query2 = new Parse.Query(Class);
	$scope.filters=[];
	$scope.filters.push(showAll);
	query2.find({
	    success: function(classes) {
	    for (var i=0; i < classes.length; i++){
	        if(true) {//classes[i].get("TeacherID") === $scope.teacherID){
	            var result = [];
	            result.name = classes[i].get("ClassName");
	            result.id = classes[i].id;
	            $scope.filters.push(result);
	        }
	    }
	    $scope.$apply();

	    },
	    error: function(error) {
	        console.log('error');
	        alert("Error: " + error.code + " " + error.message);
	    }
	});

	var getQuestions = function() {

	    var Question = Parse.Object.extend("Question");
	    var query = new Parse.Query(Question);
	    query.descending("updatedAt");
	    $scope.allQuestions=[];
	    $scope.questions=[];

	    query.find({
	      success: function(results) {
	        for (var i=0; i < results.length; i++){
	            var result = [];
	            if(i===0) console.log();
	            result.txt = results[i].get("Content");
	            result.usr = results[i].get("MessageSender");
	            result.tim = results[i].get("TimeSent");
	            result.dat = results[i].get("DateSent");
	            result.cc = results[i].get("ClassID");
	            result.answered = results[i].get("Addressed");
	            var studentsWhoLiked = results[i].get("studentsWhoLiked");
	            result.numLiked = 0;
	            result.studentsLiked = [];
	            if(studentsWhoLiked){
	            	result.numLiked = studentsWhoLiked.length;
	            	console.log(studentsWhoLiked);
		            /*var studentNames="";
		            for (var i=0; i< studentsWhoLiked.length; i++){
		            	if (i!=0){
		            		studentNames+=", ";
		            	}
		            	studentNames += studentsWhoLiked[i];
		            }
		            result.studentsWhoLiked = studentNames;
		            *//*
		            for(var i = 0; i < result.numLiked; i++) {
		            	result.studentsLiked[i] = studentsWhoLiked[i];
		            }*/
					
		        }
	            result.parseObject = results[i];
	            $scope.allQuestions.push(result);
	            /*if(result.cc === 17061 || $scope.curFilt.id === -1){
	                if($scope.answered === result.answered) {
	                    console.log("answered: " + result.answered);
	                    $scope.questions.push(result);
	                }
	            }*/
	            $scope.changeFilt($scope.curFilt);
	            
	        }
	        $scope.$apply();

	      },
	      error: function(error) {
	        console.log('error');
	        alert("Error: " + error.code + " " + error.message);
	      }
	    });
	};
	getQuestions();
	var recursiveTime = function myself () {
	    setTimeout(function () {
	        getQuestions();
	        console.log("refreshed");
	        myself();
	    }, 2000);
	}();

	$scope.tryAddLike = function() {
		console.log("ty ad");
	}


	var changeView = function(answered) {
	    $scope.answered = answered;
	    console.log("changeview " + answered);
	    
	    $scope.questions = [];
	    $scope.changeFilt($scope.curFilt);
	    //$scope.$apply();
	}
	$scope.viewUnanswered = function() {
	    console.log("false");
	    changeView(false);
	}
	$scope.viewAnswered = function() {
	    console.log("true");
	    changeView(true);
    }  
}]);

