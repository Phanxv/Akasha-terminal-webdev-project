var app = angular.module('myApp', []);

app.directive('usernameCheck', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            function myValidation(value) {                                                                                                                                                                                                                                                                                                                                                                                                                                  
                if (value.length > 0) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});

app.directive('passCheck', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            function myValidation(value) {                                                                                                                                                                                                                                                                                                                                                                                                                                  
                if (value.length >= 8) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});

app.directive('repassCheck', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            function myValidation(value) {
                var v = document.getElementById("pass").value;                                                                                                                                                                                                                                                                                                                                                                                                                                      
                if (value.localeCompare(v) == 0 ) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});
