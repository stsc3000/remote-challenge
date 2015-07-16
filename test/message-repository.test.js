var MessageRepository = require('../app/message-repository');

describe('MessageRepository', function() {
  var messageData, messageRepository;

  beforeEach(function() {
    messageData = [{
      content: 'This is the content of message 1.',
      subject: 'Subject 1',
      fromEmail: 'user1@example.com',
      fromName: 'User One',
      dateReceived: 1435737600, //Wed Jul 01 2015 10:00:00 GMT+0200 (CEST)
      index: 0,
      read: false,
      _id: "558070eecadb84b2cd4d5ee2"
    }, {
      content: 'This is the content of message 2, which was received on the same day as message 1, but later.',
      subject: 'Subject 2',
      fromEmail: 'user2@example.com',
      fromName: 'User Two',
      dateReceived: 1435741200, //Wed Jul 01 2015 11:00:00 GMT+0200 (CEST)
      index: 1,
      read: false,
      _id: "558070ee57b34805dcfeaf07"
    },{
      content: 'This is the content of message 3, which was received on an earlier day and was already read.',
      subject: 'Subject 3',
      fromEmail: 'user3@example.com',
      fromName: 'User Three',
      dateReceived: 1435651200, //Tue Jun 30 2015 10:00:00 GMT+0200 (CEST)
      index: 2,
      read: true,
      _id: "558070ee769a5c8c2c8e030b"
    }];

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
