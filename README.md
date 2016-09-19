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
