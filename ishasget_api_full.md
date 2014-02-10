IsHasGet
=========

**A very basic ontological library**

`ishasget` is a Javascript micro library to acquire basic ontologies of data types, structures, browser specifications or DOM Elements. It aims to support lightweight tasks (type checking, data transformation etc.) which are fairly simple to solve but then not trivial enough not to hinder you while you code forward. 

The `is` object answers you, if something *is* of a certain type or structure. `has` returns informations about attributes and properties. `get` digs things out of elements and objects. 


`ishasget` is dependency and callback free. 
  
---


Examples
---
`is` can answer you if something *is*, i.e. if a string is valid json:

```
is.json( '{ "firstName": "John",
    	  	"lastName": "Smith" }' );
    
// => true    
```

`has` the browser Flash player enabled?

```
has.flash();
```

`get` me the the object reference to the key "engine" in which the property is "diesel".

```
var auto = { cars: { 
				audi : { type: "A3", engine: "diesel"}, 
				bmw : { type: "5er", engine: "petrol"}  
			 }};
			 
get.refByPair(a, "engine", "diesel");

// =>  as object reference: { type: "A3", engine: "diesel" }
```




Install
---
If you need parts only you can use each micro library (`is.js`, `has.js`, `get.js`) as standalone. `ishasget.js` gives you the full functionality. 

Just integerate in your html document:

```
| <script type="text/Javascript" src="ishasget.js"></script>

``` 
or use command-line install via bower:

```
$ bower install is-has-get

``` 


Function Overview
---

####is.js

```
is.boolean
is.number
is.func
is.string
is.object
is.nll
is.regEx
is.date

is.array
is.integer
is.float
is.char
is.plainObj
is.list
is.set
is.defined

is.finite
is.even
is.odd
is.positive
is.negative

is.html
is.json
is.xml
is.domObject
is.nested
is.definedCssClass
is.containedInDoc
is.visible

is.IE
is.mobile
is.thereAnybodyOutThere
```

####has.js

```
has.geolocation
has.localstorage
has.websql
has.ssl
has.touch
has.cookies
has.flash
has.java
has.jQuery
has.cordova

has.children

```

####get.js

```
get.type
get.clone
get.keys
get.values
get.refByValue
get.refByPair
get.pathToValue
get.pathToPair
get.flat
get.length
get.first
get.last
get.range
get.valueAtPos
get.highest
get.lowest

get.date
get.timestamp
get.unixTimestamp
get.rand

get.agent
get.os
get.browserLanguage
get.pluginList
get.browserWidth
get.browserHeight
get.browserSize
get.system


```





Licence
---
(c) 2014 Christopher Walzel, Florian Walzel.
`ishasget.js` may be freely distributed under the MIT license.

--------
--------
  
    
      


#IS
-----

The `is`-object answers the most elementary question if something is of a certain entity or type. Therefore `is` is mostly a boolean library, it will answer with true or false. 

 
--------

## True types ##

*Part of is.js which checks for Javascript types, close to spec.*

----
### is.boolean
*is.boolean(mixed)*

Checks if given element is a boolean type.


```
var x = false;

is.boolean(x);      	// => true
is.boolean({});      	// => false

```
### is.number ###
*is.number(mixed)*

Checks if given element is a number type. Will return `true` for `NaN` and `Infinity`.

```
is.number(7); 			// => true
is.number(Infinity);	// => true
is.number("2a");		// => false

```

### is.func ###
*is.func(mixed)*

Checks if given element is a function type. Does not treat Javascript objects containing functions as functions. 

```

var x = function() { alert("huhu") };
var z = { x : "hello", y : function() { alert ("huhu") };

is.func(x); 		// => true
is.func(z);			// => false
is.func([]);		// => false

```


### is.string ###
*is.number(mixed)*

Checks if given element is a string type. Empty strings are strings.

```
is.string("hello"); 	// => true
is.string("");			// => true
is.string(["hello"]);	// => false

```


### is.object ###
*is.number(mixed)*

Checks if given element is an object type. Unlike the Javascript standard behavior `null` is *not* considered to be an object.

```
is.object({}); 								// => true
is.object(new RegExp);						// => true
is.object(["foo"]);							// => true

is.object(null);							// => false
is.object(function() { alert("huhu") });	// => false

```

### is.nll ###
*is.nll(mixed)*

Checks if given element is `null`.

```
is.nll(null);		// => true
is.nll({}); 		// => false

```

### is.regEx ###
*is.regEx(mixed)*

Checks if given element is a `regular expression` object.

```
is.regEx( new RegExp("e") ); 		// => true
is.regEx("e"); 						// => false

```

### is.date ###
*is.date(mixed)*

Checks if given element is a `date` object.

```
is.date( new Date() ); 				// => true
is.date("1978-001-24 06:35"); 		// => false

```



--------

## Pseudo types ##

*is.js can check Javascript for types, which are not as such part of Javascript spec, but might be useful i.e. for validating parameters passed to a function.*

----

###is.array###
*is.char(mixed)*

Checks if given element is an array, indexed or associative.

```
var arr = array();
arr["first"] = 1;
is.array(arr);				// => true

is.array(["a", "b", "c"]); 	// => true
is.array({a:1, b:2});		// => false
```

### is.integer ###
*is.integer(mixed)*

Checks if given element is an integer value. Booleans are not treated as integers. 


```
is.integer(2); 			// => true
is.integer("2");		// => false
is.integer(2.2);		// => false
is.integer(true);		// => false

```

### is.float ###
*is.float(mixed)*

Checks if given element is floating point number (= is a number and cannot be represented as an integer and is neither `NaN` nor `Infinity`).

```
is.float(2.2);			// => true
is.float(2); 			// => false


```

###is.char###
*is.char(mixed)*

Checks if given element is a string with a length of one.

```
is.char("A"); 				// => true
is.char("2");				// => true
is.char("abcdef");			// => false
```

###is.plainObj###
*is.plainObj(mixed)*

Checks whether a given element is a an `object` whereas `null`, `array`, and other
types which Javascript generally considers as objects are excluded. This more strict testing against objects is useful because usually developer's expectations towards an object are quite different from what Javascript specifies. 

```
is.plainObj(["a","b","c"]); 	// => false
is.plainObj({a:1, b:2, c:3});	// => true

```

###is.list###
*is.list(mixed)*

This detects arrays and objects that behave like arrays, i.e. node lists, which might not share all array features. The length property is here the arbiter for list like behavior.

```
is.list(["a","b","c"]); 	// => true
is.list({a:1, b:2, c:3});	// => false

var lst = document.getElementByClass("my-class");

is.list(lst);				// => true

```

###is.set###
*is.set(mixed)*

*is.set* tests against all kinds of undefinedness, nullness or emptyness. This is particulary useful because lack of definition or content can have many faces in Javascript.   

```
var a;
is.set(a); 		// => false

is.set(""); 	// => false
is.set([]); 	// => false
is.set({}); 	// => false
is.set(null); 	// => false

is.set(42);		// => true
is.set(" ");	// => true
is.set(false);	// => true
is.set(NaN);	// => true
```

### is.defined ###
*is.defined(mixed)*

Checks if given element is not `undefined` (but can be empty) .

```
var a;
is.defined(a);      // => false

is.defined("");     	// => true
is.defined([]);     	// => true
is.defined({});     	// => true
is.defined(null);   	// => true

```

--------

## Mathematical properties ##

*Checks against basic mathematical definitions or properties.*

----

###is.finite###
*is.finite(mixed)*

Checks whether a given numeric argument is finite.

```
is.finite(42);			// => true
is.finite(Infinity);	// => false

```

###is.even###
*is.even(mixed)*

Checks whether a given number is even. Strings containing only numbers are also allowed.


```
is.even(42);			// => true
is.even("-42");			// => true

is.even(3);				// => false
is.even("abc");			// => null

```

###is.odd###
*is.odd(mixed)*

Checks whether a given number is even. Strings containing only numbers are also allowed.


```
is.odd(-3);			// => true
is.odd("3");		// => true

is.odd(42);			// => false
is.odd("abc");		// => null

```

###is.positive###
*is.positive(mixed)*

Checks whether a given number is greater than `0`. Strings containing only number characters are also allowed.


```
is.positive(3);			// => true
is.positive("3");		// => true

is.positive(-42);		// => false
is.positive("abc");		// => null

```

###is.negative###
*is.negative(mixed)*

Checks whether a given number is smaller than `0`. Strings containing only number characters are also allowed.


```
is.negative(-3);		// => true
is.negative("-3");		// => true

is.negative(42);		// => false
is.negative("abc");		// => null

```


--------

## Markup, structures, object properties and DOM ##

*Checks against different markup structures and things being found in the DOM.*

----

###is.html###
*is.html(string)*

Checks whether a string is valid `html`. We assume it is html markup, when it can be successfully parsed as such.


```
is.html("abcdef");			// => false
is.html("<p>Hello</p>");	// => true
```

###is.json###
*is.json(string)*

Checks whether a string is valid `json`. We assume it is json markup, when it can be successfully parsed as such.


```
is.json("abcdef");					// => false
is.json("<p>Hello</p>");			// => false
is.json('{"p": 5}');				// => true
```

###is.xml###
*is.xml(string)*

Checks whether a string is valid `xml`. We assume it is xml markup, when it can be successfully parsed as such. We do not test against correct xml declaration like `<?xml version="1.0" encoding="UTF-8"?>` so standard html will output `true` too when passed to the function.


```
is.xml("abcdef");					// => false
is.xml('<xml><t>hi</t></xml>');		// => true
is.xml("<p>Hello</p>");				// => true
```

###is.domObject###
*is.domObject(object)*

Checks whether a given object is a dom object.

```
// assuming there is a DOM element with id="foo":
var elem = document.getElementById("foo");

is.domObject(elem);				// => true
is.domObject("abcdef");			// => false


```

###is.nested###
*is.nested(mixed)*


Checks whether a given element is nested / multidimensional. This works for `arrays`, `objects` and valid `json` markup as well as for `DOM objects`.


```
is.nested([1, [2, 3]]);				// => true
is.nested([1 ,2, 3]);				// => false

is.nested({a:"b", c:{d:"e"}});		// => true
is.nested('{"p":[1,2,3]}');			// => true
```



###is.definedCssClass###
*is.definedCssClass(string)*


Checks whether a given string represents a defined css class name.

```
// assuming this is in the header part of our html page:
| <style type="text/css">
|     .red { color: red; }        
| </style>

is.definedCssClass(".red") 				// => true
is.definedCssClass(".not-existing") 	// => false

```

###is.containedInDoc###
*is.containedInDoc(mixed)*


Checks whether a given element is part of the DOM.


```
// assuming there is a DOM element with id="foo":
var elem = document.getElementById("foo");
is.containedInDoc(elem);		// => true

// assuming there is at least oden <DIV> tag in DOM:
is.containedInDoc("div");		// => true
```

###is.visible###
*is.visible(mixed)*


Detects whether a given `html` element is visible in the current viewport. Elements that are part of the DOM but can in this moment not be seen by the user either because of css hiding (`visibility:hidden`, `display:none` etc.) or that they are simply outside the current view will respond with `false`.


```

// assuming this is a div in our current view:
| <div id="foo" style="visibility:hidden">Foo</div>

is.visible(document.getElementById("foo"));		// => false
```


--------

## Browser Properties ##

*Checks against browser or device properties.*

----


###is.IE###
*is.IE( )*


Checks whether the current Browser is an Internet Explorer. For non IE browsers the function will return `false`, for IE it will return the version;


```
// assuming we are on Firefox:
is.IE(); 	// --> false

// assuming we are on IE 7:
is.IE(); 	// --> "7"
```

###is.mobile###
*is.mobile( )*


Checks whether the script runs on a mobile device's browser (such as iPhone, Android Tablet PC, Blackberry Phone etc.)


```
// assuming we are on an iPhone:
is.mobile(); 	// --> true

// assuming we are on PC's IE:
is.mobile(); 	// --> false
```

###is.thereAnybodyOutThere###
*is.thereAnybodyOutThere( )*


Checks whether an outgoing LAN, WLAN or mobile connection is available. This does not necessarily mean, that there is a working internet connection, i.e. you could be in a LAN network with other PCs but not being connected to the web.


```
// assuming WIFI is on and a WLAN connection exists
is.thereAnybodyOutThere(); 		// --> true
```

--------
--------


#HAS
----
`has` is designed to find out if the browser, object or structure in question owns certain properies. `has` is almost completely a boolean library answering with `true` or `false`. 

----


### Browser information
---

#### has.geolocation
*has.geolocation( )*

Returns whether the browser supports `navigator.geolocation`.

```
has.geolocation();	// => true or false

``` 

#### has.localstorage
*has.localstorage( )*

Returns whether the browser supports `localStorage`.

```
has.localstorage();	// => true or false

``` 

#### has.websql
*has.websql( )*

Returns whether the browser supports a local websql Database.

```
has.websql();	// => true or false

``` 

#### has.ssl
*has.ssl( )*

Returns whether the current page uses the `ssl` protocol (https).

```
has.ssl();	// => true or false

``` 

#### has.touch
*has.touch( )*

Checks whether the device supports touch events.

```
has.touch();	// => true or false

``` 

#### has.cookies
*has.cookies( )*

Checks whether the browser cookies are enabled.

```
has.cookies();	// => true or false

``` 




### Plugin information
---

#### has.flash
*has.flash( )*

Returns whether the current browser environment has a working `Adobe Flash Player`.

```
has.flash();	// => true or false

``` 


#### has.java
*has.java( )*

Returns whether the current browser environment has a working `Java Plugin`.

```
has.java();	// => true or false

``` 

#### has.jQuery
*has.jQuery( )*

Returns whether the current browser environment runs with a `jQuery` library.

```
has.jQuery();	// => true or false

``` 

#### has.cordova
*has.cordova( )*

Returns whether the current browser environment runs with a `Cordova` library.

```
has.cordova();	// => true or false

``` 




### Objects and structures
---

#### has.children
*has.children(object)*

Checks whether an array, object or DOM object has child elements.

```
var obj = {a:"one", b:"two"};
has.children(obj.b);	// => false

obj = {a:"one", b:[1 ,2 ,3, 4]};
has.children(obj.b); 	// => true

has.children(document.getElementById("main-container"));
// => true 
// assuming the DOM object with id "main-container" has is parent or other html elements.

```

---
---


#GET
----
The `get` object is the part of our micro library to use when you want to receive basic information from something or make basic transformations. There are `get` functions to apply to structures, objects or the browser itself.

----
### Objects and structures
---

#### get.type
*get.type(mixed)*

Returns the type of a given element as string. Prototypes of objects are returned as the prototype name, *not* as "object" 

```
get.type(7);			// => "number"
get.type({d:"data"});	// => "object"
get.type(new Date());	// => "date"

```


#### get.clone
*get.clone(mixed)*

Returns an identical copy of any given element. 

```
get.clone({a:1, b:2, c:3});			
// => {a:1, b:2, c:3}

```



#### get.keys
*get.keys(object, [iterate])*

Expects an array, associative array or a plain object. Returns a list as array of all keys. As default *get.keys* walks only through the first level of an object. For a recursive loop over the whole depth, second argument `[iterate]` must be set to `true`.

```
var obj = {a:1, b:{c:2, d:3}};
get.keys(obj);				
// => ["a", "b"]

get.keys(obj, true);				
// => ["a", "b", "c", "d"]

```

#### get.values
*get.values(object, [iterate])*

Expects an array, associative array or a plain object. Returns a list as array of all values. As default *get.value* walks only through the first level of an object. For a recursive loop over the whole depth, second argument `[iterate]` must be set to `true`.

```
var obj = {a:"hello", b:["world", "!"]};
get.values(obj);				
// => ["hello", Array[2]]

get.values(obj, true);				
// => ["hello", "world", "!"]

```

#### get.refByValue
*get.refByValue(object, value to find, [all occurrences])*

Expects an array, associative array or a plain object. Returns the object reference to the parent element where the *FIRST* key matching the given property is found. If *ALL* occurrences of the value should be returned, set optional argument `[all occurrences]` to `true`. In this case an array is returned. 

```
var obj = {one:"Harry", two:{three:"&", four:"Sally"}};
get.refByValue(obj, "Sally");
// => object as reference : {three:"&", four:"Sally"}

var obj = {a:"no", b:{c:"yes"}, d:{e:"yes"}};
get.refByValue(obj, "yes", true);
// => [object {c:"yes"}, object{e:"yes"}]

```

#### get.refByPair
*get.refByValue(object, value to find, [all occurrences])*

Expects an array, associative array or a plain object. Returns the object reference to the parent element where the *FIRST* match for the given key value pair is found. If *ALL* occurrences of the value should be returned, set optional argument `[all occurrences]` to `true`. In this case an array is returned. 

```
var obj = {one:"Harry", two:{three:"&", four:"Sally"}};
get.get.refByPair(obj, "Sally");
// => object as reference : {three:"&", four:"Sally"}

var obj = {a:"no", b:{c:"yes"}, d:{e:"yes"}};
get.get.refByPair(obj, "yes", true);
// => [object {c:"yes"}, object{e:"yes"}]

```



#### get.pathToValue
*get.pathToValue(object, value to find, [all occurrences])*

Expects an array, associative array or a plain object. Returns a string representation of the path to the key of the *FIRST* element matching the given property. For nested objects or multidimensional arrays the path to the property is given with a dot (".") as delimeter. If *ALL* occurrences of the value should be returned, set optional argument `[all occurrences]` to `true`. In this case an array is returned. `get.pathToValue` is mostly for logging, if you want the object reference to a certain value use `get.refByValue`.

```
var arr = ["Harry", "&", "Sally"];
get.pathToValue(arr, "Sally");				
// => "2"

var obj = {one:"Harry", two:{three:"&", four:"Sally"}};
get.pathToValue(obj, "Sally");				
// => "two.four"

var obj = {a:"yes", b:{a:"yes", b:"no", c:"yes"}};
get.pathToValue(obj, "yes", true);
// => ["a", "b.a", "b.c"]

```


#### get.pathToPair
*get.pathToPair(object, key to find, value to find, [all occurrences])*

Expects an array, associative array or a plain object. Returns a string representation of the path to the element where the given key value pair can be found first, including the last key. For nested objects or multidimensional arrays the path to the property is given with a dot (".") as delimeter. If *ALL* occurrences of the key value pare should be returned, set optional argument `[all occurrences]` to `true`. In this case an array is returned. `get.pathToPair` is mostly for logging, if you want the object reference to a certain key value pair use `get.refByPair`.

```
var obj = {one:"Harry", two:{three:"&", four:"Sally"}};
get.pathToPair(obj, "four", "Sally"); 
// => "two.four"

var obj = {a:"yes", b:{a:"yes", b:"no", c:"yes"}};
get.pathToPair(obj, "a", "yes", true);
// => ["a", "b.a"]

```



 
#### get.flat
*get.flat(object)*

Flattens a given object by copying all nested subelements to the first level. Subelements with the same key names occurring in different levels overwrite each other when being flattened whereas the latter displaces the earlier.

```
var obj = {a:1, b:{c:2, d:3}};
get.flat(obj);				
// => {a: 1, b: Object, c: 2, d: 3}

var obj = {one:1, two:{two:2, three:3}};
get.flat(obj);				
// => {one: 1, two: 2, three: 3}
```

#### get.length
*get.length(mixed)*

Returns the length or size of any given type, if available. For numbers length means the total amount of digits including "." when being `float`.

```
get.length("Hello");				// => 5
get.length(7);						// => 1
get.length(1.25);					// => 4
get.length({ });					// => 0
get.length(["a", "b", "c"]);		// => 3

```

#### get.first
*get.first(mixed, [invert])*

Returns the first element of an array, object, string or decimal. If the second argument `[invert]` is set to `true`, the function returns everything *BUT* the first element. In the latter case objects are returned as copies not as references.

```
get.first("Hello");			// => "H"
get.first("Hello",true);	// => "ello"

get.first(3.141);			// => 3
get.first(3.141, true);		// => 0.141

var arr = ["a", "b", "c"];
get.first(arr);				// => "a"
get.first(arr, true);		// => ["b", "c"]

```

#### get.last
*get.last(mixed, [invert])*

Returns the last element of an array, object, string or decimal. If the second argument `[invert]` is set to `true`, the function returns everything *BUT* the last element. In the latter case objects are returned as copies not as references.

```
get.last("Hello");			// => "o"
get.last("Hello",true);		// => "Hell"

get.last(3.141);			// => 1
get.last(3.141, true);		// => 3.14

var arr = ["a", "b", "c"];
get.last(arr);				// => "c"
get.last(arr, true);		// => ["a", "b"]

```

#### get.range
*get.range(mixed, start, end)*

Returns a continuous range of elements of an array, object, string or decimal. Object ranges are returned as copies not as references. Counting starts with `0`.

```
get.range("Hello", 1, 3);					//=> "ell"
get.range(4711, 0, 2);						//=> 47
get.range(["a", "b", "c", "d"], 2, 3);		//=> ["c"]

```



#### get.valueAtPos
*get.valueAtPos(mixed, position)*

Returns the element of an array, object, string or decimal at a certain position. Counting starts with `0`.

```			
get.valueAtPos("Hello", 3);		// => "l"
get.valueAtPos(3.141, 0);		// => 3
get.valueAtPos(3.141, 1);		// => "."

var arr = ["a", "b", "c"];
get.valueAtPos(arr, 2);			// => "b"

```

#### get.highest
*get.highest(array or object)*

Returns the highest numerical value in an array or object. Goes recursively over the full depth.

```
get.highest([1, 5, 3, 4]);						//=> 5
get.highest({a:1.7, b:"foo", c:42});			//=> 42
```

#### get.lowest
*get.lowest(array or object)*

Returns the lowest numerical value in an array or object. Goes recursively over the full depth.

```
get.lowest([1, 5, 3, 4]);						//=> 1
get.lowest({a:1.7, b:"foo", c:42});			//=> 1.7

```



### Time, date and randomness 
---

#### get.date
*get.date([pattern], [timestamp or expression])*

If called without argument `[pattern]` or with "utc" *get.date* returns a regular time string of the current moment like: "Fri Nov 15 2013 19:40:45 GMT+0100 (CET)".
If `[pattern]` is set to "iso" it returns an extended `ISO 8601:2004` formatted date like: "2013-11-15 19:41:57". If set to "din" it returns a `DIN 5008` formatted date like: "25.11.2013 19:41:57". 

The optional argument `[timestamp]` can be a Javascript timestamp (in milliseconds), which will be then converted to legible date.


```			
get.date();			
// => "Mon Nov 25 2013 19:29:10 GMT+0100 (CET)"

// as ISO pattern:					
get.date("iso");	
// => "2013-11-25 19:29:18"

// as DIN pattern:					
get.date("din");	
// => "25.11.2013 19:29:18"

// convert any Javascript timestamp to ISO pattern:
get.date("iso", 254468100000);
// => "1978-001-24 06:35:00"


```


#### get.timestamp
*get.timestamp([date string], [pattern])*

Returns a Javascript timestamp (in milliseconds since begin of the unix epoch) of the very moment if called without argument. Called with first argument "day", "month" or "year" a normed timestamp for today,  the beginning of the month or year will be returned.

If called with a date string (like: `"October 13, 1975 11:13:00"`), the given string is converted to a timestamp. If additional argument `[pattern]` is set to "iso", function expects a time string in `ISO 8601:2004` pattern (like: `"2013-11-15 19:41:57"`). Called with "din" a `DIN 5008` formatted date (like: `"25.11.2013 19:29:18"`) can be converted. If in the right order, the pattern does not have to be complete to the second. 


```			
// this moment:
get.timestamp();								// => 1392016408518

// today at 00:00:00
get.timestamp("day");							// => 1391986800000

// first day of this month at 00:00:00
get.timestamp("month");							// => 1391209200000

// first day of this year at 00:00:00
get.timestamp("year");							// => 1388530800000


// timestamp conversion from regular pattern
get.timestamp("January 24, 1978");				// => 254444400000
get.timestamp("January 24, 1978 06:35:12");		// => 254468112000

// timestamp conversion from ISO pattern	
get.timestamp("1978-01-24 06:35", "iso");		// => 254468100000

// timestamp conversion from DIN pattern	
get.timestamp("24.01.1978 06:35", "din");		// => 254468100000


```

#### get.unixTimestamp
*get.unixTimestamp([date string], [pattern])*

Returns a unix timestamp which is - unlike the Javascript timestamp - measured in seconds from begin of the unix epoch. Handling works exactly like get.timestamp.


```			
get.unixTimestamp();							// => this moment: 1385403440

// written in regular pattern
get.unixTimestamp("January 24, 1978");			// => 254444400
get.unixTimestamp("January 24, 1978 06:35");	// => 254468100

// written in ISO pattern					
get.unixTimestamp("1978-01-24 06:35", true);	// => 254468100

```


#### get.rand
*get.rand(mixed:range|start, [end])*

*get.rand* is a randomizer function which returns a random element of given array, object or range. Called with only the first parameter `mixed`, *get.rand* chooses one random element. In case of type `number` the function returns a value between `0` and the parameter. If an integer value is passed to it, it returns only integers whereas a floating number as argument will return also random floats.   

The function can be called with two arguments if both are `number`. The first marks the start of the range, the latter the end.

As a feature get.rand first tries to use the strong randomness of `window.crypto`. Only if not available or out of entropy the functions falls back to the weaker `Math.random`.   


```			
get.rand(true);		
// --> returns a boolean randomly: true or false

get.rand("ABCDEF");	
// --> returns a random character from the given string, i.e.: "C"

get.rand(4);	
// --> returns a random number between 0 and 3

get.rand(1.75);	
// --> returns a random number between 0 and 1.75, i.e.: 1.7264371038763784

get.rand({a:1, b:2, c:3});	
// --> returns a random value from the given object, i.e: 2

get.rand(-12,12);	
// --> returns a random value between -12 and 12, i.e.: -6
```

### Browser informations
---

#### get.agent
*get.agent( )*

Returns the browsers' user agent string.


```			
get.agent();		
// --> user agent, i.e.:
// "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36"
```

#### get.os
*get.os( )*

Returns the name of the oprating system as string.

```			
get.os();		
// --> user agent, i.e.: "MacOS"

```


#### get.browserLanguage
*get.browserLanguage( )*

Returns a string with the language shortcut of the selected browser language,
like `"en"`, `"fr"` or `"de"`.


```			
get.browserLanguage();		
// -->  i.e.: "de"
```


#### get.pluginList
*get.pluginList( )*

Returns a list with names of all available plugins of the current browser.


```			
get.pluginList();		
// --> all plugins, i.e.:
// ["Shockwave Flash", "Native Client", "Chrome PDF Viewer", "Java-Applet-Plug-In", "DivX VOD Helper Plug-in", "QuickTime Plug-in 7.7.1"]
```

#### get.browserWidth
*get.browserWidth( )*

Returns browser's window width in `pixels`.


```			
get.browserWidth();		
// --> i.e.: 715

```

#### get.browserHeight
*get.browserHeight( )*

Returns browser's window height in `pixels`.


```			
get.browserHeight();		
// --> i.e.: 682

```

#### get.browserSize
*get.browserSize( )*

Returns an object with the keys `x` (width) and `y` (height) with browser's window dimensions in `pixels`.


```			
get.browserSize();		
// --> i.e.: {x: 715, y: 682}

```

#### get.system
*get.system( )*

Returns an object with the system's properties: agent, browser, bowserlanguage, browserversion, mobile, operatingsystem and vendor.


```			
get.system();		

// --> object {
agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.107 Safari/537.36"
browser: "Netscape"
browserlanuage: "de"
browserversion: "5.0 (Macintosh; Intel Mac OS X 10_9_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.107 Safari/537.36"
mobile: false
operatingsystem: "MacOS"
vendor: "Google Inc."
}

```



