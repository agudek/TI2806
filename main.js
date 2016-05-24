// Requirejs Configuration Options
require.config({
    // to set the default folder
    baseUrl: 'src',
    // paths: maps ids with paths (no extension)
    paths: {
        'jasmine': ['../libs/jasmine-2.4.1/jasmine'],
        'jasmine-html': ['../libs/jasmine-2.4.1/jasmine-html'],
        'jasmine-boot': ['../libs/jasmine-2.4.1/boot']
    },
    // shim: makes external libraries compatible with requirejs (AMD)
    shim: {
        'jasmine-html': {
            deps: ['jasmine']
        },
        'jasmine-boot': {
            deps: ['jasmine', 'jasmine-html']
        }
    }
});

require(['jasmine-boot'], function () {
    require(['my-library.specs'], function () {
        //trigger Jasmine
        window.onload();
    })
});