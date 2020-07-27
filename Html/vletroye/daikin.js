(function() {

  'use strict';
  var app = angular.module('vletroye.daikin.airco', []); // inside [] you define your module dependencies

  app.controller('DaikinMainController', ['$scope', 'OHService', function($scope, OHService) {
		if ($scope.config.item_default) {
			$scope.config.item_setpoint = $scope.config.item+'_SetPoint';
			$scope.config.item_mode = $scope.config.item+'_Mode';
			$scope.config.item_homekit = $scope.config.item+'_HomekitMode';
			$scope.config.item_fan = $scope.config.item+'_Fan';
			$scope.config.item_movement = $scope.config.item+'_Fan_Movement';
			$scope.config.item_humidity = $scope.config.item+'_Humidity';
			$scope.config.item_temperature_in = $scope.config.item+'_TemperatureIn';
			$scope.config.item_temperature_out = $scope.config.item+'_TemperatureOut';
			$scope.config.item_powerful_mode = $scope.config.item+'_PowerFulMode';
			$scope.config.item_special_mode = $scope.config.item+'_SpecialMode';
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
		
		//Set a default Set Point of none defined
		$scope.retry_setpoint = 5;
		$scope.checkSetPoint = function () {
			var item = OHService.getItem($scope.config.item_setpoint);
			if (item == null) {
				if ($scope.retry_setpoint > 0) {
					console.log('SetPoint not found:'+$scope.config.item_setpoint);
					$scope.retry_setpoint = $scope.retry_setpoint -1;
					setTimeout($scope.checkSetPoint, 1000);
				} 
			} else {
				console.log('SetPoint found: '+$scope.itemState(item));
				if ($scope.itemState(item) == 'N/A') {
					console.log('SetPoint to 18');
					$scope.sendCmd($scope.config.item_setpoint, 18);
				}
			}
		}
				
		if ($scope.config.item_label == true) {
			$scope.getName();
		} else {  
			$scope.config.item_name = $scope.ngModel.name;
		}
		
		$scope.checkSetPoint();
		
		$scope.fanSpeed = function(fan, level) {		
			var fanId = fan.slice(fan.length - 1);
			var fanLevel = Number.parseInt(fanId, 10);
			if (Number.isNaN(fanLevel)) {
				fanLevel = 0;
			}
			if (fanLevel >= level) {
			  return true ;			  
			} else {
			  return false;
			}
		}				
	}]
	);
})();