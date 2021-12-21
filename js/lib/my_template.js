module.exports = {
    my_nickname_HTML: function(id, nickname, requestUrl){
      return `
      <div id="name_wrapper" class="text_center">
      <form action="${requestUrl}/modify_nick" method="POST">
        <h4>ID: ${id}</h4>
        <h4>닉네임: <input type="text" name="nickname" placeholder="${nickname}" style="border: none;">
        <input type="submit" value="수정" id="nickbtn"></h4>
      </form>
      </div>`
    },
    my_diary_list: function(date, title, body){
      return `
      <div id="mydiary_day">
        <h3>${date}</h3>
        <div class="mydiary_content text_center">
            <h4>${title}</h4>
            <p>${body}</p>
        </div>
      </div>
        `;
    }
  }