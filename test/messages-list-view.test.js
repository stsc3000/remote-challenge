var MessagesListView = require('../app/messages-list-view');
var MessageRepository = require('../app/message-repository');
var messageFixtures = require('./message-fixtures');

var $ = require('jquery');

describe('MessagesListView', function() {
  var $template, $sandbox, messageData, messageRepository;
  beforeEach(function() {
    $template = $("" +
      "<script id='messages-list-template' type='x-tmpl-handlebars'>" +
      "<ul>" +
        "{{#each messageGroups}}" +
          "<li data-rel={{@key}}>" +
            "{{@key}}" +
            "<ul>" +
              "{{#each this}}" +
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
    messageListView.render();

    var $group = $('li[data-rel="2015-07-01"]')
    expect($group.text()).toEqual('2015-07-01 Subject 2  Subject 1 ');

    $group = $('li[data-rel="2015-06-30"]')
    expect($group.text()).toEqual('2015-06-30 Subject 3 ');
  });

});
