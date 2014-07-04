# bootstrip-button

[Twitter bootstrap](https://github.com/twbs/bootstrap) button without jQuery

All credit goes to the devs of bootstrap as this is heavily based on the button plugin from it

## Install

```bash
$ npm install --save bootstrip-button
```

## Tests

```bash
$ npm test
```

## Example

```js
var Button = require('bootstrip-button')
var $ = require('dom')
var ele = $('.btn-biscuits')
var button = new Button(ele, {
  loadingText: 'submitting...'
})

ele.on('click', function(e) {
  // set state to loading
  button.loading()
  setTimeout(function() {
    // reset state
    button.reset()
  }, 600)
})
```

## API

### Button(ele, opts)

- ele The selector for the ele
- opts (optional)
  - object: `{ loadingText: 'loading...' }` 
  - string: `loading...`

### Button.prototype.toggle()

Toggles the button between `loading` and `reset` states

### Button.prototype.loading()

Sets the button state to `loading` if it is not already that

### Button.prototype.reset()

Sets the button state to `reset` if it is not already that

### Button.prototype.val()

Gets the correct value for the button element. If it is an `input`, it returns the value attribute, otherwise, it returns the elements `innerHTML`

## License MIT

Licensed under the MIT license. For more info, see `LICENSE`
