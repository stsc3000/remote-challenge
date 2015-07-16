var Handlebars = require('handlebars');
var $ = require('jquery');

var Templates = {
  templates: {},

  render: function(id, data) {
    return this.getTemplate(id)(data);
  },

  getTemplate: function (id) {
    var template, templateHtml;

    if (this.templates[id]) {
      return this.templates[id];
    } else {
      templateHtml = $(id).html();
      template = Handlebars.compile(templateHtml);
      this.templates[id] = template;
      return template;
    }
  }
};

module.exports = Templates;
