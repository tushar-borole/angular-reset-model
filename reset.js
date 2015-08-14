/**
 *  * @description reset the input 
 * @author Tushar Borole
 * @createDate 14/08/2015
 * @copyright 2014 © AeroD. All Rights Reserved.
 */


(function () {
    'use strict';

    angular
        .module('SandCrate')
        .directive('resetModel', resetField);

    resetField.$inject = ['$rootScope'];

    /* @ngInject */
    function resetField($rootScope) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            require: 'ngModel'
        };
        return directive;

        function link(scope, element, attrs, ngModel) {


            scope.$watch(attrs.ngModel, function (value) {



                if (ngModel.$pristine) { //if form is touched or not


                    ngModel.initialValue = value;




                }


            });



        }
    }

    angular
        .module('SandCrate')
        .directive('resetModelButton', resetModelButton);

    resetModelButton.$inject = ['$rootScope'];

    /* @ngInject */
    function resetModelButton($rootScope) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link
        };
        return directive;

        function link(scope, element, attrs) {

            $(element).on('click', function () {
                var attibuteName = attrs.resetModelButton;
                console.log(attibuteName)
                var selector = "[reset-model=" + attibuteName + "]";

                $(selector).each(function (i, obj) {
                    //test
                    console.log(obj)
                    var model = angular.element($(obj)).controller('ngModel')
                    model.$setViewValue(model.initialValue)
                });

            })



        }
    }






})();
