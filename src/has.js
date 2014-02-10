//     has.js version 0.1
//     (c) 2014 Christopher Walzel, Florian Walzel
//     has.js may be freely distributed under the MIT license.


(function () {

    "use strict";

    var root = this;
    var has = {};
    var node = false;

    has.version = "0.1";

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = has;
        }
        exports.is = has;
        node = true;
    } else {
        root['has'] = has;
    }

    /** DUPLICATE **/
    has.__domObject = function (obj)
    {
        var obj = is.array(obj) ? obj[0] : obj;

        try {
            return obj instanceof HTMLElement;
        }
        catch (e) {
            return (typeof obj === "object") &&
                (obj.nodeType === 1) && (typeof obj.style === "object") &&
                (typeof obj.ownerDocument === "object");
        }
    };
    /** DUPLICATE END **/

    // ----------------------------------------- //
    // HAS ON BROWSER FEATURES                   //
    // ----------------------------------------- //

    /** has.geolocation
     *
     * @returns {boolean}
     * checks whether the browser environment supports geolocation
     */
        has.geolocation = function ()
        {
            return !!navigator.geolocation;
        };

    /** has.localstorage
     *
     * @returns {boolean}
     * checks whether the browser environment supports localstorage
     */
        has.localstorage = function () {
            return (typeof localStorage === "object");
        };

    /** has.websql
     *
     * @returns {boolean}
     * checks whether the browser environment supports websql database
     */
        has.websql = function () {
            return !!window.openDatabase;
        };

    /** has.ssl
     *
     * @returns {boolean|null}
     * checks whether the current page supports SSL
     */
        has.ssl = function ()
        {
            if (typeof location.protocol === "string")
                return location.protocol === "https:";
            else return null;
        };


    /** has.touch
     *
     * @returns {boolean}
     * checks whether the browser environment supports touch events
     */
        has.touch = function () {
            return 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;
        };

    /** has.cookies
     *
     * @returns {boolean}
     * checks whether cookies are enabled
     */
    has.cookies = function()
    {
        var c = navigator.cookieEnabled;
        if  (typeof c === "undefined") {
            document.cookie = "hascookie";
            c = (document.cookie.indexOf("hascookie") != -1) ? true : false;
        }
        return c;
    };


    // ----------------------------------------- //
    // HAS ON PLUGINS                            //
    // ----------------------------------------- //

    /** has.flash
     *
     * @returns {boolean}
     * checks whether the browser has a working flash player installed
     */
        has.flash = function ()
        {
            var hasFlash = false;
            try {
                var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                if (fo) hasFlash = true;
            } catch (e) {
                if (navigator.mimeTypes["application/x-shockwave-flash"] != undefined) hasFlash = true;
            }
            return hasFlash;
        };

    /** has.java
     *
     * @returns {boolean|null}
     * detects the availibilty of java in the browser, if user set permissions to
     * ask on per site basis true will be returned
     */
        has.java = function () {
            return navigator ? navigator.javaEnabled() : null;
        };

    /** has.jQuery
     *
     * @returns {boolean}
     * checks whether the jQuery object is available
     */
        has.jQuery = function () {
            return !!(window.jQuery);
        };

    /** has.cordova
     *
     * @returns {boolean}
     * checks whether the cordova object is available
     */
        has.cordova = function () {
            return !!(window.cordova);
        };


    // ----------------------------------------- //
    // HAS ON OBJECT PROPERTIES                  //
    // ----------------------------------------- //

    /** has.children
     *
     * @returns {boolean|null}
     * checks whether an array, object or DOM object has child nodes
     */
        has.children = function (obj)
        {
            if (has.__domObject(obj))
                return obj.children.length > 0;

            if (typeof obj === "object") {
                for (var k in obj) {
                    for (var i in obj[k]) {
                        if (typeof obj[k] === "object")
                            return true;
                    }
                }
                return false;
            }
            else return false;
        };

}).call(this);