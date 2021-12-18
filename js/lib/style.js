module.exports = {
    nav: `
  * {
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }
    header{
      width: 100%;
      height: 80px;
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #FFEC86;
      font-weight: bold;
    }
    header h1{
      width: 300px;
      margin-left: 20px;
    }
    #main_nav{
        width: 600px;
        display: flex;
        justify-content: space-between;
    }
    #main_nav a{
        font-size: x-large;
        color: #666;
        text-decoration: none;
    }
    #sub_nav{
        width: 300px;
        display: block;
        margin-right: 50px;
    }
    #sub_nav a{
        float: right;
        margin-left: 30px;
        font-size: small;
        color: #444;
        text-decoration: none;
    }`,
    login_form_style: `
    
    h2{
      text-align: center;
    }
    .login-form {
    background-color: #FAF6E7;
    padding : 20px;
    border-radius: 5px;
    width: 600px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 150px;
    }
    .text-field {
      font-size: 14px;
      border : none;
      margin-bottom: 5px;
      padding: 10px;
      border-radius: 5px;
      width:100%;
    }
    .submit-btn {
      font-size: 14px;
      background-color: #FFEE97;
      color: black;
      border: none;
      padding: 10px;
      margin-top: 30px;
      border:none;
      border-radius: 5px;
      width:100%;
    }
    .links {
      margin-top: 30px;
      text-align: center;
    }
    .links a {
      font-size: 12px;
      color: #9B9B9B;
    }`,
    my:`
    body {
      margin: 0 auto;
      padding-top: 80px;
      display: flex;
      justify-content: center;
      min-height: 100vh;
      background: rgb(250, 243, 214);
    }
    #wrapper{
      min-height: 100%;
      margin: 0 auto;
      max-width: 800px;
      width: 100%;
      text-align: center;
      background:white;
    }
    #title {
        margin-top: 40px;
    }
    #name_wrapper{
      font-size: 22px;
      text-align: left;
      margin-top: 70px;
      margin-right: 100px;
      height: 150px;
      display: block;
      padding: 20px;
      background: #FFEC86;
      border-radius: 10px;
    }
    .text_center{
        text-align: center;
    }
    #mydiary_wrapper{
      margin-top: 20px;
      padding: 10px;
      width: 600px;
      min-height: 90%;
      background: white;
      border-radius: 10px;
    }
    #mydiary_day{
        white-space:nowrap; 
        overflow-x: auto;
    }
    #mydiary_day h3{
        margin-left: 50px;
        border-radius: 30px;
        padding-left: 23px;
        width: 150px;
        background-color: #FAF25E;
    }
    .mydiary_content{
        white-space: normal;
        overflow-y: auto;
        background: #FAF6E7;
        padding: 10px;
        border-raius: 10px;
        width: 80%;
        height: 300px;
        margin: auto 50px;
        float: left;
    }
    #nickbtn{
      font-size: 18px;
      background-color: white;
      color: black;
      border-radius: 5px;
      border-color: #FFEC86;
    }
    `,
    mod_my:`
    body{
      background: #FFEC86;
  }
  .info{
      margin-left: 20px;
  }
  .text_center{
      text-align: center;
  }
  .text-field {
      font-size: 14px;
      border : none;
      margin-bottom: 5px;
      margin-right: 10px;
      padding: 10px;
      border-radius: 5px;
      width: 50%;
    }
    .sign-btn {
      font-size: 17px;
      background-color: #FFEE97;
      color: black;
      border: none;
      padding: 10px;
      margin-top: 30px;
      margin-bottom: 20px;
      border-radius: 5px;
      font-weight: bolder;
      text-align: center;
      width:300px;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }`
  }