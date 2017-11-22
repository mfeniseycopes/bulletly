const BaseController = {

  beforeAction: function(actions, fn) {
    actions.forEach(action => this[action] = fn(action))
  },

}

module.exports = BaseController
