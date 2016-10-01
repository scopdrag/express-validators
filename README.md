# express-validators


[![npm](https://img.shields.io/npm/v/express-validators.svg?maxAge=2592000)](https://www.npmjs.com/package/express-validators)
[![npm](https://img.shields.io/npm/dm/express-validators.svg?maxAge=2592000)](https://www.npmjs.com/package/express-validators)
[![npm](https://img.shields.io/npm/dt/express-validators.svg?maxAge=2592000)](https://www.npmjs.com/package/express-validators)
[![npm](https://img.shields.io/npm/l/express-validators.svg?maxAge=2592000)](https://www.npmjs.com/package/express-validators)

<a href="https://nodei.co/npm/express-validators/"><img src="https://nodei.co/npm/express-validators.png?downloads=true&downloadRank=true&stars=true"></a>

Nodejs (Express js) server side Validator.
This package offer very simple and easy way to validate any type of json object (request json object) for expressjs.
This validator also work with bluebird promise as well as async method callback.
Expressjs framework json object(request) validator package. 


 Install using NPM
```bash
npm install express-validators --save
```
 require in your (expressjs) route file.
```javascript
var Validators = require('express-validators')
```

or if you using bluebird promise

```javascript
var Promise = require('bluebird');
var Validators = require('express-validators');
Promise.promisifyAll(Validators);
```

Or

```javascript

var Validators = Promise.promisifyAll(require('express-validators'));
```


## Usage

 e.g: Json object need to be validated.

```javascript

    var Obj = {
        currentDate: '2016-09-16',
        afterDate: '2016-09-17',
        beforeDateValue: '2016-09-18',
        alphaValue: 12112,
        alpha_numValue: 'test_1-2',
        arrayValue: [],
        betweenValue: 40,
        booleanValue: true,
        confirmedValue: "233232",
        confirmedValue1: "233232ss",
        dateValue: "2015-03-25ss",
        notEqualValue: 12112,
        numericValue: "12112ss",
        lengthValue: "12112ss",
        emailValue: "12112ss@gmail.com",
        inValue: "23",
        ipValue: "23",
        notInValue: "23", 
        regexValue: "",
        requiredValue: "",
        requiredIfValue: "",
        stringValue: 7797,
        urlValue: 7797,
        amountValue: "7797.00ss" 
    };

```


 You can specify the rules for each index in json object. also you can specify multiple rules for a particular index.

```javascript

    var rules = {
        "currentDate": "after:afterDate",
        "beforeDateValue": "before:afterDate",
        "alphaValue": "alpha",
        "alpha_numValue": "alpha_num",
        "arrayValue": "array",
        "betweenValue": "between:10,30",
        "booleanValue": "boolean",
        "confirmedValue": "confirmed:confirmedValue1",
        "dateValue": "date",
        "notEqualValue": "notEqual:alphaValue",
        "numericValue": "numeric",
        "lengthValue": "length:10,30",
        "inValue": "in:23,34",
        "ipValue": "ip",
        "notInValue": "notIn:23,35",
        "issetValue": "isset",
        "regexValue": "regex:pattern",
        "requiredValue": "required",
        "requiredIfValue": "requiredIf:alphaValue,12112",
        "stringValue": "string",
        "urlValue": "url",
        "amountValue": "amount"
    };
    
```

 You can define messages for each rule of an index. if don't specify the messages it will return default messages. It is not mendatory.


```javascript

    var messages = {
        emailValue:{
            email: "Please enter a valid email address."
        }
    };
```


 Call to validator meathod

```javascript

    Validators.validator(Obj, rules, messages, function (err, validated) {
         
          if (validated.fails) { 
              console.log(validated.getErrors)
          }
    })
```
Or If using promise.

```javascript
Validators.validatorAsync(Obj, rules, messages)
            .then(function (validated) {
                   if (validated.fails) { 
                      console.log(validated.getErrors)
                  }
            })
            .catch(function(err){
              console.error(err);
            })
```
`fails` index will be true if there is an error. Otherwise it will be false.
`getErrors` index contains error field as a key and array of error messages for that field.

e.g: 

```javascript

{ currentDate: [ 'CurrentDate must be later date then afterDate' ],
  beforeDateValue: [ 'BeforeDateValue must be before date then afterDate' ],
  alphaValue: [ 'AlphaValue must be entirely alphabetic characters.' ],
  alpha_numValue: [ 'Alpha numValue must be alpha-numeric characters.' ],
  betweenValue: [ 'BetweenValue value must be in 10,30' ],
  confirmedValue: [ 'ConfirmedValue value must be same as ConfirmedValue1' ],
  dateValue: [ 'DateValue must be a valid date.' ],
  notEqualValue: [ 'NotEqualValue value must not be equal to AlphaValue' ],
  numericValue: [ 'NumericValue must be a numeric value.' ],
  lengthValue: [ 'LengthValue should be 10 to 30 character long.' ],
  emailValue: [ 'Please enter a valid email address.' ],
  ipValue: [ 'IpValue must be a valid ip address.' ],
  notInValue: [ 'NotInValue must not be in 23,35.' ],
  issetValue: [ 'IssetValue does not exists.' ],
  regexValue: [ 'RegexValue found to be in invalid pattern.' ],
  requiredValue: [ 'RequiredValue field is required.' ],
  requiredIfValue: [ 'RequiredIfValue field is required.' ],
  stringValue: [ 'StringValue must be a string.' ],
  urlValue: [ 'UrlValue must be a valid url.' ],
  amountValue: [ 'AmountValue must be an amount value.' ] }
  
```  

 