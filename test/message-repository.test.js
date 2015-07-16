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

});
