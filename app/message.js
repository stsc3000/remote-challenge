var _ = require('lodash');

function pad(number) {
  if (number.toString().length == 1) {
    return "0" + number;
  } else {
    return "" + number;
  }
}

var Message = function(messageData) {
  _.extend(this, messageData);
  _.extend(this, {
    date: this.getDate(),
    dateString: this.getDateString(),
    time: this.getTime(),
    abbreviatedSubject: this.getAbbreviatedSubject()
  });
};

_.extend(Message.prototype, {
  getDate: function() {
    return new Date(this.dateReceived * 1000);
  },
  getDateString: function() {
    var date = this.getDate();
    return [pad(date.getDate()), pad(date.getMonth() + 1), date.getFullYear()].join('-');
  },
  getTime: function() {
    var date = this.getDate();
    return [pad(date.getHours()), pad(date.getMinutes())].join(':');
  },
  getAbbreviatedSubject: function() {
    var maxLength = 30;
    if (this.subject.length > maxLength) {
      return this.subject.slice(0,maxLength - 3) + "...";
    } else {
      return this.subject;
    }
  }
});

module.exports = Message;
