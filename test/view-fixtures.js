module.exports = {
  listView: "" +
      "<script id='messages-list-template' type='x-tmpl-handlebars'>" +
      "<input type='checkbox' data-rel='messages-filters-show-read'></input>" +
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
