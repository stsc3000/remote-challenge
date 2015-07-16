module.exports = {
  listView: "" +
      "<script id='messages-list-template' type='x-tmpl-handlebars'>" +
      "<a href='#' data-filter='new' class='message-filter {{#unless showRead}} active {{/unless}}'>New</a>" +
      "<a href='#' data-filter='all' class='message-filter {{#if showRead}} active {{/if}}'>All</a>" +
      "<ul>" +
        "{{#each messageGroups}}" +
          "<li data-rel={{dateString}}>" +
            "{{dateString}}" +
            "<ul>" +
              "{{#each messages}}" +
                "<li data-message-id='{{_id}}'> {{ subject }} </li>" +
              "{{/each}}" +
            "</ul>" +
          "</li>" +
        "{{/each}}" +
      "</ul>" +
    "</script>",
  detailView: "" +
      "<script id='messages-detail-template' type='x-tmpl-handlebars'>" +
      "{{message.subject}}" +
    "</script>"
};
