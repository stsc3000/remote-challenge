var _ = require('lodash');
var Message = require('./message');

function groupMessages(messages) {
  return _.groupBy(messages, 'dateString');
}

var MessageRepository = function(messagesData) {
  this.messages = _.map(messagesData, function(messageData) {
    return new Message(messageData)
  });
};

_.extend(MessageRepository.prototype, {
  getMessages: function(options) {
    return groupMessages(this.messages);
  }
});

module.exports = MessageRepository;
