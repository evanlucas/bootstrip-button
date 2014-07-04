require('pbind')

var $ = require('dom')
  , test = require('tape')
  , Button = require('../')

test('setup', function(t) {
  $(document.body).append('<button class="btn-biscuits" type="button" '+
    'data-loading-text="submitting...">Biscuits</button>')
  $(document.body).append('<input type="button" class="btn-bogo" '+
    'value="bogo" data-loading-text="bogoing...">')
  $(document.body).append('<button type="button" class="btn-no">Nope</button>')

  var b1 = $('.btn-biscuits')
  t.ok(b1.length, '.btn-biscuits should exist')

  var b2 = $('.btn-bogo')
  t.ok(b2.length, '.btn-bogo should exist')

  var b3 = $('.btn-no')
  t.ok(b3.length, '.btn-no should exist')
  t.end()
})

test('button with data-loading-text attr', function(t) {
  var b = $('.btn-biscuits')
  var button = new Button(b)
  t.ok(button instanceof Button, 'button should be instanceof Button')

  function isDisabled() {
    return b.hasClass('disabled') && b.attr('disabled')
  }

  t.equal(button.val(), 'Biscuits')
  t.notOk(isDisabled(), 'button should not be disabled')
  t.notOk(button.isLoading, 'button.isLoading === false')
  button.toggle()

  t.ok(isDisabled(), 'button should be disabled after toggling')
  t.equal(button.val(), 'submitting...')
  t.ok(button.isLoading, 'button.isLoading === true')

  button.toggle()

  t.notOk(isDisabled(), 'button should not be disabled after toggling again')
  t.equal(button.val(), 'Biscuits')
  t.notOk(button.isLoading, 'button.isLoading === false')

  t.end()
})

test('input button with data-loading-text attr', function(t) {
  var b = $('.btn-bogo')
  var button = new Button(b)
  t.ok(button instanceof Button, 'button should be instanceof Button')

  function isDisabled() {
    return b.hasClass('disabled') && b.attr('disabled')
  }

  t.equal(button.val(), 'bogo')
  t.notOk(isDisabled(), 'button should not be disabled')
  t.notOk(button.isLoading, 'button.isLoading === false')
  button.toggle()

  t.ok(isDisabled(), 'button should be disabled after toggling')
  t.equal(button.val(), 'bogoing...')
  t.ok(button.isLoading, 'button.isLoading === true')

  button.toggle()

  t.notOk(isDisabled(), 'button should not be disabled after toggling again')
  t.equal(button.val(), 'bogo')
  t.notOk(button.isLoading, 'button.isLoading === false')

  t.end()
})

test('button without data-loading-text attr', function(t) {
  var b = $('.btn-no')
  var button = new Button(b)
  t.ok(button instanceof Button, 'button should be instanceof Button')

  function isDisabled() {
    return b.hasClass('disabled') && b.attr('disabled')
  }

  t.equal(button.val(), 'Nope')
  t.notOk(isDisabled(), 'button should not be disabled')
  t.notOk(button.isLoading, 'button.isLoading === false')
  button.toggle()

  t.ok(isDisabled(), 'button should be disabled after toggling')
  t.equal(button.val(), 'loading...')
  t.ok(button.isLoading, 'button.isLoading === true')

  button.toggle()

  t.notOk(isDisabled(), 'button should not be disabled after toggling again')
  t.equal(button.val(), 'Nope')
  t.notOk(button.isLoading, 'button.isLoading === false')

  t.end()
})
