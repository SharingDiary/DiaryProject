const { my_diary_list } = require("./my_template")

module.exports = {
  login_HTML:function(nav_style, log_style, script){
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
  <title>Shary</title>
  <style>
  ${nav_style}
  ${log_style}
  </style>
</head>
<body>
  <header>
    <h1>📝 Shary</h1>

    <nav id="main_nav">
        <a href="/new">NEW</a>
        <a href="/group">내 그룹</a>
        <a href="/community">커뮤니티</a>
        <a href="/create_group">그룹생성</a>
    </nav>

    <nav id="sub_nav">
        <a href="/signup">회원가입</a>
        <a href="/login">로그인</a>
    </nav>
    </header>
    <body>
    <div class="login-form">
    <form action="/login_access" method="POST">
      <h2>로그인</h2>
      <h3>ID</h3>
      <input type="text" name="email" class="text-field" placeholder="아이디">
      <h3>Password</h3>
      <input type="password" name="password" class="text-field" placeholder="비밀번호">
      <input type="submit" value="Sign In" class="submit-btn">
    </form>

    <div class="links">
      <a href="signup">회원가입 하시겠습니까?</a>
    </div>
  </div>
  ${script}
  </body>
</body>
</html>
    `
  },
  main_HTML:function(nav_style, list){
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
  <title>Shary</title>
  <style>
  ${nav_style}
  </style>
</head>
<body>
  ${list}
  <h1>안녕하세요!</h1>
</body>
</html>
    `
  },
  my_HTML:function(nav_style, my_style, my_nickname_HTML, my_diary){
    return `<!DOCTYPE html>
  <html lang="kr">
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="description" content="Base.html">
      <meta name="author" content="데베플 3팀">
  
      <title>Shary</title>
  
      <style>
          ${nav_style}
          ${my_style}  
      </style>
  
  </head>
  <body>
      <header>
          <h1>📝 Shary</h1>
  
          <nav id="main_nav">
              <a href="/new">NEW</a>
              <a href="/group">내 그룹</a>
              <a href="/community">커뮤니티</a>
              <a href="/create_group">그룹생성</a>
          </nav>
  
          <nav id="sub_nav">
              <a href="/logout">로그아웃</a>
              <a href="/mypage">마이</a>
          </nav>
      </header>
  
      <body>
          ${my_nickname_HTML}
          ${my_diary}
      </body>
  <script>
      function modifyMypage(){
          window.open("modifyMypage.html","닉네임 수정","width=400, height=300, top=10, left=10");
      }
  </script>

  </body>
  </html>`
  }

}