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

                    .group-container {width:100%; height: 100%;}
                .group-bar { margin: 10px;}
                .group-desc { width: auto; height: auto; background: #FFEC86; border-radius: 5px; align-content: center;}
                .group-title { display: inline-flex; float: left; font-weight: 700; }
                .group-people {float: right;}
                .group-how-many { display: inline-flex;}
                .group-number-of-people { display: inline-flex;}

                .group-main-desc {width: auto; height: 50px;  padding: 0 20px; cursor: pointer;}
                .group-more-desc {width: auto; height: auto; padding: 20px; background: white; display: none;}
                .group-writing-wrap {width: 80%; text-align: left; margin: 0 auto;}
                .group-writing {margin: 0;}

                .group-master-profile {height: 50px; }
                .group-profile { height: auto; float: left; display: inline-flex;}
                .profile-photo { width:45px; height: 45px; background: gray; border-radius: 25px;} 
                .profile-nickname {margin: auto 0 auto 10px ;}
                .profile-nickname p {margin: 0;}

                .group-reply-container {height: auto; margin-top: 10px;}
                .group-reply {height: auto; background: lightyellow; padding: 10px 20px; margin-top:20px;}
                .group-reply-inside {margin: 0;}
                .group-reply-profile { height: 50px; }
                .group-reply-wrap { margin-top: 2px; margin-left:10px;}
                .reply-profile{ cursor: pointer;}

                .group-reply-writing {}
                .reply-content { padding:10px; font-size: 14px; border : none; border-radius: 5px; width: 90%; background: lightyellow;}
                .reply-submit {padding:10px; font-size: 14px; background-color: #FFEE97; color: black; border: none; cursor: pointer;}

                .group-reply-popup {background:#FFEC86; width:220px; height:auto; padding: 10px; position:absolute; 
                    display: none; border: 1px solid white;}
                .group-invitation-btn {background: #FDD713; padding:10px;}
                .group-invitation-btn p {color: white; margin:0;}
            
                .recruitment-post-delete-button{
                    border: 0;
                    float:right;
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

            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
            <script>
                console.log("hi");
                $(document).on("click", ".spread-more", function() {
                    var index = $(".spread-more").index(this); 
                    // console.log(index);
                    if($('.group-more-desc').eq(index).css('display') === 'none'){       
                        $(".group-more-desc").eq(index).show();
                    } else { 
                        $(".group-more-desc").eq(index).hide();
                    }
                });
                
                // var invitation = $('.reply-profile');
                $(document).on("click", ".reply-profile", function (event) {
                x = event.pageX;
                y = event.pageY; 
                //    alert('x좌표:' +x + ', y좌표:' + y);
                $(".group-reply-popup").css({"top":y, "left":x, "z-index": 100}).show();
                //    console.log("whyery");
                })
            </script>
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
