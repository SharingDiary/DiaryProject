module.exports = {
    HTML: function(nav_style, sign_up_style){
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <meta name="description" content="">
          <meta name="author" content="">
          <title>Document</title>
          <style>
          ${nav_style}
          ${sign_up_style}
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
        <a href="./signup.html">회원가입</a>
        <a href="./login.html">로그인</a>
    </nav>
</header>
<body>
  <div class="login-form">
    <form action="/sign_up_process" method="post">
      <h2>회원가입</h2>
      <div class="info">
      <h4>내 정보 입력</h4>
      <div class="info-one">
      <b>닉네임</b> <input type="text" name="nickname" class="text-field"> <br>
      </div>
      <div class="info-one">
      <b>아이디</b><input type="text" name="email" class="text-field">
      <p class="sign-check id-check">존재하는 아이디입니다.</p>
      <!-- <a href="/sign_up_id_check"> -->
      </div>
      <div class="info-one">
      <b>비밀번호</b>
      <input type="password" name="password" class="text-field"> <br>
      </div>
      <div class="info-one"></div>
      <b>비밀번호 확인</b>
      <input type="password" name="repassword" class="text-field"> <br>
      <p class="sign-check pwd-check">비밀번호가 다릅니다.</p>
      </div>
      <input type="submit" value="Sign Up" class="sign-btn">
      
    </div>
    </form>
  </div>

</body>
</body>
</html>`;
    }
}