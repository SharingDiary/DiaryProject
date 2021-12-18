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
    createGroupHTML:function(loginNav, title, requestUrl) {
        return `<!DOCTYPE html>
        <html lang="kr">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <meta name="description" content="group_create.html">
            <meta name="author" content="데베플 3팀">
        
            <title>${title}</title>
        
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
        
                #input_group_name {
                    width: 80%;
                    margin: auto;
                    margin-top: 30px;
                    display: flex;
                }
        
                #input_group_name h3{
                    width: 25%;
                    height: 25px;
                    margin: auto;
                    margin-left: 10px;
                }
        
                #input_group_name input{
                    width: 70%;
                    height: 25px;
                    margin: auto;
                    margin-left: 10px;
                    border: lightgray solid 1px;
                    border-radius: 5px;
                }
        
                #input_group_description{
                    width: 80%;
                    margin: auto;
                    margin-top: 30px;
                    display: flex;
                }
        
                #input_group_description h3{
                    width: 25%;
                    height: 25px;
                    margin: 0 auto;
                    margin-left: 10px;
                }
        
                #input_group_description textarea{
                    width: 70%;
                    height: 100px;
                    margin: auto;
                    margin-left: 10px;
                    border: lightgray solid 1px;
                    border-radius: 5px;
                }
        
                #input_headcount{
                    width: 80%;
                    margin: auto;
                    margin-top: 30px;
                    display: flex;
                }
        
                #input_headcount h3{
                    width: 25%;
                    height: 25px;
                    margin: 0 auto;
                    margin-left: 10px;
                }
        
                #input_headcount input{
                    width: 70%;
                    height: 25px;
                    margin: auto;
                    margin-left: 10px;
                    border: lightgray solid 1px;
                    border-radius: 5px;
                }
        
                #group_member{
                    width: 80%;
                    margin: auto;
                    margin-top: 30px;
                    display: flex;
                }
        
                #group_member h3{
                    width: 25%;
                    height: 25px;
                    margin: 0 auto;
                    margin-left: 10px;
                }
        
                #group_member textarea{
                    width: 55%;
                    height: 100px;
                    margin: auto;
                    margin-left: 10px;
                    border: lightgray solid 1px;
                    border-radius: 5px;
                }
        
                #group_member input{
                    width: 10%;
                    height: 25px;
                    margin: 0 auto;
                    margin-left: 10px;
                    background-color: lightgray;
                    border: transparent;
                    border-radius: 5px;
                }
                
                #member_recruitment{
                    width: 80%;
                    margin: auto;
                    margin-top: 30px;
                    display: flex;
                    justify-content: center;
                    text-align: center;
                }
        
                #member_recruitment h3{
                    height: 20px;
                    margin: auto;
                }
        
                #member_recruitment input{
                    width: 18px;
                    height: 18px;
                    margin-left: 10px;
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
        
            <body>
                <div id="wrapper">
                    <h2 id="title">${title}</h2>
                    <form action="${requestUrl}/create_group_process" method="post">
                        <div id="input_group_name">
                            <h3>그룹명</h3>
                            <input type="text" name="name" placeholder="그룹명을 입력해주세요.">
                        </div>
        
                        <div id="input_group_description">
                            <h3>그룹 설명</h3>
                            <textarea name="description" placeholder="그룹 설명을 입력해주세요."></textarea>
                        </div>
        
                        <div id="input_headcount">
                            <h3>희망인원수</h3>
                            <input type="text" name="headcount" placeholder="희망인원수를 입력해주세요.">
                        </div>
        
                        <div id="group_member">
                            <h3>그룹원</h3>
                            <textarea name="member" placeholder="그룹원 콤마(,)로 연결"></textarea>
                            <input type="button" id="invitation" value="초대" onclick="searchId();">
                        </div>
        
                        <div id="member_recruitment">
                            <h3>커뮤니티에서 그룹 구하기<span>
                                <input type="checkbox" name="recruitment" id="recruitment" value = 1>
                                <input type="hidden" name="recruitment" value=0 id="recruitment_hidden"/>
                            </h3>
                            
                        </div>
        
                        <div id="submit_div">
                            <input type="submit" value="완료">
                        </div>
                        
                    </form>
                </div>
        
            </body>
        <script>
            function searchId(){
                window.open("/searchId","아이디 찾기","width=400, height=300, top=10, left=10");
            }
        </script>
        
        </body>
        </html>
        `;
    },
    groupHTML:function(loginNav, title, body) {
        return `
        <!DOCTYPE html>
        <html lang="kr">
        <head>

        <title>${title}</title>

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

        #main_nav_here a{
            font-size: x-large;
            color: #000;
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

        #title_div {
            width: 90%;
            height: 30px;
            margin: auto;
            margin-top: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        #title_div .title_div_left h2 {
            height: 40px;
            margin: auto;
            margin-top: 10px;
            margin-left: 10px;
            float: left;
        }

        #title_div .title_div_left button{
            width: 10px;
            height: 10px;
            margin: 0 auto;
            margin-top: 10px;
            font-size: large;
            background: none;
            border: transparent solid 2px;
            border-radius: 10px;
            text-align: center;
        }
        
        #title_div .title_div_left button:focus {
            border: 0;
            outline: 0;
        }

        #bottom_div{
            width: 80%;
            height: 80px;
            margin: auto;
            margin-top: 30px;
            justify-content: flex-end;
        }

        #bottom_div button {
            width: 80px;
            height: 80px;
            margin: auto;
            background: #D2E7FF;
            border-radius: 50%;
            font-size: xx-large;
            font-weight: bold;
            border: 0;
            position: fixed;
            right: 350px;
            bottom: 0px;
            float: right;
        }

        #bottom_div button:hover {
            color: white;
            box-shadow: #499AFA 0 0px 0px 40px inset;
        }

        #groups_div {
            width: 100%;
            height: 500px;
            margin: auto;
            margin-top: 20px;
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: center;
            align-content: flex-start; 
        }

        #groups_div .group_div {
            width: 30%;
            height: 50%;
            margin-left: 10px;
            margin-top: 10px;
            background: #FFEE97;
            cursor: pointer;
            text-align: center;
        }

        #groups_div .group_div a.button{
            margin-top: 10px;
            -webkit-appearance: button;
            -moz-appearance: button;
            appearance: button;
            text-decoration: none;
        }

        #groups_div .group_div button{
            width: 50px;
            heigth: 50px;
            margin-right: 5px;
            background: none;  
            border-radius: 25px;
            border: 10px transparent solid;
            text-align: center;
        }

        #groups_div .group_div button:hover{
            background: #FCC718;
        }

        #groups_div .group_div input{
            width: 50px;
            heigth: 50px;
            margin-top: 10px;
            background-color: transparent;  
            border-radius: 25px;
            border: 10px transparent solid;
        }

        #groups_div .group_div input:hover{
            background-color: #FC6F6F;
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

    <body>
        <div id="wrapper">
            ${body}
            <div id="bottom_div">
                <button onclick="location.href='/create_group';">
                    +
                </button>
            </div>
        </div>
    </body>
    <script>
        function moveToGroup(url) {
            location.href=url;
        }
    </script>
</body>
</html>
        `;
    },
    groupList:function(userId, groups, count, requestUrl) {
        let list = ``;
        let control = ``;
        let recruitmentState = '';
        for(let i = 0; i < groups.length; i++) {
            if(groups[i].recruitment == 1) {
                recruitmentState = '🌎';
            } else {
                recruitmentState = '🔒';
            }
            let groupId = groups[i].group_id;
            if(groups[i].is_leader == 1 && groups[i].member_id == userId) { //그룹 생성한 사람만 수정, 삭제 버튼 보임
                control = `
                <a href="/update_group/${groupId}" class="button">🖊️</a>
                <form action="/delete_group" method="post" onsubmit="return confirm('정말로 삭제하시겠습니까?');">
                    <input type="hidden" name="groupId" value="${groupId}">
                    <input type="submit" value="🗑️">
                </form>
                `;
            }
            list += `
            <div class="group_div" onclick="moveToGroup('${requestUrl}/myGroup/${groups[i].group_id}')">
            <h3>${groups[i].name}</h3>
            <h4>${count[i].currentHeadcount}/${groups[i].headcount}</h4>
            <h4>${recruitmentState}</h4>
            <h5>${control}</h5>
            </div>`;
        }
        return list;
    },
    updateGroupHTML: function(loginNav, title, body) {
        return `
        <!DOCTYPE html>
        <html lang="kr">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <meta name="description" content="group_modify.html">
            <meta name="author" content="데베플 3팀">
        
            <title>그룹 수정</title>
        
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
        
                #input_group_name {
                    width: 80%;
                    margin: auto;
                    margin-top: 30px;
                    display: flex;
                }
        
                #input_group_name h3{
                    width: 25%;
                    height: 25px;
                    margin: auto;
                    margin-left: 10px;
                }
        
                #input_group_name input{
                    width: 70%;
                    height: 25px;
                    margin: auto;
                    margin-left: 10px;
                    border: lightgray solid 1px;
                    border-radius: 5px;
                }
        
                #input_group_description{
                    width: 80%;
                    margin: auto;
                    margin-top: 30px;
                    display: flex;
                }
        
                #input_group_description h3{
                    width: 25%;
                    height: 25px;
                    margin: 0 auto;
                    margin-left: 10px;
                }
        
                #input_group_description textarea{
                    width: 70%;
                    height: 100px;
                    margin: auto;
                    margin-left: 10px;
                    border: lightgray solid 1px;
                    border-radius: 5px;
                }
        
                #input_headcount{
                    width: 80%;
                    margin: auto;
                    margin-top: 30px;
                    display: flex;
                }
        
                #input_headcount h3{
                    width: 25%;
                    height: 25px;
                    margin: 0 auto;
                    margin-left: 10px;
                }
        
                #input_headcount input{
                    width: 70%;
                    height: 25px;
                    margin: auto;
                    margin-left: 10px;
                    border: lightgray solid 1px;
                    border-radius: 5px;
                }
        
                #group_member{
                    width: 80%;
                    margin: auto;
                    margin-top: 30px;
                    display: flex;
                }
        
                #group_member h3{
                    width: 25%;
                    height: 25px;
                    margin: 0 auto;
                    margin-left: 10px;
                }
        
                #group_member textarea{
                    width: 55%;
                    height: 100px;
                    margin: auto;
                    margin-left: 10px;
                    border: lightgray solid 1px;
                    border-radius: 5px;
                }
        
                #group_member input{
                    width: 10%;
                    height: 25px;
                    margin: 0 auto;
                    margin-left: 10px;
                    background-color: lightgray;
                    border: transparent;
                    border-radius: 5px;
                }
                
                #member_recruitment{
                    width: 80%;
                    margin: auto;
                    margin-top: 30px;
                    display: flex;
                    justify-content: center;
                    text-align: center;
                }
        
                #member_recruitment h3{
                    height: 20px;
                    margin: auto;
                }
        
                #member_recruitment input{
                    width: 18px;
                    height: 18px;
                    margin-left: 10px;
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
        
                a {
                    text-decoration: none;
                }
        
            </style>
        
        </head>
        <body>
            <header>
                <h1>📝 Daily Share</h1>
        
                <nav id="main_nav">
                    <a href="/new">NEW</a>
                    <a href="/group">내 그룹</a>
                    <a href="/community">커뮤니티</a>
                    <a href="/create_group">그룹생성</a>
                </nav>
        
                <nav id="sub_nav">
                    <a href="/signup">회원가입</a>
                    <a href="/signin">로그인</a>
                </nav>
            </header>
        
            <body>
                <div id="wrapper">
                    <h2 id="title">${title}</h2>
                    ${body}
                </div>
            </body>
        <script>
            function searchId(){
                window.open("/searchId","아이디 찾기","width=400, height=300, top=10, left=10");
            }
        </script>
        </body>
        </html>
                `;
    },
    searchIdHTML:function(requestUrl, result) {
        return `
        <form action="${requestUrl}/process" method="post">
        아이디: <input type="text" name="memberId">
        <input type="submit" id="search" value="찾기">
        <input type="button" id="close" value="닫기" onclick="window.close()">
        </form>
        <p style="color:red;">${result}</p>`
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
