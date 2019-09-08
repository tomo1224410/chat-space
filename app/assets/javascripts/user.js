$(function() {

  var search_list = $("#user-search-result");

  function appendUserList(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                </div>`
    search_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    search_list.append(html);
  }

  $('#user-search-field').on("keyup", function(){
    var input = $("#user-search-field").val();
    
    $.ajax({
     type: 'GET',
     url: '/users',
     data: { name: input },
     dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUserList(user);
          });
        }
        else {
          appendErrMsgToHTML("一致するユーザーがいません");
        }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    })
  });

  var member_list = $('.chat-group-user__name');

  function appendMemberList(name, user_id) {
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    member_list.append(html);
  }
 
  $(function() {
    $(document).on("click", '.user-search-add', function() {
        var name = $(this).attr("data-user-name");
        var user_id = $(this).attr("data-user-id");
        $(this).parent().remove();
        appendMemberList(name, user_id);
    });

    $(document).on("click", '.user-search-remove', function() {
      $(this).parent().remove();
    });
  });
});