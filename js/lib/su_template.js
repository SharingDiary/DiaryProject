module.exports = {
    HTML: function(nav_style, sign_up_style, requestUrl){
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <meta name="description" content="">
          <meta name="author" content="">
          <title>Document</title>
          <style>
          #logo{
            width: 300px;
            margin-left: 20px;
            color: #000;
            font-size: xx-large;
            text-decoration: none;
          }
          ${nav_style}
          ${sign_up_style}
          </style>
</head>
<body>
  <header>
    <a href="/" id="logo">๐ Shary</a>
    <nav id="main_nav">
        <a href="/new">NEW</a>
        <a href="/group">๋ด ๊ทธ๋ฃน</a>
        <a href="/community">์ปค๋ฎค๋ํฐ</a>
        <a href="/create_group">๊ทธ๋ฃน์์ฑ</a>
    </nav>
    <nav id="sub_nav">
        <a href="/signup">ํ์๊ฐ์</a>
        <a href="/signin">๋ก๊ทธ์ธ</a>
    </nav>
</header>
<body>
  <div class="login-form">
    <form action="${requestUrl}/sign_up_process" method="post">
      <h2>ํ์๊ฐ์</h2>
      <div class="info">
      <h4>๋ด ์ ๋ณด ์๋ ฅ</h4>
      <div class="info-one">
      <b>๋๋ค์</b> <input type="text" name="nickname" class="text-field"> <br>
      </div>
      <div class="info-one">
      <b>์์ด๋</b><input type="text" name="email" class="text-field">
      <p class="sign-check id-check">์กด์ฌํ๋ ์์ด๋์๋๋ค.</p>
      </div>
      <div class="info-one">
      <b>๋น๋ฐ๋ฒํธ</b>
      <input type="password" name="password" class="text-field"> <br>
      </div>
      <div class="info-one"></div>
      <b>๋น๋ฐ๋ฒํธ ํ์ธ</b>
      <input type="password" name="repassword" class="text-field"> <br>
      <p class="sign-check pwd-check">๋น๋ฐ๋ฒํธ๊ฐ ๋ค๋ฆ๋๋ค.</p>
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