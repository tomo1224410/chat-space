 $(function(){ 
   function buildHTML(message){
    var image = message.image ? `<img src=${message.image}>` :"";
    var html = `<div class="chat-block">
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
         $('.chat').append(html);
         $('.chat').animate({scrollTop: $('.chat')[0].scrollHeight}, 'fast');
         $('form')[0].reset();
      })
      .fail(function(){
        alert('error');
      });
      return false;
  });
});
