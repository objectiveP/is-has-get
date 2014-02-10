//     is.js version 0.1
//     (c) 2014 Christopher Walzel, Florian Walzel
//     is.js may be freely distributed under the MIT license.

(function()  {

    "use strict";

    var root = this;
    var is = {};
    var node = false;

    is.version = "0.1";

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = is;
        }
        exports.is = is;
        node = true;
    } else {
        root['is'] = is;
    }

        // ----------------------------------------- //
        // PRIVATE FUNCTIONS                         //
        // ----------------------------------------- //

        is.__toNum = function (n)
        {
            if ( (is.string(n) && n !== '') && /\S/.test(n)) {

                n = Number(n);

                if (isNaN(n))
                    return null;

                if (n === Number.NEGATIVE_INFINITY || n === Number.POSITIVE_INFINITY)
                    return null;

                return n;
            }
            else {
                return null;
            }
        };

        // ----------------------------------------- //
        // TESTING AGAINST TYPES AND DEFINEDNESS     //
        // ----------------------------------------- //

        /** is.boolean
         *
         * @param b
         * @returns {boolean}
         *
         * checks whether a given argument is of type boolean
         */
        is.boolean = function (b) {
            return typeof b === "boolean";
        };

        /** is.number
         *
         * @param n
         * @returns {boolean}
         *
         * checks whether a given argument is of type number
         */
        is.number = function (n) {
            return typeof n === "number";
        };

        /** is.integer
         *
         * @param n
         * @returns {boolean}
         *
         * checks whether a given argument is an integer value.
         * Although we are not absolutely sure, we do not treat booleans as integers.
         */
        is.integer = function (n) {
            return !is.number(n) ? false : n % 1 === 0;
        };

        /** is.float
         *
         * @param n
         * @returns {boolean}
         *
         * checks whether a given argument is a float value
         */
        is.float = function (n) {
            return !is.number(n) || !is.finite(n) ? false : n !== (n | 0);
        };

        /** is.func
         *
         * @param f
         * @returns {boolean}
         *
         * checks whether a given argument is of type function
         */
        is.func = function (f) {
            return typeof f === "function";
        };

        /** is.string
         *
         * @param s
         * @returns {boolean}
         *
         * checks whether a given argument is of type string
         */
        is.string = function (s) {
            return typeof s === "string" || s instanceof String;
        };

        /** is.defined
         *
         * @param u
         * @returns {boolean}
         *
         * checks whether a given argument is defined
         */
        is.defined = function (u) {
            return typeof u !== "undefined";
        };

        /** is.null
         *
         * @param n
         * @returns {boolean}
         *
         * checks whether a given argument is null
         */
        is.nll = function (n) {
            return n === null;
        };

        /** is.char
         *
         * @param c
         * @returns {boolean}
         *
         * checks whether a given argument is a character
         */
        is.char = function (c) {
            return (is.string(c) && is.set(c) && !is.set(c[1]));
        };

        /** is.array
         *
         * @param a
         * @returns {boolean}
         *
         * checks whether a given argument is a an array
         */
        is.array = function (a) {
            return Array.isArray(a) || ({}).toString.call(a) === "[object Array]";
        };

        /** is.object
        *
        *  @param o
        *  @returns {boolean}
        *
        * checks if target is an object, but unlike javascript spec, we do not treat null as an object, any other
        * objects-like structures are treated as such, i.e arrays, Date, Regex.
        */
        is.object = function (o) {
             return (o !== null  && typeof(o) === "object");
        };

        /** is.date
         *
         * @param d
         * @returns {boolean}
         * checks whether the given parameter is a date object
         */
        is.date = function (d) {
            return ({}).toString.call(d) === '[object Date]';
        };

        /** is.regEx
         *
         * @param r
         * @returns {boolean}
         * checks whether the given parameter is a regular Expression
         */
        is.regEx = function (r) {
            return ({}).toString.call(r) === '[object RegExp]';
        };

        /** is.plainObject
         *
         * @param o
         * @returns {boolean}
         *
         * checks whether a given argument is a an object whereas null, array, and other
         * types which Javascript generally considers as objects are excluded.
         */
        is.plainObj = function (o)
        {
            if ((!o || typeof o !== 'object')
                    || (typeof window !== 'undefined' && o === window)
                    || (o.constructor
                        && ! Object.prototype.hasOwnProperty.call(o, 'constructor')
                        && ! Object.prototype.hasOwnProperty.call(o.constructor.prototype, 'isPrototypeOf'))
                ) {
                return false;
            }
            for (var key in o);
            return (key === undefined || Object.prototype.hasOwnProperty.call(o, key));
        };


        /** is.list
        *
        * @param o
        * @returns {boolean}
        * function to detect Arrays and objects that behave like arrays, i.e. node lists,
        * which might not share all array features.
        */
        is.list = function (o) {
            return is.object(o) && is.defined(o.length);
        };

        /** is.set
         *
         * @param e
         * @returns {boolean}
         *
         * checks whether a given argument is undefined, empty, or null
         */
        is.set = function (e)
        {
            function isEmpty (o) {
                if (typeof o !== "object")
                    return -1;
                else {
                    if (o.length == 0) return true;
                    for (var i in o) return false;
                    return true;
                }
            }
            if ((typeof e === 'undefined' || e === null) || e === '') return false;
            return isEmpty(e) != true;
        };




        // ----------------------------------------- //
        // TESTING AGAINST MATHEMATICAL PROPERTIES   //
        // ----------------------------------------- //


        /** is.finite
         *
         * @param n
         * @returns {boolean}
         *
         * checks whether a given argument is finite
         */
        is.finite = function (n) {
            return isFinite(n);
        };

        /** is.even
         *
         * @param n {number}
         * @returns {boolean|null}
         *
         * checks whether a given number is even.
         * strings with only numbers are also allowed.
         * is.even ("2") returns: true
         */
        is.even = function (n)
        {
            if (is.string(n))
                n = is.__toNum(n);

            if (is.integer(n))
                return n % 2 == 0;
            else
                return null;
        };

        /** is.odd
         *
         * @param n {number}
         * @returns {boolean|null}
         *
         * checks whether a given number is odd.
         * strings with only numbers are also allowed.
         * is.odd ("-3") returns: true
         */
        is.odd = function (n)
        {
            if (is.string(n))
                n = is.__toNum(n);

            if (is.integer(n))
                return n % 2 == 1;
            else
                return null;
        };

        /** is.positive
         *
         * @param n {number}
         * @returns {boolean|null}
         *
         * checks whether a given number is greater 0.
         * strings with only numbers are also allowed.
         * is.positive ("12") returns: true
         */
        is.positive = function (n)
        {
            if (is.string(n))
                n = is.__toNum(n);

            if (is.number(n) && !isNaN(n))
                return (n > 0);
            else
                return null;
        };

        /** is.negative
         *
         * @param n
         * @returns {boolean|null}
         * checks whether a given number is smaller 0.
         * strings with only numbers are also allowed.
         * is.negative ("12") returns: false
         */
        is.negative = function (n)
        {
            if (is.string(n))
                n = is.__toNum(n);

            if (is.number(n) && !isNaN(n))
                return (n < 0);
            else
                return null;
        };

        /** is.finite
         *
         * @param n
         * @returns {null}
         */
        is.finite = function (n) {
             return !is.number(n) ? null : isFinite(n);
        };



        // ----------------------------------------- //
        // TESTING AGAINST OBJECT PROPERTIES   //
        // ----------------------------------------- //


        /** is.nested
         *
         * @param obj {object|json}
         * @returns {boolean|null}
         *
         * checks whether an object or json string is nested.
         * arrays are tested against multi dimensionality.
         */
        is.nested = function (obj) {

            if (is.domObject(obj))
                return (obj.childNodes.length > 0);

            if (is.json(obj)) {
                obj = JSON.parse(obj);
            }

            if (is.array(obj) || is.plainObj(obj)) {
                for (var k in obj) {
                        if (is.object(obj[k])) return true;
                }
                return false;
            }
            else return null;
        };



        // ----------------------------------------- //
        // TESTING AGAINST STRUCTURES / MARKUP       //
        // ----------------------------------------- //


        /** is.html
         *
         * @param str
         * @returns {boolean}
         *
         * checks whether a string is valid html (=can be parsed as html).
         */
        is.html = function (str)
        {
            if(!is.string(str)) return null;
            var e = document.createElement('div');
            e.innerHTML = str;
            for (var c = e.childNodes, i=c.length; i--;) {
                if (c[i].nodeType == 1) return true;
            }
            return false;
        };

        /** is.xml
         *
         * @param str
         * @returns {boolean}
         *
         * checks whether a string is xml (=can be parsed as xml).
         */
        is.xml = function (str)
        {
            var xml, tmp;
            if (!is.string(str)) {
                return null;
            }
            try {
                if ( window.DOMParser ) { // Standard
                    tmp = new DOMParser();
                    xml = tmp.parseFromString(str, "text/xml" );
                } else { // IE
                    xml = new ActiveXObject( "Microsoft.XMLDOM" );
                    xml.async = "false";
                    xml.loadXML(str);
                }
            } catch (e) {
                xml = undefined;
            }
            return !(!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length);
        };

        /** is.json
         *
         * @param str
         * @returns {boolean}
         *
         * checks whether a string is valid json (=can be parsed as json).
         */
        is.json = function (str)
        {
            if (!is.string(str)) return false;
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        };

        /** is.domObject
         *
         * @param dom
         * @returns {boolean}
         */
        is.domObject = function (dom)
        {
            try {
                return dom instanceof HTMLElement;
            }
            catch(e){
                return (typeof dom==="object") &&
                    (dom.nodeType===1) && (typeof dom.style === "object") &&
                    (typeof dom.ownerDocument === "object");
            }
        };

        /** is.definedCssClass
         *
         * @param css : css class name as string
         * @returns {boolean}
         *
         * checks whether a css class is defined / reachable.
         */
        is.definedCssClass = function (css)
        {
            if(! is.string(css)) return false;
            var all = [];
            for (var i = 0; i < document.styleSheets.length; i++) {
                var rules = document.styleSheets[i].rules || document.styleSheets[i].cssRules;
                for(var k in rules) {
                    if (is.string(rules[k].selectorText)) all.push(rules[k].selectorText);
                }
            }

            for (var j = 0; j < all.length; j++) {
                if (all[j] == css) return true;
            }
            return false;
        };



        // ----------------------------------------- //
        // TESTING AGAINST DOC/DOM ELEMENTS          //
        // ----------------------------------------- //


        /** is.containedInDoc
         *
         * @param el
         * @returns {boolean, null}
         *
         * checks whether an element is part of the current doc.
         * is.containedInDoc("div") would check if at least one Div-Element can be found.
         */
        is.containedInDoc = function (el)
         {
            if (!is.domObject(el) && !is.string(el))
                return null;
            else if (is.string(el))
                return is.set(document.getElementsByTagName(el));
            else {
                while (el = el.parentNode) {
                    if (el == document)
                        return true;
                }
                return false;
            }
         };

        /** is.visible
         *
         * @param el
         * @returns {boolean || null}
         * Detects whether an html Element is in the viewport.
         */
        is.visible = function(el)
        {
            if (!is.domObject(el))
                return null;

            var elem = is.list(el) ? el[0] : el;
            var eap,
                rect     = elem.getBoundingClientRect(),
                docEl    = document.documentElement,
                vWidth   = window.innerWidth || docEl.clientWidth,
                vHeight  = window.innerHeight || docEl.clientHeight,
                efp      = function (x, y) { return document.elementFromPoint(x, y)},
                contains = "contains" in elem ? "contains" : "compareDocumentPosition",
                has      = contains == "contains" ? 1 : 0x10;
            if (rect.right < 0 || rect.bottom < 0
                || rect.left > vWidth || rect.top > vHeight)
                return false;

            return (
                (eap = efp(rect.left,  rect.top)) == elem || elem[contains](eap) == has
                    ||  (eap = efp(rect.right, rect.top)) == elem || elem[contains](eap) == has
                    ||  (eap = efp(rect.right, rect.bottom)) == elem || elem[contains](eap) == has
                    ||  (eap = efp(rect.left,  rect.bottom)) == elem || elem[contains](eap) == has
            );
        };



        // ----------------------------------------- //
        // TESTING AGAINST BROWSER SPECIFICATIONS    //
        // ----------------------------------------- //


        /** is.IE
         *
         * @returns {*}
         * @constructor
         * Checks whether the Bbrowser in which script is running is an Internet Explorer
         */
        is.IE = function ()
        {
            if (!is.string(navigator.userAgent)) return null;
            var re = false;
            var t  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
            if (t.exec(navigator.userAgent) !== null)
                re = parseFloat(RegExp.$1);
            else {
                var n = navigator.userAgent.toLowerCase();
                re = (n.indexOf('msie') != -1) ? parseInt(n.split('msie')[1]) : false;
            }
            return re;
        };

        /** is.mobile
         *
         * @returns {*}
         * Checks whether script is running on a mobile device
         */
        is.mobile = function ()
        {
            if (is.string(navigator.userAgent))
                return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
            else
                return null;
        };

        /** is.thereAnybodyOutThere
         *
         * @returns {boolean}
         * Checks if an outgoing connection is available
         */
        is.thereAnybodyOutThere = function () {
            return is.boolean(navigator.onLine) ? navigator.onLine : null;
        }

}).call(this);