(function() {

  'use strict';
  var app = angular.module('app', []); // inside [] you define your module dependencies
  
  app.controller('FibaroColorController', ['$scope', 'OHService', function($scope, OHService) {
		$scope.initOn = 0;
		$scope.initOff = 0;
		$scope.img = 0;
		$scope.count = 0;
		$scope.timerId = 0;
		$scope.colorLoopImg;
		
		$scope.startColorLoop = function () {
			if ($scope.timerId > 0) {
				$scope.stopColorLoop();
			} else {
				$scope.initOn = $scope.itemValue($scope.config.item_on);
				$scope.initOff = $scope.itemValue($scope.config.item_off);
				$scope.colorLoopImg=document.getElementById('#colorLoopImg');
				$scope.doColorLoop();
			}
		};
		$scope.stopColorLoop = function () {
			if ($scope.timerId > 0) {
				clearTimeout($scope.timerId);
				$scope.timerId = 0;
				$scope.sendCmd($scope.config.item_on, $scope.initOn);
				$scope.sendCmd($scope.config.item_off, $scope.initOff);
			}
		};
		$scope.doColorLoop = function () {
			$scope.count = ($scope.count + 1) % 7;
			$scope.img = ($scope.count + 1) % 4;
			$scope.sendCmd($scope.config.item_on, 3+$scope.count);
			$scope.sendCmd($scope.config.item_off, 3+$scope.count);
			$scope.colorLoopImg.src = '/static/vletroye/images/colorloop'+($scope.img + 1)+'.png';
			$scope.timerId = setTimeout($scope.doColorLoop, 500);
		};		
	  }]
	);
	
  app.controller('FibaroMainController', ['$scope', 'OHService', function($scope, OHService) {
		if ($scope.config.item_default) {
			$scope.config.item_on = $scope.config.item+'_Color_On';
			$scope.config.item_off = $scope.config.item+'_Color_Off';
			$scope.config.item_power = $scope.config.item+'_power';
			$scope.config.item_kwh = $scope.config.item+'_kwh';
			$scope.config.item_reset = $scope.config.item+'_reset';
			$scope.config.support_color = false;
			$scope.config.support_reset = false;
		}
		
		//Fetch the label of the item as soon as available
		$scope.retry_item = 5;
		$scope.getName = function () {
			var item = OHService.getItem($scope.config.item);
			if (item == null) {
				if ($scope.retry_item > 0) {
					$scope.retry_item = $scope.retry_item -1;
					$scope.config.item_name = "...";
					setTimeout($scope.getName, 1000);
				} else {
					$scope.config.item_name = $scope.config.item;
				}
			} else {
				$scope.config.item_name = item.label;
			}
		}
		
		//Check if there is a "Color" item available
		$scope.retry_on = 5;
		$scope.CheckColor = function () {
			var item = OHService.getItem($scope.config.item_on);
			if (item == null) {
				if ($scope.retry_on > 0) {
					$scope.retry_on = $scope.retry_on -1;
					setTimeout($scope.CheckColor, 1000);
				}
			} else {
				$scope.config.support_color = true;
			}
		}	

		//Check if there is a "reset" item available
		$scope.retry_reset = 5;
		$scope.CheckReset = function () {
			var item = OHService.getItem($scope.config.item_reset);
			if (item == null) {
				if ($scope.retry_reset > 0) {
					$scope.retry_reset = $scope.retry_reset -1;
					setTimeout($scope.CheckReset, 1000);
				}
			} else {
				$scope.config.support_reset = true;
			}
		}
		
		if ($scope.config.item_label == true) {
			$scope.getName();
		} else {  
			$scope.config.item_name = $scope.ngModel.name;
		}
		$scope.CheckColor();
		$scope.CheckReset();
		
		$scope.getColor = function (index, mode) {
			if (index == 'N/A') index=mode+2;
			const color = ['black','darkgrey','lightgrey','white','red','green','blue','yellow','cyan','magenta'];
			return color[index];
		};		
		$scope.switchConfirmOn = function () {
			$scope.config.confirm_on = !$scope.config.confirm_on;
		}
		$scope.switchConfirmOff = function () {
			$scope.config.confirm_off = !$scope.config.confirm_off;
		}
	}]
	);
})();