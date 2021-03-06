var MessagesListView = require('../app/messages-list-view');
var MessageRepository = require('../app/message-repository');
var messageFixtures = require('./message-fixtures');
var viewFixtures = require('./view-fixtures');

var $ = require('jquery');

describe('MessagesListView', function() {
  var $template, $sandbox, messageData, messageRepository;
  beforeEach(function() {
    $template = $(viewFixtures.listView);
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

  it('renders message groups', function() {
    var messageListView = new MessagesListView($sandbox, { messageRepository: messageRepository });
    var $group;
    messageListView.showRead = true;
    messageListView.render();

    var $group = $('li[data-rel="01-07-2015"]')
    expect($group.text()).toEqual('01-07-2015 Subject 2  Subject 1 ');

    $group = $('li[data-rel="30-06-2015"]')
    expect($group.text()).toEqual('30-06-2015 Subject 3 ');
  });

  it('filters messages based on whether they are read', function(done) {
    var messageListView = new MessagesListView($sandbox, { messageRepository: messageRepository });
    var $group;
    messageListView.showRead = true;
    messageListView.render();

    var $group = $('li[data-rel="30-06-2015"]')
    expect($group.length).toEqual(1);

    messageListView.rendered = function() {
      $group = $('li[data-rel="30-06-2015"]')
      expect($group.length).toEqual(0);
      done()
    }
    messageListView.$el.find('[data-filter="new"]').trigger('click')
  });

  it('triggers a showMessage event on click', function(done) {
    var messageListView = new MessagesListView($sandbox, { messageRepository: messageRepository });
    var $group;
    messageListView.showRead = true;
    messageListView.render();

    $(messageListView).on('showMessage', function(event, messageId) {
      expect(messageId).toEqual("558070eecadb84b2cd4d5ee2");
      done();
    });

    messageListView.$el.find('[data-message-id="558070eecadb84b2cd4d5ee2"]').trigger('click');

  });

});
