//     ishasget.js version 0.1
//     (c) 2014 Christopher Walzel, Florian Walzel
//     is.js may be freely distributed under the MIT license.


// ----------------------------------------- //
// ----------------------------------------- //
//                  IS                       //
// ----------------------------------------- //
// ----------------------------------------- //

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



// ----------------------------------------- //
// ----------------------------------------- //
//                  HAS                      //
// ----------------------------------------- //
// ----------------------------------------- //


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
        if (is.domObject(obj))
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


// ----------------------------------------- //
// ----------------------------------------- //
//                  GET                      //
// ----------------------------------------- //
// ----------------------------------------- //


(function () {

    "use strict";

    var root = this;
    var get = {};
    var node = false;

    get.version = "0.1.1";

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            var exports = module.exports = get;
        }
        exports.get = get;
        node = true;
    } else {
        root['get'] = get;
    }

    get.d = document;
    get.e = document.documentElement;
    get.g = document.getElementsByTagName('body')[0];

    get.__walker = function (o, todo, elsetodo)
    {
        for (var i in o) {
            if(o.hasOwnProperty(i)){
                todo (i, o[i]);
                if (typeof(o[i]) === "object" && o[i] !== null)
                    get.__walker(o[i], todo, elsetodo);
                else elsetodo (i, o[i]);
            }
        }
    };

    // ----------------------------------------- //
    // GETTING GENERIC STRUCTURAL INFO           //
    // ----------------------------------------- //


    /** get.type
     *
     * @param g
     * @returns {string}
     *
     * gets the type of any parameter
     */
    get.type = function (g)
    {
        var cache = {};
        return function (obj) {
            var key;
            return obj === null ? 'null' // null
                : obj === g ? 'global' // window in browser or global in nodejs
                : (key = typeof obj) !== 'object' ? key // basic: string, boolean, number, undefined, function
                : obj.nodeType ? 'object' // DOM element
                : cache[key = ({}).toString.call(obj)] // cached. date, regexp, error, object, array, math
                || (cache[key] = key.slice(8, -1).toLowerCase()); // get XXXX from [object XXXX], and cache it
        };
    } (this);

    /** get.clone
     *
     * @param o
     * @returns {*}
     *
     * returns an identical copy of an array, object or date object
     */
    get.clone = function(o) {
        if (typeof o !== "object" || o == null)
            return o;

        var dupl;

        if (is.array(o)) {
            dupl = [ ];
            for (var i = 0, len = o.length; i < len; i++) {
                dupl[i] = get.clone(o[i]);
            }
            return dupl;
        }

        if (o instanceof Date) {
            dupl = new Date();
            dupl.setTime(o.getTime());
            return dupl;
        }

        if (o instanceof Object) {
            dupl = { };
            for (var key in o) {
                if (o.hasOwnProperty(key)) dupl[key] = get.clone(o[key]);
            }
            return dupl;
        }

        return null;
    };

    /** get.pathToPair
     *
     * @param obj {object}
     * @param key {string}
     * @param val {any}
     * @param all {boolean}
     * @returns {*}
     *
     * returns a string representation of the path within an object to the parent
     * element where the demanded key value pair can be found first.
     * If 'all' is set to true all occurrences are returned as array.
     */
    get.pathToPair = function (obj, key, val, all)
    {
        if ((typeof obj !== 'object' && obj !== null) || !is.set(val))
            return null;

        var succ, skip;
        var path = "";

        if (all)
            succ = [];
        else
            succ = "";

        function wlk (o) {
            for (var i in o) {
                var save = path;
                path = (path == "") ? i : (path + "." + i);
                if (o[i] == val && (key == null || i==key)) {
                    if (all)
                        succ.push(path);
                    else {
                        succ = path;
                        return;
                    }
                }
                if (o.hasOwnProperty(i)) {
                    if (typeof(o[i]) === "object" && o[i] !== null)
                        wlk (o[i]);
                }
                path = save;
            }
        }

        wlk(obj);

        if (all)
            return (succ != []) ? succ : false;
        else
            return (succ != "") ? succ : false;
    };

    /** get.pathToValue
     *
     * @param obj
     * @param val
     * @param all
     * @returns {*}
     *
     * returns a string representation of the path within an object to the place
     * where demanded value can be found first. If 'all' is set to true all occurrences
     * are returned as array.
     */
    get.pathToValue = function (obj, val, all)
    {
        return get.pathToPair(obj, null, val, all);
    };

    /** get.refByPair
     *
     * @param obj
     * @param key
     * @param val
     * @param all
     * @returns {*}
     *
     * returns an object reference to the element where the demanded key value pair can be found first.
     * If 'all' is set to true all occurrences are returned as array.
     */
    get.refByPair = function (obj, key, val, all)
    {
        if ((typeof obj !== 'object' && obj !== null) || !is.set(val))
            return null;

        key = (is.set(key)) ? key : null;

        var succ;
        if (all)
            succ = [];
        else
            succ = "";

        function wlk (o) {
            for (var i in o) {
                if (o[i] == val && (i == key || key == null)) {
                    if (all)
                        succ.push(o);
                    else {
                        succ = o;
                        return;
                    }
                }
                if (o.hasOwnProperty(i)) {
                    if (typeof(o[i]) === "object" && o[i] !== null)
                        wlk (o[i]);
                }
            }
        }

        wlk(obj);

        if (all)
            return (succ != []) ? succ : false;
        else
            return (succ != "") ? succ : false;
    };

    /** get.refByValue
     *
     * @param obj
     * @param val
     * @param all
     * @returns {*}
     *
     * returns an object reference to the element where the demanded value can be found first.
     * If 'all' is set to true all occurrences are returned as array.
     */
    get.refByValue = function (obj, val, all) {
        return get.refByPair(obj, null, val, all);
    };

    /**  get.keys
     *
     * @param obj {object} an indexed array, associative array or plain object
     * @param itr {boolean} [optional] if set to true, get.keys iterates over nested objects as well
     * @returns {array | null}
     *
     * returns a list of all keys of the given object
     */
    get.keys = function (obj, itr)
    {
        if ((typeof obj !== 'object' && obj !== null))
            return null;

        var z = [ ];
        function add (p) { z.push(p) }

        if (itr)
            get.__walker(obj, add, function(){ });
        else
            for (var prop in obj) add (prop);

        return z;
    };

    /** get.values
     *
     * @param obj {object} an indexed array, associative array or plain object
     * @param itr {boolean} [optional] if set to true, get.values iterates over nested objects as well
     * @returns {array | null}
     *
     * returns a flat list with all values
     */
    get.values = function (obj, itr)
    {
        if ((typeof obj !== 'object' && obj !== null))
            return null;

        var z = [];
        function add (p,v) { z.push(v) }

        if (itr)
            get.__walker(obj, function(){}, add);
        else
            for (var prop in obj) add (null, obj[prop]);

        return z;
    };

    /** get.flat
     *
     * @param obj {object} expects a plain object
     * @returns {object|null}
     *
     * returns a flattend object where all substructures are copied to the first level.
     * nested structures with same keys in different levels are overwritten by the latest
     */
    get.flat = function (obj)
    {
        if ((typeof obj !== 'object' && obj !== null))
            return null;

        var z = {};
        function add (k,p) { z[k] = p }

        get.__walker(obj, add, function(){});

        return z;
    };

    /** get.valueAtPos
     *
     * @param e {number | string | object}
     * @param pos {number}
     * @returns {*}
     *
     * returns the element/character/digit of an object, string or number at a give position
     */
    get.valueAtPos = function (e, pos)
    {
        if (! is.integer(pos) || pos < 0) return false;

        switch (typeof e) {
            case "number" :
                e = e.toString();
                if (pos >= e.length) return false;
                return (e.substr(pos, 1) != ".") ? parseFloat(e.substr(pos, 1)) : ".";

            case "string" :
                if (pos > e.length) return false;
                return e.substr(pos, 1);

            case "object" :
                if (e === null) return null;
                var i = 0;
                for (var k in e) {
                    if (i == pos) return e[k];
                    i++;
                }
                return false;

            default :
                return false;
        }
    };

    /** get.first
     *
     * @param e {number | string | object}
     * @param invert {boolean} invert the result
     * @returns {*}
     *
     * returns the first element/character/digit of a given object,string or number
     * if inversion is set to true it returns everything BUT the first member, objects are then returned as copies
     *
     */
    get.first = function (e, invert)
    {
        switch (typeof e)
        {
            case "number" :
                e = e.toString();
                if (invert)  // be carefull leading 0 values are diminished at inversion
                    return parseFloat(e.substr(1, e.length));
                else
                    return parseFloat(e.substr(0, 1));

            case "string" :
                if (invert)
                    return e.substr(1, e.length);
                else
                    return e.substr(0, 1);

            case "object" :
                if (e === null) return null;

                var key, re, i;

                if (this.__isarray(e)) {
                    //cover indexed arrays
                    if (e.length > 0) {
                        if (invert) {
                            re = [];
                            for (i = 1; i < e.length; i++) re.push(e[i]);
                            return re;
                        }
                        else
                            return e[0];
                    }
                    //cover associative arrays
                    else {
                        if (invert) {
                            re = [];
                            i = 0;
                            for (key in e) {
                                if (i > 0)
                                    re[key] = e[key];
                                i++;
                            }
                            return re;
                        }
                        else
                            for (key in e) return e[key];
                    }
                }
                // cover objects
                else {
                    if (invert) {
                        re = {};
                        i = 0;
                        for (key in e) {
                            if (i > 0)
                                re[key] = e[key];
                            i++;
                        }
                        return re;
                    }
                    else
                        for (key in e) return e[key];
                }

            default :
                return null;
        }
    };

    /** get.last
     *
     * @param e {number | string | object}
     * @param invert {boolean} invert the result
     * @returns {*}
     *
     * returns the last element/character/digit of a given object,string or number
     * if inversion is set to true it returns everything BUT the last member, objects are then returned as copies
     *
     */
    get.last = function (e, invert)
    {
        switch (typeof e)
        {
            case "number" :
                e = e.toString();
                if (invert)
                    return parseFloat(e.substr(0, e.length - 1));
                else
                    return parseFloat(e.substr(e.length - 1, e.length));

            case "string" :
                if (invert)
                    return e.substr(0, e.length - 1);
                else
                    return e.substr(e.length - 1, e.length);

            case "object" :
                if (e === null) return null;

                var last;

                if (this.__isarray(e)) {
                    //cover indexed arrays
                    if (e.length > 0) {
                        if (invert) {
                            var z = [];
                            for (var i = 0; i < e.length - 1; i++) z.push(e[i]);
                            return z;
                        }
                        else
                            return e[e.length - 1];
                    }
                    //cover associative arrays
                    else {
                        for (last in e);
                        if (invert) {
                            delete e[last];
                            return e;
                        }
                        else {
                            return e[last];
                        }
                    }
                }
                else {
                    for (last in e);
                    if (invert) {
                        delete e[last];
                        return e;
                    }
                    else {
                        return e[last];
                    }
                }

            default :
                return null;
        }
    };

    /** get.range
     *
     * @param e {number | string | object}
     * @param start {number}
     * @param end {number}
     * @returns {*}
     *
     * returns a range of elements/ characters/ digits of a given object, string or number
     * object ranges are returned as copies
     */
    get.range = function (e, start, end)
    {
        switch (typeof e)
        {
            case "number" :
                e = e.toString();
                return parseFloat(e.substr(start, end));

            case "string" :
                return e.substr(start, end);

            case "object" :
                if (e === null) return null;
                if (this.__isarray(e))
                    return e.slice(start, end);
                else {
                    var rng = { };
                    var read = false;
                    for (var p in e) {
                        if (p == start) read = true;
                        if (read) rng[p] = e[p];
                        if (p == end) break;
                    }
                    return rng;
                }

            default :
                return null;
        }
    };

    /** get.length
     *
     * @param e {number | string | object}
     * @returns {number}
     *
     * returns the length of a number (in digits), string or object/array
     */
    get.length = function (e) {
        switch (typeof e) {
            case "number" :
                e = e.toString();

            case "string" :
                return e.length;

            case "object" : // still not elegant for normal arrays because whole object is iterated
                if (e == null) return false;
                var i = 0;
                for (var k in e) i++;
                return i;

            default:
                return false;
        }
    };


    /** get.highest
     *
     * @param o
     * @returns {*}
     *
     * returns the highest numerical value within an object, array or associative array
     */

    get.highest = function (o)
    {
        if (typeof o !== "object" || o == null )
            return false;

        var max = -Infinity;

        var ismax = function (p,v) {
            if (is.number(v))
                if (v > max) max = v;
        };

        get.__walker(o, ismax, function() {});

        return max;
    };

    /** get.lowest
     *
     * @param o
     * @returns {*}
     * returns the lowest numerical value within an object, array or associative array
     */

    get.lowest = function (o)
    {
        if (typeof o !== "object" || o == null )
            return false;

        var min = Infinity;

        var ismin = function (p,v) {
            if (is.number(v))
                if (v < min) min = v;
        };

        get.__walker(o, ismin, function() {});

        return min;
    };


    // ----------------------------------------- //
    // GETTING CHRONOS                           //
    // ----------------------------------------- //

    /** get.date
     *
     * @param norm {string}[optional] "utc", "iso", "din"
     * @param ts {number || string}[optional] a javascript timestamp (milliseconds) NOT UNIX TIMESTAMP!
     * @returns {string} formated date
     *
     * if called without first argument or with "utc" get.date returns a regular timestring:
     * Fri Nov 15 2013 19:40:45 GMT+0100 (CET)
     *
     * if called with argument "iso" it returns the iso date pattern:
     * "2013-11-15 19:41:57"
     *
     *  if called with argument "din" it returns the iso date pattern:
     * "15.11.2013 19:41:57"
     *
     * optional argument ts can be a javascript timestamp which will be converted
     * to the selected date pattern
     *
     */
    get.date = function (norm, ts)
    {
        function formated(d, din)
        {
            var yyyy = d.getFullYear();
            var mm = d.getMonth() + 1 < 10 ? '' + d.getMonth() + 1 : d.getMonth() + 1; //January is 0!
            var dd = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
            var hor = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
            var min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
            var sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();

            if (din)
                return dd + '.' + mm + '.' + yyyy + ' ' + hor + ':' + min + ':' + sec;
            else
                return yyyy + '-' + mm + '-' + dd + ' ' + hor + ':' + min + ':' + sec;
        }

        ts = (typeof ts === "undefined") ? new Date() : new Date(ts);

        if (is.string(ts))
            ts = is.__toNum(ts);

        if (typeof norm !== "string")
            norm = "utc";

        switch (norm.toLowerCase()) {

            case "iso" :
                return formated(ts)+"";

            case "din" :
                return formated(ts, true)+"";

            default:
                return ts;
        }
    };

    /** get.timestamp
     *
     * @param d {string}[optional] time string like "October 13, 1975 11:13:00"
     * @param iso {string}[optional] put "iso" or "din"
     * @returns {number|false}
     *
     * returns a javascript timestamp in milliseconds if called without argument
     * returns a javascript timestamp of a given date if called with time string
     * with additional argument "iso" an iso-formatted date can be converted
     * with additional argument "din" an din-formatted date can be converted
     *
     */
    get.timestamp = function (d, norm)
    {
        if (typeof d === "undefined" || typeof d === null)
            return new Date().getTime();

        var re = function (str) {
            return (is.set(str)) ? parseInt(str) : null;
        };

        if (is.string(d)) {

            var t;

            switch (d.toLowerCase()) {

                case "day" : case "today":
                t = new Date();
                t.setHours(0);
                t.setMinutes(0);
                t.setSeconds(0);
                t.setMilliseconds(0);
                return t.getTime();

                case "month" : case "this month":
                t = new Date();
                t.setDate(1);
                t.setHours(0);
                t.setMinutes(0);
                t.setSeconds(0);
                t.setMilliseconds(0);
                return t.getTime();

                case "year" : case "this year":
                t = new Date();
                t.setMonth(0);
                t.setDate(1);
                t.setHours(0);
                t.setMinutes(0);
                t.setSeconds(0);
                t.setMilliseconds(0);
                return t.getTime();

                default:

                    if (is.string(norm)) {

                        var ar, dt, tm;

                        switch (norm.toLowerCase()) {

                            case "iso" :
                                ar = d.split(" ");
                                dt = ar[0].split("-");
                                tm = ar[1].split(":");
                                return new Date(re(dt[0]), re(dt[1])-1, re(dt[2]), re(tm[0]), re(tm[1]), re(tm[2])).getTime();

                            case "din" :
                                ar = d.split(" ");
                                dt = ar[0].split(".");
                                tm = ar[1].split(":");
                                return new Date(re(dt[2]), re(dt[1])-1, re(dt[0]), re(tm[0]), re(tm[1]), re(tm[2])).getTime();

                            default:
                                return new Date(d).getTime();
                        }
                    }
                    else
                        return new Date(d).getTime();

            }
        }
        else return false;
    };

    /** get.unixTimestamp
     *
     * @param d {string}[optional] time string like "October 13, 1975 11:13:00"
     * @param norm {boolean}[optional] if set to true an input in iso is expected. Pattern like: "2013-11-15 19:41:57"
     * @returns {number|false}
     *
     * returns a unix timestamp if called without argument
     * returns a unix timestamp of a given date if called with time string
     * with aditional argument iso=true, an iso-formatted date can be converted
     *
     */
    get.unixTimestamp = function (d, norm)
    {
        var re = get.timestamp(d, norm);

        return (re == false || re == null) ? re : Math.round(re / 1000);
    };

    /** get.rand
     *
     * @param range {boolean, string, number, object}
     * @param end
     * @returns {*}
     *
     * if called with one parameter only a random element of the given range is returned
     * if called with two parameters the first is the start, the second is the end of a range from which a random element is returned
     */
    get.rand = function (range, end)
    {
        function strongrand(factor, offset, int) {

            if (!is.set(factor)) factor = 1;
            if (!is.set(offset)) offset = 0;

            var r;

            if (!window.crypto) {
                r = Math.random();
            }
            else {
                try {
                    var arr = new Uint32Array(1);
                    window.crypto.getRandomValues(arr);
                    r = arr[0] * Math.pow(2,-32);
                }
                catch(e) {
                    r = Math.random();
                }

                r = r * factor + offset;
                return (int) ? Math.floor(r) : r;
            }
        }

        if (typeof end === "undefined")
        {
            switch (typeof range) {

                case "boolean" :
                    return strongrand(2, 0, true) == 1;

                case "number" :
                    return strongrand(range, 0, is.integer(range));

                case "string" : case "object" :
                var p = strongrand(get.length(range), 0, true);
                return get.valueAtPos(range, p);
            }
        }
        else {
            if (typeof range !== "number" && typeof end !== "number") return false;
            return strongrand(end - range + 1, range, is.integer(range) && is.integer(end));
        }
    };



    // ----------------------------------------- //
    // GETTING BROWSER INFOS                     //
    // ----------------------------------------- //


    /** get.agent
     *
     * @returns {string | false}
     * returns the user agent string
     */
    get.agent = function () {
        return (navigator.userAgent) ? navigator.userAgent : false;
    };

    /** get.browserLanguage
     *
     * @returns {string | false}
     *
     * returns a string with the language shortcut of selected browser language
     * like: "en", "fr" or "de"
     */
    get.browserLanguage = function () {
        if (navigator.language || navigator.userLanguage)
            return navigator.language || navigator.userLanguage;
        else
            return false;
    };

    /** get.os
     *
     * @returns {string|false}
     * returns name of operation system as string
     */
    get.os = function () {
        var OSName = false;
        if (!navigator) return OSName;

        else {
            if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
            if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
            if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
            if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
        }
        return OSName;
    };

    /** get.pluginList
     *
     * @returns {array | false}
     *
     * returns a list with the name of all available plugins in browser environment
     */
    get.pluginList = function () {
        if (navigator.plugins) {
            var z = [];
            for (var i = 0; i < navigator.plugins.length; i++) z.push(navigator.plugins[i]["name"]);
            return z;
        }
        else
            return false;
    };

    /** get.browserWidth
     *
     * @returns {number}
     *
     * returns browser's window width in px
     */
    get.browserWidth = function () {
        return get.d.innerWidth || get.e.clientWidth || get.g.clientWidth;
    };

    /** get.browserHeight
     *
     * @returns {number}
     *
     * returns browser's window height in px
     */
    get.browserHeight = function () {
        return get.d.innerHeight || get.e.clientHeight || get.g.clientHeight;
    };

    /** get.browserSize
     *
     * @returns {object}
     *
     * returns an object with browser's window width and height in px
     * like this: {x:1024 y:680}
     */
    get.browserSize = function ()
    {
        return {
            x: get.browserWidth(),
            y: get.browserHeight()
        };
    };

    /** get.system
     *
     * @returns object
     * @constructor
     */
    get.system = function ()
    {
        return {
            agent : get.agent(),
            system : get.os(),
            browser : (navigator.appName) ? navigator.appName : null,
            browserversion : (navigator.appVersion) ? navigator.appVersion : null,
            browserlanuage : get.browserLanguage(),
            vendor : (navigator.vendor) ? navigator.vendor : null,
            mobile : is.mobile()
        }
    };


}).call(this);

