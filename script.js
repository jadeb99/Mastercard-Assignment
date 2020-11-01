/*********************************************************************************

Function to check the validity of the values inputted into the HTML interface by
the user. 

It first checks the credit card number by checking that the user has 
only entered numbers into the field. It then calls the luhn  check function to 
ensure it is an actual credit card number that has been entered. 

It then checks that the expiry date is still in date by creating a date object
from the options selected by the user and comparing it against todays date.

lastly it checks the CVV inputted by ensuring it is no shorter than 3 digits long 
and that only numbers were entered by the user.

Author: Jade Brennan-Keane
*********************************************************************************/

function inputCheck(CardNumber, ExpiryDateMonth, ExpiryDateYear, CVV) {
	var numbers = /^[0-9]+$/;
	var CardNumberCheck, ExpiryDateCheck, CVVCheck = false;
	
	//Card number check 
	if (CardNumber.value.match(numbers)) {
		//Call the luhnCheck
		let luhnResult = luhnCheck(CardNumber.value);
		
		if (luhnResult == false) {
			alert('Invalid Card Number');
		}//end if
		else {
			CardNumberCheck = true;
			console.log(CardNumber.value);
		}//end else
	}//end if
	else {
		alert('Invalid Card Number');
	}//end else
	
	
	
	//Expiry date check 
	let ExpiryDate = new Date(ExpiryDateYear.value, ExpiryDateMonth.value);
	let today = new Date();
	
	if (ExpiryDate < today) {
		alert('Invalid Expiry Date');
	}//end if
	else {
		console.log(ExpiryDate.value)
		ExpiryDateCheck = true;
	}//end else
	
	
	
	//CVV Check 
	if (!CVV.value.match(numbers)) {
		alert('Invalid CVV');
	}//end if
	else if (CVV.value.length < 3) {
		alert('Invalid CVV');
	}//end if
	else {
		console.log(CVV.value);
		CVVCheck = true;
	}//end else
	
	Success(CardNumberCheck, ExpiryDateCheck, CVVCheck);
}//end inputCheck



/*********************************************************************************

Function to use the Luhn algorithm to make sure that the card number entered is 
an actual card number and not a random sequence of numbers. It then returns a 
true or false to the inputCheck function.

Author: Jade Brennan-Keane
*********************************************************************************/
function luhnCheck(CardNumber) {
	//initialize variables
	let sum = 0;
	let isSecond=false;
	
	
	//start the Luhn Check loop
	for (let i = CardNumber.length-1; i >= 0; i--) {
		//create the value to test from the CardNumber object
		let value = parseInt(CardNumber.charAt(i)-'0');
		
		if (isSecond == true) {
			value *= 2;
			if(value > 9) {
			    value -= 9;
			}//end if
		}//end if
		sum += value;
		isSecond =! isSecond;
	}//end for
	
	//return result to the inputCheck function
	return sum % 10 == 0;
}//end luhnCheck



/*********************************************************************************

Function to display a success message to the user.

Author: Jade Brennan-Keane
*********************************************************************************/
function Success(CardNumberCheck, ExpiryDateCheck, CVVCheck) {
	if (CardNumberCheck == true && ExpiryDateCheck == true && CVVCheck == true) {
		alert('Success!');
	}
}



var app = angular.module('formExample', [])
	.controller('FormController', ['$scope',
    function($scope) {
		$scope.CardNumber = '0000000000000000';
		$scope.CVV = "000"
		$scope.$watch(function() {
			if ($scope.details.$valid) {
				submitted()
			}
		});

		function submitted() {
			console.log("Form submited");
		}
    }
]);