var MessageRepository = require('../app/message-repository');
var messageFixtures = require('./fixtures');

describe('MessageRepository', function() {
  var messageData, messageRepository;

  beforeEach(function() {
    messageData = _.cloneDeep(messageFixtures);
    messageRepository = new MessageRepository(messageData);
  });

  it('groups messages by date', function() {
    var groupedMessages = messageRepository.getMessages({showRead: true});
    var firstOfJulyGroup = groupedMessages['2015-07-01'];
    var lastOfJuneGroup = groupedMessages['2015-06-30'];

    expect(
      _.find(firstOfJulyGroup, {subject: 'Subject 1'})
    ).toBeTruthy();

    expect(
      _.find(firstOfJulyGroup, {subject: 'Subject 2'})
    ).toBeTruthy();

    expect(
      _.find(lastOfJuneGroup, {subject: 'Subject 3'})
    ).toBeTruthy();

    expect(
      _.find(lastOfJuneGroup, {subject: 'Subject 1'})
    ).toBeFalsy();
  });

  it('orders messages by their datetime within groups', function() {
    var groupedMessages = messageRepository.getMessages({showRead: true});
    var firstOfJulyGroup = groupedMessages['2015-07-01'];

    expect(firstOfJulyGroup[0].subject).toEqual('Subject 2');
    expect(firstOfJulyGroup[1].subject).toEqual('Subject 1');
  });

  it('filters messages based on whether they are read', function() {
    var groupedMessages = messageRepository.getMessages({showRead: false});
    var firstOfJulyGroup = groupedMessages['2015-07-01'];
    var lastOfJuneGroup = groupedMessages['2015-06-30'];

    expect(firstOfJulyGroup.length).toEqual(2);
    expect(lastOfJuneGroup).toBeUndefined();
  });
});
