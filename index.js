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

Button.prototype.setState = function(state) {
  var d = 'disabled'
  var val = this.isInput(this.ele) ? 'val' : 'html'
  state = state + 'Text'
  var state_ = state + '-text'
  if (this.ele.data('reset-text') == null)
    this.ele.data('reset-text', this.ele[val]())

  if (this.ele.data(state_) == null) {
    this.ele[val](this.options[state_])
  } else {
    this.ele[val](this.ele.data(state_))
  }
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
