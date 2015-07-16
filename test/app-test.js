var App = require('../app/app');
var messageFixtures = require('./message-fixtures');
var viewFixtures = require('./view-fixtures');

var $ = require('jquery');

describe('App', function() {
  var $listTemplate, $detailTemplate, $sandbox, messageData;
  beforeEach(function() {
    $detailTemplate = $(viewFixtures.detailView);
    $('body').append($detailTemplate);

    $listTemplate = $(viewFixtures.listView);
    $('body').append($listTemplate);

    $sandbox = $('<div id="sandbox"><div id="messages-list"></div><div id="messages-detail"></div></div>');
    $('body').append($sandbox);

    messageData = _.cloneDeep(messageFixtures);
  });

  afterEach(function() {
    $listTemplate.remove();
    $detailTemplate.remove();
    $sandbox.remove();
  });

  it('renders the message list', function() {
    var app = new App($sandbox, messageData);
    app.start()

    expect(app.$el.find('#messages-list li[data-message-id="558070eecadb84b2cd4d5ee2"]').text().trim())
      .toEqual('Subject 1');
  });

  it('renders message details', function(done) {
    var app = new App($sandbox, messageData);
    app.start()
    app.getMessagesDetailView().rendered = function() {
      expect(app.$el.find('#messages-detail').text().trim()).toEqual('Subject 1');
      done();
    }
    app.$el.find('#messages-list li[data-message-id="558070eecadb84b2cd4d5ee2"]').click();
  });

});
