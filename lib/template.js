module.exports = {
    HTML:function(loginNav, title, body) {
        return `
        <!doctype html>
        <html>
            <head>
                <title>${title}</title>
                <meta charset="utf-8">
                <link rel="stylesheet" href="../css/main.css">
                <style>
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
            
                    #logo{
                        width: 300px;
                        margin-left: 20px;
                        color: #000;
                        font-size: xx-large;
                        text-decoration: none;
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
                    }
            
                    body {
                        margin: 0 auto;
                        padding-top: 80px;
                        display: flex;
                        justify-content: center;
                        min-height: 100vh;
                    }
            
                    #wrapper{
                        min-height: 100%;
                        margin: 0 auto;
                        max-width: 800px;
                        width: 100%;
                        text-align: center;
                        background:lightyellow;
                    }
            
                    #title {
                        margin-top: 40px;
                    }
            
                    #input_title {
                        width: 80%;
                        margin: auto;
                        margin-top: 30px;
                        display: flex;
                    }
            
                    #input_title h3{
                        width: 25%;
                        height: 25px;
                        margin: auto;
                        margin-left: 10px;
                    }
            
                    #input_title input{
                        width: 70%;
                        height: 25px;
                        margin: auto;
                        margin-left: 10px;
                        border: lightgray solid 1px;
                        border-radius: 5px;
                    }
            
                    #input_content{
                        width: 80%;
                        margin: auto;
                        margin-top: 30px;
                        display: flex;
                    }
            
                    #input_content h3{
                        width: 25%;
                        height: 25px;
                        margin: 0 auto;
                        margin-left: 10px;
                    }
            
                    #input_content textarea{
                        width: 70%;
                        height: 100px;
                        margin: auto;
                        margin-left: 10px;
                        border: lightgray solid 1px;
                        border-radius: 5px;
                    }
            
                    #submit_div{
                        width: 80%;
                        height: 60px;
                        margin: auto;
                        margin-top: 30px;
                        justify-content: center;
                    }
            
                    #submit_div input {
                        width: 100px;
                        height: 60px;
                        margin: auto;
                        background: lightgray;
                        border-radius: 10px;
                        font-size: x-large;
                        border: 0;
                    }
            
                    #submit_div input:hover {
                        color: white;
                        box-shadow: #3CB371 0 0px 0px 40px inset;
                    }
            
                </style>
            </head>
            <body>
                <header>
                    <a href="/" id="logo">📝 Daily Share</a>
        
                    <nav id="main_nav">
                        <a href="/new">NEW</a>
                        <a href="/group">내 그룹</a>
                        <a href="/community">커뮤니티</a>
                        <a href="/create_group">그룹생성</a>
                    </nav>
        
                    ${loginNav}

                </header>
        
                <div id="wrapper">
                    ${body}
                </div>
    
            </body>
        </html>
        `;
    },
    loginNav:function(isLoggedIn) {
        if(isLoggedIn){
            return `<nav id="sub_nav">
                        <a href="/logout">로그아웃</a>
                        <a href="/mypage">마이페이지</a>
                    </nav>`;
        }else{
            return `<nav id="sub_nav">
                        <a href="/signup">회원가입</a>
                        <a href="/signin">로그인</a>
                    </nav>`;
        }
    }
}
