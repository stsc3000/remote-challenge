var MessagesListView = require('../app/messages-list-view');
var MessageRepository = require('../app/message-repository');
var messageFixtures = require('./message-fixtures');

var $ = require('jquery');

describe('MessagesListView', function() {
  var $template, $sandbox, messageData, messageRepository;
  beforeEach(function() {
    $template = $("" +
      "<script id='messages-list-template' type='x-tmpl-handlebars'>" +
      "<input type='checkbox' data-rel='messages-filters-show-read'></input>" +
      "<ul>" +
        "{{#each messageGroups}}" +
          "<li data-rel={{dateString}}>" +
            "{{dateString}}" +
            "<ul>" +
              "{{#each messages}}" +
                "<li> {{ subject }} </li>" +
              "{{/each}}" +
            "</ul>" +
          "</li>" +
        "{{/each}}" +
      "</ul>" +
    "</script>"
    );
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

    var $group = $('li[data-rel="2015-07-01"]')
    expect($group.text()).toEqual('2015-07-01 Subject 2  Subject 1 ');

    $group = $('li[data-rel="2015-06-30"]')
    expect($group.text()).toEqual('2015-06-30 Subject 3 ');
  });

  it('filters messages based on whether they are read', function(done) {
    var messageListView = new MessagesListView($sandbox, { messageRepository: messageRepository });
    var $group;
    messageListView.showRead = true;
    messageListView.render();

    var $group = $('li[data-rel="2015-06-30"]')
    expect($group.length).toEqual(1);

    messageListView.rendered = function() {
      $group = $('li[data-rel="2015-06-30"]')
      expect($group.length).toEqual(0);
      done()
    }
    messageListView.$el.find('[data-rel="messages-filters-show-read"]').trigger('change')
  });

});
