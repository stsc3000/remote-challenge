var Message = require('../app/message');

describe('Message', function() {
  var messageData, message;
  beforeEach(function() {
    messageData = {
      content: 'This is the content of message 1.',
      subject: 'Subject 1',
      fromEmail: 'user1@example.com',
      fromName: 'User One',
      dateReceived: 1435737600, //Wed Jul 01 2015 10:00:00 GMT+0200 (CEST)
      index: 0,
      read: false,
      _id: "558070eecadb84b2cd4d5ee2"
    }

    message = new Message(messageData);
  });

  it('sets a dateString', function() {
    expect(message.dateString).toEqual('01-07-2015');
  });

  it('sets a date', function() {
    expect(message.date.getTime()).toEqual(messageData.dateReceived * 1000);
  });

  it('sets a time', function() {
    expect(message.getTime()).toEqual('10:00');
  });

});
