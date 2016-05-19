// Uses requireJS to load the following javascript modules:
// * All files in the FIRST array of the moduleList (from /src/modules).
// * All test files, which have a corresponding module_test.js file in the /test/ folder.
define(['../src/modules/moduleList'], function (dynModules) {
    var dynModulesReloc = [];
    var arrLength = dynModules[0].length;
    for (var i = 0; i < arrLength; i++) {
        dynModulesReloc[i] = '../src/' + dynModules[0][i];
        dynModulesReloc[i+arrLength] = dynModules[0][i] + '_test';
    }
    require(dynModulesReloc);
});