var MessageRepository = require('../app/message-repository');
var messageFixtures = require('./message-fixtures');

describe('MessageRepository', function() {
  var messageData, messageRepository;

  beforeEach(function() {
    messageData = _.cloneDeep(messageFixtures);
    messageRepository = new MessageRepository(messageData);
  });

  it('groups messages by date', function() {
    var groupedMessages = messageRepository.getMessages({showRead: true});
    var firstOfJulyGroup = _.find(groupedMessages, {dateString: '2015-07-01'});
    var lastOfJuneGroup = _.find(groupedMessages, {dateString: '2015-06-30'});

    expect(
      _.find(firstOfJulyGroup.messages, {subject: 'Subject 1'})
    ).toBeTruthy();

    expect(
      _.find(firstOfJulyGroup.messages, {subject: 'Subject 2'})
    ).toBeTruthy();

    expect(
      _.find(lastOfJuneGroup.messages, {subject: 'Subject 3'})
    ).toBeTruthy();

    expect(
      _.find(lastOfJuneGroup.messages, {subject: 'Subject 1'})
    ).toBeFalsy();
  });

  it('orders messages by their datetime within groups', function() {
    var groupedMessages = messageRepository.getMessages({showRead: true});
    var firstOfJulyGroup = _.find(groupedMessages, {dateString: '2015-07-01'});

    expect(firstOfJulyGroup.messages[0].subject).toEqual('Subject 2');
    expect(firstOfJulyGroup.messages[1].subject).toEqual('Subject 1');
  });

  it('filters messages based on whether they are read', function() {
    var groupedMessages = messageRepository.getMessages({showRead: false});
    var firstOfJulyGroup = _.find(groupedMessages, {dateString: '2015-07-01'});
    var lastOfJuneGroup = _.find(groupedMessages, {dateString: '2015-06-30'});

    expect(firstOfJulyGroup.messages.length).toEqual(2);
    expect(lastOfJuneGroup).toBeUndefined();
  });

  it('gets a message by id', function() {
    var message = messageRepository.getMessageById('558070eecadb84b2cd4d5ee2');
    expect(message.subject).toEqual('Subject 1');
  });
});
