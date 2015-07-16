var $ = require('jquery');
var _ = require('lodash');
var Templates = require('./templates');

var MessagesListView = function($el, app, options) {
  this.$el = $el;
  this.app = app;
};

_.extend(MessagesListView.prototype, {
  templateSelector: '#messages-list-template',
  showRead: false,
  rendered: function() {},

  getMessageGroups: function() {
    return this.app.messageRepository.getMessages({showRead: this.showRead});
  },

  render: function() {
    var viewData = { messageGroups: this.getMessageGroups(), showRead: this.showRead };
    var html = Templates.render(this.templateSelector, viewData);

    this.$el.html(html);
    this.addEvents();
    this.rendered();
  },

  addEvents: function() {
    var _this = this;
    this.$el.on('change', '[data-rel="messages-filters-show-read"]', function() {
      var showRead = $(this).prop('checked');
      _this.updateMessages({showRead: showRead});
    });
    this.$el.on('click', '[data-message-id]', function() {
      $(_this).trigger('showMessage', $(this).data('message-id'));
    });
  },

  updateMessages: function(options) {
    this.showRead = options.showRead;
    this.render()
  }

});

module.exports = MessagesListView;
