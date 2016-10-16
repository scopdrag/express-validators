"use strict";
var validation = module.exports;


validation.defaultMessages = {
    issetNotBlankProp: "Please enter the value for ",
    isNumber: "Please enter a numeric value for ",
    isAmount: "Please enter a amount for ",
    alpha: "must be entirely alphabetic characters.",
    alpha_num: "must be alpha-numeric characters.",
    array: "must be be an array.",
    boolean: "must be a boolean value.",
    date: "must be a valid date.",
    numeric: "must be a numeric value.",
    digit: "must be a numeric digit only.",
    email: "must be a valid email address.",
    ip: "must be a valid ip address.",
    isset: "does not exists.",
    regex: "found to be in invalid pattern.",
    required: "field is required.",
    requiredIf: "field is required.",
    string: "must be a string.",
    url: "must be a valid url.",
    amount: "must be an amount value."
}

/**
 * First letter capitalize
 * @param string
 * @returns {string}
 */
validation.capitalise = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * validate after date
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {boolean}
 */
validation.afterValidate = function (validationParms, rawObject, proprtName) {

    var validationParmsArr = validationParms.split(':');
    var afterDateIndex = validationParmsArr[1];

    if (typeof rawObject[proprtName] != 'undefined') {
        var currentDate = rawObject[proprtName];
        var afterDate = rawObject[afterDateIndex];

        var afterTimestamp = (new Date(afterDate).getTime()) / 1000;
        var currentTimestamp = (new Date(currentDate).getTime()) / 1000;

        if (currentTimestamp <= afterTimestamp) {
            return false;
        }

    }
    return true;
}

/**
 * validate after message
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {string}
 */
validation.afterMessage = function (validationParms, rawObject, proprtName) {
    var message = validation.capitalise(proprtName) + ' must be later date then ';
    var validationParmsArr = validationParms.split(':');
    var afterDateIndex = validationParmsArr[1];
    message += afterDateIndex;
    return message;
}

/**
 * Validate aplha
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {boolean}
 */
validation.alphaValidate = function (validationParms, rawObject, proprtName) {

    if (typeof rawObject[proprtName] != 'undefined') {
        var currentValue = rawObject[proprtName];

        var patt = new RegExp("/^[a-zA-Z]+$/");
        if (!patt.test(currentValue)) {
            return false;
        }
    }
    return true;
}

/**
 * validate aplha numeric
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {boolean}
 */
validation.alpha_numValidate = function (validationParms, rawObject, proprtName) {

    if (typeof rawObject[proprtName] != 'undefined') {
        var currentValue = rawObject[proprtName];

        var patt = new RegExp("/^[a-zA-Z_0-9]$/");
        if (!patt.test(currentValue)) {
            return false;
        }

    }
    return true;
}


/**
 * validate array
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {boolean}
 */
validation.arrayValidate = function (validationParms, rawObject, proprtName) {

    if (typeof rawObject[proprtName] != 'undefined') {

        if (typeof rawObject[proprtName] == 'array') {
            return false;
        }

    }
    return true;
}

/**
 * before date validate
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {boolean}
 */
validation.beforeValidate = function (validationParms, rawObject, proprtName) {

    var validationParmsArr = validationParms.split(':');
    var afterDateIndex = validationParmsArr[1];

    if (typeof rawObject[proprtName] != 'undefined') {
        var currentDate = rawObject[proprtName];
        var afterDate = rawObject[afterDateIndex];

        var afterTimestamp = (new Date(afterDate).getTime()) / 1000;
        var currentTimestamp = (new Date(currentDate).getTime()) / 1000;

        if (currentTimestamp >= afterTimestamp) {
            return false;
        }

    }
    return true;
}

/**
 * before message
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {string}
 */
validation.beforeMessage = function (validationParms, rawObject, proprtName) {
    var message = validation.capitalise(proprtName) + ' must be before date then ';
    var validationParmsArr = validationParms.split(':');
    var afterDateIndex = validationParmsArr[1];
    message += afterDateIndex;
    return message;
}

/**
 * validate between
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {boolean}
 */
validation.betweenValidate = function (validationParms, rawObject, proprtName) {

    var validationParmsArr;
    validationParmsArr = validationParms.split(':');
    var constraintsValues = validationParmsArr[1].split(',');

    if (typeof rawObject[proprtName] != 'undefined') {
        var currentValue = rawObject[proprtName];
        if (currentValue < constraintsValues[0] || currentValue > constraintsValues[1]) {
            return false;
        }
    }
    return true;
}

/**
 * validate between message
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {string}
 */
validation.betweenMessage = function (validationParms, rawObject, proprtName) {

    var validationParmsArr;
    validationParmsArr = validationParms.split(':');

    var message = validation.capitalise(proprtName) + ' value must be in ' + validationParmsArr[1];
    return message;
}


/**
 * Validate that an attribute is a boolean.
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {boolean}
 */
validation.booleanValidate = function (validationParms, rawObject, proprtName) {

    var validationParmsArr;
    validationParmsArr = validationParms.split(':');
    var acceptable = [true, false, 0, 1, '0', '1'];

    if (typeof rawObject[proprtName] != 'undefined') {
        var currentValue = rawObject[proprtName];
        if (acceptable.indexOf(currentValue) == -1) {
            return false;
        }
    }
    return true;
}

/**
 * Validate againt confirm attribute
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {boolean}
 */
validation.confirmedValidate = function (validationParms, rawObject, proprtName) {

    var validationParmsArr = validationParms.split(':');
    var confirmValueIndex = validationParmsArr[1];

    if (typeof rawObject[proprtName] != 'undefined') {
        var currentValue = rawObject[proprtName];
        var confirmValue = rawObject[confirmValueIndex];

        if (currentValue !== confirmValue) {
            return false;
        }

    }
    return true;
}

/**
 * confirmed message
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {string}
 */
validation.confirmedMessage = function (validationParms, rawObject, proprtName) {

    var validationParmsArr;
    validationParmsArr = validationParms.split(':');
    var secondValue = validationParmsArr[1];
    var message = validation.capitalise(proprtName) + ' value must be same as ' + validation.capitalise(secondValue);
    return message;
}


/**
 * http://www.w3schools.com/js/js_date_formats.asp
 * validate attribute as valid date
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {boolean}
 */
validation.dateValidate = function (validationParms, rawObject, proprtName) {


    if (typeof rawObject[proprtName] != 'undefined') {
        var currentValue = rawObject[proprtName];

        if ((new Date(currentValue) === "Invalid Date") || isNaN(new Date(currentValue))) {
            return false;
        }
    }
    return true;
}

/**
 * Validate not Equal attribute
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {boolean}
 */
validation.notEqualValidate = function (validationParms, rawObject, proprtName) {
    var validationParmsArr = validationParms.split(':');
    var secondValueIndex = validationParmsArr[1];
    if (typeof rawObject[proprtName] != 'undefined') {
        var currentValue = rawObject[proprtName];
        var secondValue = rawObject[secondValueIndex];

        if (currentValue === secondValue) {
            return false;
        }
    }
    return true;
}

/**
 * Message for not equal attribute
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {string}
 */
validation.notEqualMessage = function (validationParms, rawObject, proprtName) {

    var validationParmsArr;
    validationParmsArr = validationParms.split(':');
    var secondValue = validationParmsArr[1];
    var message = validation.capitalise(proprtName) + ' value must not be equal to ' + validation.capitalise(secondValue);
    return message;
}

validation.numericValidate = function (validationParms, rawObject, proprtName) {


    if (typeof rawObject[proprtName] != 'undefined') {
        var currentValue = rawObject[proprtName];
        if (isNaN(currentValue)) {
            return false;
        }
    }
    return true;
}





validation.digitValidate = function (validationParms, rawObject, proprtName) {
    if (typeof rawObject[proprtName]!='undefined') {
        if (!/^[0-9]+$/.test(rawObject[proprtName])) {
            return false;
        }

    }
    return true;
}

 

/**
 * validte chracter length
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {boolean}
 */
validation.lengthValidate = function (validationParms, rawObject, proprtName) {

    var validationParmsArr;
    validationParmsArr = validationParms.split(':');
    var constraintsValues = validationParmsArr[1].split(',');

    if (typeof rawObject[proprtName] != 'undefined') {
        var currentValue = rawObject[proprtName];
        if (currentValue.length < constraintsValues[0] || currentValue.length > constraintsValues[1]) {
            return false;
        }
    }
    return true;
}

/**
 * validate length message
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {string}
 */
validation.lengthMessage = function (validationParms, rawObject, proprtName) {

    var validationParmsArr;
    validationParmsArr = validationParms.split(':');

    var message = validation.capitalise(proprtName) + ' should be ' + validationParmsArr[1].replace(',', ' to ') + ' character long.';
    return message;
}

/**
 * validate not equal
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {string}
 */
validation.notEqualMessage = function (validationParms, rawObject, proprtName) {

    var validationParmsArr;
    validationParmsArr = validationParms.split(':');
    var secondValue = validationParmsArr[1];
    var message = validation.capitalise(proprtName) + ' value must not be equal to ' + validation.capitalise(secondValue);
    return message;
}

/**
 * Validate email address
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {boolean}
 */
validation.emailValidate = function (validationParms, rawObject, proprtName) {
    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

    if (typeof rawObject[proprtName] != 'undefined') {
        var currentValue = rawObject[proprtName];
        if (!re.test(currentValue))
            return false;

    }
    return true;
}

/**
 * valiate in values
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {boolean}
 */
validation.inValidate = function (validationParms, rawObject, proprtName) {
    var validationParmsArr = validationParms.split(':');
    if (typeof rawObject[proprtName] != 'undefined') {
        var currentValue = rawObject[proprtName];
        if (validationParmsArr[1].indexOf(currentValue) == -1)
            return false;

    }
    return true;
}

/**
 * validate in message
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {string}
 */
validation.inMessage = function (validationParms, rawObject, proprtName) {

    var validationParmsArr;
    validationParmsArr = validationParms.split(':');

    var message = validation.capitalise(proprtName) + ' should be in ' + validationParmsArr[1] + '.';
    return message;
}

/**
 * validate ip address
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {boolean}
 */
validation.ipValidate = function (validationParms, rawObject, proprtName) {
    var re = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    if (typeof rawObject[proprtName] != 'undefined') {
        var currentValue = rawObject[proprtName];
        if (!re.test(currentValue))
            return false;

    }
    return true;
}

/**
 * validate not in
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {boolean}
 */
validation.notInValidate = function (validationParms, rawObject, proprtName) {
    var validationParmsArr = validationParms.split(':');
    if (typeof rawObject[proprtName] != 'undefined') {
        var currentValue = rawObject[proprtName];
        if (validationParmsArr[1].indexOf(currentValue) != -1)
            return false;

    }
    return true;
}

/**
 * validate not in message
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {string}
 */
validation.notInMessage = function (validationParms, rawObject, proprtName) {

    var validationParmsArr;
    validationParmsArr = validationParms.split(':');
    var message = validation.capitalise(proprtName) + ' must not be in ' + validationParmsArr[1] + '.';
    return message;
}

/**
 * validate isset value
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {boolean}
 */
validation.issetValidate = function (validationParms, rawObject, proprtName) {
    if (!typeof rawObject[proprtName] != 'undefined') {
        return false;
    }
    return true;
}

/**
 * valiate regex pattern
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {boolean}
 */
validation.regexValidate = function (validationParms, rawObject, proprtName) {
    var validationParmsArr = validationParms.split(':');
    var patt = new RegExp(validationParmsArr[1]);

    if (typeof rawObject[proprtName] != 'undefined') {
        var currentValue = rawObject[proprtName];
        if (!patt.test(currentValue)) {
            return false;
        }
    }
    return true;
}

/**
 * validate required
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {boolean}
 */
validation.requiredValidate = function (validationParms, rawObject, proprtName) {

    var currentValue = rawObject[proprtName];
    if (typeof (currentValue) == 'undefined' && currentValue == null || currentValue.toString().trim() == '' || currentValue.length == 0) {
        return false;
    }
    return true;
}

/**
 * validate required on another field value
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {boolean}
 */
validation.requiredIfValidate = function (validationParms, rawObject, proprtName) {
    var validationParmsArr = validationParms.split(':');
    var anotherFieldValueArr = validationParmsArr[1].split(',');
    var anotherFieldIndex = anotherFieldValueArr[0]
    var anotherFieldValue = anotherFieldValueArr[1]

    if (typeof rawObject[anotherFieldIndex] != "undefined" && anotherFieldValue == rawObject[anotherFieldIndex]) {
        var currentValue = rawObject[proprtName];
        if (typeof (currentValue) == 'undefined' && currentValue == null || currentValue.toString().trim() == '' || currentValue.length == 0) {
            return false;
        }
    }
    return true;
}


/**
 * validate string
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {boolean}
 */
validation.stringValidate = function (validationParms, rawObject, proprtName) {

    if (typeof rawObject[proprtName] != 'undefined') {
        var currentValue = rawObject[proprtName];
        if (typeof currentValue != 'string')
            return false;

    }
    return true;
}

/**
 * validate URL
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {boolean}
 */
validation.urlValidate = function (validationParms, rawObject, proprtName) {

    var urlregex = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");

    if (typeof rawObject[proprtName] != 'undefined') {
        var currentValue = rawObject[proprtName];
        if (!urlregex.test(currentValue)) {
            return false;
        }

    }
    return true;
}


/**
 * get default message
 * @param validationParms
 * @param rawObject
 * @param proprtName
 * @returns {*}
 */
validation.getDefaultMessage = function (validationParms, rawObject, proprtName) {
    var validationParmsArr = validationParms.split(':');
    var fns = validationParmsArr[0];

    if (typeof validation[fns + 'Message'] == 'function') {
        return validation[fns + 'Message'](validationParms, rawObject, proprtName);
    } else {
        var key_name = validation.capitalise(proprtName);
        key_name = validation.keyToName(key_name);
        return key_name + ' ' + validation.defaultMessages[fns];
    }
}


/**
 * validate amount
 * @param priceObj
 * @param proprtName
 * @returns {boolean}
 */
validation.amountValidate = function (validationParms, rawObject, proprtName) {

    if (typeof rawObject[proprtName] != 'undefined') {
        var patt = new RegExp("[0-9]+(\.[0-9][0-9]?)?");
        if (!patt.test(rawObject[proprtName]) || parseInt(rawObject[proprtName]) != rawObject[proprtName]) {
            return false;
        }
    }
    return true;
}


/**
 * converting key name
 * @param key
 * @returns {XML|void|string}
 */
validation.keyToName = function (key) {
    var keyName = key.replace(/_/g, ' ');
    keyName = keyName.replace('-', ' ');
    keyName = keyName.replace('price', '');
    keyName = keyName.trim();
    return keyName;
}


/**
 * validate processor
 * @param rawObject
 * @param rules
 * @param messages
 * @param callback
 */
validation.validate = function (rawObject, rules, messages, callback) {

    var errors = {};

    if (typeof rules == 'undefined') {
        var err = new Error("Please define the validation rules");
        err.status = 500;
        callback(err, null);
    }

    if (Object.keys(rules).length < 1) {
        var err = new Error("Nothing to validate");
        err.status = 500;
        callback(err, null);
    }

    try {
        Object.keys(rules).forEach(function (key) {
            var validationRules = [];
            validationRules = rules[key].split("|");

            var keyName = validation.keyToName(key);


            for (var i = 0; i < validationRules.length; i++) {
                var fnsParams = validationRules[i];

                var fnsAndOprator = fnsParams.split(':');
                var fns = fnsAndOprator[0];


                if (typeof validation[fns + 'Validate'] != 'function') {
                    var err = new Error("Invalid valiation rule.");
                    err.status = 500;
                    throw(err);
                } else if (!validation[fns + 'Validate'](fnsParams, rawObject, key)) {

                    if ((typeof messages[key]) != 'undefined' && (typeof messages[key][fns]) != 'undefined') {
                        var msg = messages[key][fns];
                    } else {
                        var msg = validation.getDefaultMessage(fnsParams, rawObject, key)
                    }


                    var oldError = typeof errors[key] == 'undefined' ? [] : errors[key];
                    oldError.push(msg);
                    errors[key] = oldError;
                }

            }


        });
        callback(null, errors);
    } catch (except) {
        callback(except, null);
    }


}


validation.validator = function (priceObj, rules, messages, callback) {

    if (typeof priceObj !== 'object') {
        throw(new Error("Please provide an object to validate"));
    } else if (Object.keys(priceObj).length == 0) {
        throw(new Error("Please provide a valid object to validate"));
    }

    validation.validate(priceObj, rules, messages, function (err, result) {
        if (err)
            callback(err, null);
        var valid = {fails: false, getErrors: null};
        if (Object.keys(result).length > 0) {
            valid = {fails: true, getErrors: result};
        }
        callback(null, valid);
    });
}

