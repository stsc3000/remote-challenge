var MessagesDetailView = require('../app/messages-detail-view');
var MessageRepository = require('../app/message-repository');
var messageFixtures = require('./message-fixtures');
var viewFixtures = require('./view-fixtures');

var $ = require('jquery');

describe('MessagesDetailView', function() {
  var $template, $sandbox, messageData, messageRepository;
  beforeEach(function() {
    $template = $(viewFixtures.detailView);
    $('body').append($template);
    $sandbox = $('<div id="sandbox"></div>');
    $('body').append($sandbox);

    messageData = _.cloneDeep(messageFixtures);
    messageRepository = new MessageRepository(messageData);
  });
  afterEach(function() {
    $template.remove();
    $sandbox.remove();
  });

  it('renders a message', function(done) {
    var message = messageRepository.getMessageById("558070eecadb84b2cd4d5ee2");
    var messageDetailView = new MessagesDetailView($sandbox, {messageRepository: messageRepository});

    messageDetailView.render();

    messageDetailView.rendered = function() {
      expect(messageDetailView.$el.text()).toEqual("Subject 1");
      done();
    };

    messageDetailView.showMessage(message);
  });

});
