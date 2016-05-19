/*exported ObjectResolver*/
/*globals get*/
/*jshint -W083*/
function ObjectResolver(attributes) {
    "use strict";
    
    function resolveAttributeFromObject(object, attr) {
        if (object[attr] === undefined) {
            return undefined;
        }
        get(object[attr], function (obj) {
            object[attr] = obj;
        });
    }
    
    function resolveObject(object) {
        var attr;
        
        for (attr in attributes) {
            resolveAttributeFromObject(object, attributes[attr]);
        }
    }
    
    this.resolveSingleObject = function (object) {
        return resolveObject(object);
    };
    
    this.resolveArray = function (objects) {
        var object;
        for (object in objects) {
            resolveObject(objects[object]);
        }
        return objects;
    };
}
