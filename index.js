var $ = require('dom')

module.exports = Button

function Button(ele, opts) {
  if (!(this instanceof Button))
    return new Button(ele, opts)

  if ('string' === typeof opts) {
    opts = {
      loadingText: opts
    }
  }
  opts = opts || {}
  this.opts = {
    loadingText: opts.loadingText || 'loading...'
  }
  this.ele = $(ele)
  this.isLoading = false
}

Button.prototype.loading = function() {
  if (this.isLoading) return
  this.setState('loading')
}

Button.prototype.reset = function() {
  if (!this.isLoading) return
  this.setState('reset')
}

Button.prototype.setState = function(state) {
  var d = 'disabled'
  var is = this.isInput()
  var val = is ? 'val' : 'html'
  var state_ = state + '-text'
  state = state + 'Text'

  if (!this.ele.data('reset-text')) {
    var v = is ? this.ele.value() : this.ele.html()
    this.ele.data('reset-text', v)
  }

  if (this.ele.data(state_) == null) {
    var v = this.opts[state]
    if (is) this.ele.value(v)
    else this.ele.html(v)
  } else {
    var v = this.ele.data(state_)
    if (is) this.ele.value(v)
    else this.ele.html(v)
  }

  this.proxy(state)
}

Button.prototype.toggle = function() {
  if (this.isLoading)
    return this.setState('reset')

  return this.setState('loading')
}

Button.prototype.isInput = function() {
  var tag = this.ele[0].tagName && this.ele[0].tagName.toLowerCase()
  return tag && tag === 'input'
}

Button.prototype.val = function() {
  if (this.isInput())
    return this.ele.value()

  return this.ele.html()
}

Button.prototype.proxy = function(state) {
  if (state === 'loadingText' || state === 'loading-text') {
    this.isLoading = true
    this.ele.addClass('disabled').attr('disabled', 'disabled')
  } else if (this.isLoading) {
    this.isLoading = false
    this.ele.removeClass('disabled').removeAttr('disabled')
  }
}
