module.exports = {
    nav: `header{
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
    sign_up: function(isIdRight, isPwdRight){
      return `
      * {box-sizing: border-box; font-family: 'Noto Sans KR', sans-serif;}
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
        margin-top: 120px;
        
      
      }
  
      .login-form b{
        width : 120px;
      float : left;
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
  
      .info {
        margin-left: 20px;
      }
  
      .info-one{
        margin-top: 10px;
      }
  
      #id-btn{
        font-size: 14px;
        font-weight: 700;
        background-color: #FFEE97;
        border-radius: 5px;
        color: black;
        border: none;
        padding: 10px;
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
      }
  
      .links {
        margin-top: 30px;
        text-align: center;
      }
      .sign-check {font-size: 14px; margin-left:120px;}
      .id-check {${isIdRight}}
      .pwd-check {${isPwdRight}}`
    }
}