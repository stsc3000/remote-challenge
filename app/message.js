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
    dateString: this.getDateString()
  });
};

_.extend(Message.prototype, {
  getDate: function() {
    return new Date(this.dateReceived * 1000);
  },
  getDateString: function() {
    var date = this.getDate();
    return [date.getFullYear(), pad(date.getMonth() + 1), pad(date.getDate())].join('-');
  }
});

module.exports = Message;
