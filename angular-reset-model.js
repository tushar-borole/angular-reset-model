/**
 *  * @description reset the input 
 * @author Tushar Borole
 * @createDate 14/08/2015
 * @copyright 2014 © AeroD. All Rights Reserved.
 */


(function () {
    'use strict';

    angular
        .module('angular-reset-model', [])
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
        .module('angular-reset-model', [])
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
    
    angular
        .module('angular-reset-model', []).directive('resetForm', function ($parse, $compile) {
    return {
        require: ['^form', 'ngModel'],
        link: function (scope, elm, attr, formCtrl) {

            var resetFormValue = angular.isDefined(attr.resetFormValue);
            var resetFormClear = angular.isDefined(attr.resetFormClear);


            formCtrl[0].$resetFormData = function () {
                if (resetFormValue) { // to set value on form rest
                    $parse(attr.ngModel).assign(scope, attr.resetFormValue);

                } else {

                    $parse(attr.ngModel).assign(scope, formCtrl[1].initialValue);
                }



            };

            formCtrl[0].$resetFormComplete = function () {//reset complete form

                formCtrl[0].$setPristine();

            };
            scope.$watch(attr.ngModel, function (value) {



                if (formCtrl[1].$pristine) { //if form is touched or not


                    formCtrl[1].initialValue = value;


                    if (resetFormClear) { // clear value on reset
                        formCtrl[1].initialValue = '';
                    }



                }


            });


        }
    }
});






})();