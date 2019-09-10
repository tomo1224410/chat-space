$(function(){ 
  function buildHTML(message){
  var image = message.image ? `<img src=${message.image}>` :"";
  var html = `<div class="chat" data-messageid="${message.id}">
                <div class="chat-block">
                  <div class="chat-block__name">
                    ${message.user_name}
                  </div>
                  <div class="chat-block__time">
                    ${message.date}
                  </div>
                </div>
                <div class="chat-text">
                  <p class="lower-message__content">
                    ${message.content}
                  </p>
                  ${image}
                </div>
              </div>`
  return html;
  }
  $(".new_message").on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action') 
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
       .done(function(data){
         var html = buildHTML(data);
         $('.chats').append(html);
         $('.chats').animate({scrollTop: $('.chats')[0].scrollHeight}, 'fast');
         $('form')[0].reset();
      })
      .fail(function(){
        alert('error');
      });
      return false;
  });
  var reloadMessages = function() {
    last_message_id = $('.chat:last').data('id');
    $.ajax({
      url: "/api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log('success');
    })
    .fail(function() {
      console.log('error');
    });
  };
});
