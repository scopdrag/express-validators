# Nodejs (Express js) server side Validator
Expressjs framework json object(request) validator package. 


1. Using NPM
```bash
npm install Validator --save
```
```javascript
var Validators = require('Validator')
```

or if you using bluebird promise

```javascript
var Promise = require('bluebird');
var Validators = require('validator');
Promise.promisifyAll(Validators);
```

Or

```javascript

var Validators = Promise.promisifyAll(require('validator'));



## Usage

1) e.g: Json object need to be validated.

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


2. You can specify the rules for each index in json object. also you can specify multiple rules for a particular index.

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


