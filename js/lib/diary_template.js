module.exports = {
    REGISTER:function(title, body){
        return `
        <!doctype html>
        <html>
            <head>
                <title>${title}</title>
                <meta charset="utf-8">
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

        #top_div{
            width: 80%;
            height: 80px;
            margin: auto;
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        #top_div .top_div_left{
            width: 70%;
            height: 100%;
        }

        #top_div .top_div_right{
            width: 30%;
            height: 100%;
        }

        #top_div .top_div_left h4{
            height: 20px;
            margin: auto;
            margin-top: 10px;
            margin-left: 15px;
            float: left;
        }

        #top_div .top_div_left input{
            width: 90%;
            height: 30px;
            margin: auto;
            margin-top: 5px;
            margin-left: 10px;
            padding-left: 10px;
            float: left;
            border: lightgray solid 1px;
            border-radius: 10px;
        }

        #top_div .top_div_right h4{
            height: 20px;
            margin: auto;
            margin-top: 10px;
            margin-left: 15px;
            float: left;
        }

        #top_div .top_div_right .weather{
            width: 90%;
            height: 30px;
            margin: auto;
            margin-top: 5px;
            margin-left: 10px;
            float: left;
            border: lightgray solid 1px;
            border-radius: 10px;
            background: white;
        }

        #top_div .top_div_right .weather input{
            width: 30px;
            height: 30px;
            margin: 0 auto;
            font-size: large;
            background: none;
            border: transparent solid 2px;
            border-radius: 15px;
            text-align: center;
        }

        #selected {
            width: 30px;
            height: 30px;
            margin: 0 auto;
            font-size: large;
            background: none;
            border: transparent solid 2px;
            border-radius: 15px;
            text-align: center;
            border-radius: 15px;
            border: red solid 2px;
        }

        #middle_div{
            width: 80%;
            height: 500px;
            margin: auto;
            margin-top: 30px;
            display: block;
            justify-content: start;
        }

        #middle_div h4{
            height: 20px;
            margin: auto;
            margin-top: 10px;
            margin-left: 15px;
            float: left;
        }

        #middle_div textarea{
            width: 93%;
            height: 80%;
            margin: auto;
            margin-top: 5px;
            margin-left: 10px;
            padding: 10px;
            float: left;
            border: lightgray solid 1px;
            border-radius: 10px;
            text-align:start;
        }

        #bottom_div{
            width: 80%;
            height: 60px;
            margin: auto;
            margin-top: 30px;
            justify-content: center;
        }

        #bottom_div input {
            width: 100px;
            height: 60px;
            margin: auto;
            background: lightgray;
            border-radius: 10px;
            font-size: x-large;
            border: 0;
        }

        #bottom_div input:hover {
            color: white;
            box-shadow: #3CB371 0 0px 0px 40px inset;
        }

    </style>

</head>
<body>
    <header>
        <a href="/" id="logo">???? Shary</a>

        <nav id="main_nav">
            <a href="/new">NEW</a>
            <a href="/group">??? ??????</a>
            <a href="/community">????????????</a>
            <a href="/create_group">????????????</a>
        </nav>

        <nav id="sub_nav">
            <a href="/logout">????????????</a>
            <a href="/mypage">???????????????</a>
        </nav>
    </header>

        ${body}
        <script>
            let checkedWeather = "sunny";

            window.onload = function(){
                checkOn(checkedWeather);
                document.getElementById("weather").value = checkedWeather;
            }

            function weatherChange(weather){
                checkOn(weather);
                checkOff(checkedWeather);
                checkedWeather = weather;
                document.getElementById("weather").value = checkedWeather;
            }

            function checkOn(weather){
                document.getElementById(weather).style.borderColor="red";
            }

            function checkOff(weather){
                document.getElementById(weather).style.borderColor="transparent";
            }

        </script>
    </body>
        `;
    },
    NEW_DIARY:function(title,body){
        return `
        <!DOCTYPE html>
<html lang="kr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Base.html">
    <meta name="author" content="????????? 3???">

    <title>??????</title>

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

        #title_div .title_div_left {
            width: 30%;
            height: 40px;
        }

        #title_div .title_div_right {
            width: 70%;
            height: 40px;
        }

        #title_div .title_div_left h2 {
            margin: auto;
            margin-top: 10px;
            margin-left: 10px;
            color: red;
            float: left;
        }

        #title_div .title_div_left button {
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

        #title_div .title_div_right input{
            width: 50%;
            height: 30px;
            margin: auto;
            margin-top: 5px;
            margin-left: 200px;
            padding-left: 10px;
            border: lightgray solid 1px;
            border-radius: 10px;
        }

        #title_div .title_div_right .search {
            width: 10%;
            height: 10px;
            margin: auto;
            margin-top: 10px;
            margin-right: 20px;
            border: transparent solid 2px;
            border-radius: 10px;
            float: right;
            background: none;
        }

        #title_div .title_div_right .search input{
            width: 10px;
            height: 10px;
            margin: 0 auto;
            font-size: large;
            background: none;
            border: transparent solid 2px;
            border-radius: 15px;
            text-align: center;
        }

        #title_div .title_div_right .search input:focus{
            border: 0;
            outline: 0;
        }

        #diarys_div {
            width: 90%;
            height: 300px;
            margin: auto;
            margin-top: 20px;
            display: flex;
            justify-content: center;
            align-content: flex-start;
            background: #FAF6E7;
        }

        #diary_div {
            width: 90%;
            height: 300px;
            margin: auto;
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            align-content: flex-start;
            background: #FAF6E7;
        }

        #diary_top_div {
            width: 100%;
            height: 40px;
            margin: auto;
            margin-top: 10px;
            display: flex;
            align-content: flex-start; 
        }

        #diary_top_div .diary_top_div_left {
            height: 40px;
        }

        #diary_top_div .diary_top_div_middle {
            width: 500px;
            height: 40px;
            display: flex;
            flex-direction: column;
        }

        #diary_top_div .diary_top_div_right {
            width: 90%;
            height: 40px;
            margin-top: 5px;
            margin-right: 20px;
        }

        .diary_top_div_right .div_btn_float_right{
            float:right; 
            margin-right:10px;
        }

        .diary_top_div_right .div_btn_float_right .diary_btn{
            border: none;
            border-radius: 12px;
            width:40px;
            height:26px;
            background-color: #FFEC86;
            color: #5f5f5f;
            text-align: center;
            text-decoration: none;
            font-weight: bolder;
        }

        #diary_top_div .diary_top_div_left img{
            width: 40px;
            height: 40px; 
            border-radius: 50%;
            margin-top: 5px;
            margin-left: 10px;
            overflow: hidden;
            object-fit: cover;
            float:left;
            vertical-align: middle;
        }

        #diary_top_div .diary_top_div_middle h4 {
            height: 20px;
            margin: auto;
            margin-top: 5px;
            margin-left: 10px;
            float: left;
        }

        #diary_top_div .diary_top_div_middle h5 {
            height: 20px;
            margin: auto;
            margin-top: 5px;
            margin-left: 10px;
            float: left;
        }

        #diary_top_div .diary_top_div_right button {
            width: 10px;
            height: 10px;
            margin: 0 auto;
            font-size: large;
            font-weight: bold;
            background: none;
            border: transparent solid 2px;
            border-radius: 10px;
            text-align: center;
            float: right;
        }
        
        #diary_top_div .diary_top_div_right button:focus {
            border: 0;
            outline: 0;
        }

        #diary_middle_div {
            width: 100%;
            height: 100%;
            margin: auto;
            margin-top: 10px;
            margin-left: 30px;
            display: flex;
            flex-direction: column;
            justify-content: center;

        }

        #diary_middle_div h4{
            height: 20px;
            margin: auto;
            margin-left: 30px;
            font-size: x-large;
            float: left;
        }

        #diary_middle_div h5{
            width: 85%;
            height: 70%;
            margin: auto;
            margin-top: 5px;
            margin-left: 30px;
            padding: 10px;
            float: left;
            text-align:start;
            background: white;
        }


    </style>
</head>
<body>
    <header>
        <a href="/" id="logo">???? Shary</a>

        <nav id="main_nav">
            <a href="/new">NEW</a>
            <a href="/group">??? ??????</a>
            <a href="/community">????????????</a>
            <a href="/create_group">????????????</a>
        </nav>

        <nav id="sub_nav">
            <a href="/logout">????????????</a>
            <a href="/mypage">???????????????</a>
        </nav>
    </header>

    <body>
        <div id="wrapper">
            <div id="title_div">
                <div class="title_div_left">
                    <h2>${title}</h2>
                </div>
                <div class="title_div_right">
                    <!-- ????????? ?????? ??????-->
                    
                    <div class="search">
                        
                    </div>
                </div>
            </div>
            ${body}
            
        </div>
    </body>
</body>
</html>
        `;

    }
    ,
    DIARY_UPATE:function(title, update){
        return `<!DOCTYPE html>
        <html lang="kr">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <meta name="description" content="diary_modify.html">
            <meta name="author" content="????????? 3???">
        
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
        
                header h1{
                    width: 300px;
                    margin-left: 20px;
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
        
                #top_div{
                    width: 80%;
                    height: 80px;
                    margin: auto;
                    margin-top: 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
        
                #top_div .top_div_left{
                    width: 70%;
                    height: 100%;
                }
        
                #top_div .top_div_right{
                    width: 30%;
                    height: 100%;
                }
        
                #top_div .top_div_left h4{
                    height: 20px;
                    margin: auto;
                    margin-top: 10px;
                    margin-left: 15px;
                    float: left;
                }
        
                #top_div .top_div_left input{
                    width: 90%;
                    height: 30px;
                    margin: auto;
                    margin-top: 5px;
                    margin-left: 10px;
                    padding-left: 10px;
                    float: left;
                    border: lightgray solid 1px;
                    border-radius: 10px;
                }
        
                #top_div .top_div_right h4{
                    height: 20px;
                    margin: auto;
                    margin-top: 10px;
                    margin-left: 15px;
                    float: left;
                }
        
                #top_div .top_div_right .weather{
                    width: 90%;
                    height: 30px;
                    margin: auto;
                    margin-top: 5px;
                    margin-left: 10px;
                    float: left;
                    border: lightgray solid 1px;
                    border-radius: 10px;
                    background: white;
                }
        
                #top_div .top_div_right .weather input{
                    width: 30px;
                    height: 30px;
                    margin: 0 auto;
                    font-size: large;
                    background: none;
                    border: transparent solid 2px;
                    border-radius: 15px;
                    text-align: center;
                }
        
                #selected {
                    width: 30px;
                    height: 30px;
                    margin: 0 auto;
                    font-size: large;
                    background: none;
                    border: transparent solid 2px;
                    border-radius: 15px;
                    text-align: center;
                    border-radius: 15px;
                    border: red solid 2px;
                }
        
                #middle_div{
                    width: 80%;
                    height: 500px;
                    margin: auto;
                    margin-top: 30px;
                    display: block;
                    justify-content: start;
                }
        
                #middle_div h4{
                    height: 20px;
                    margin: auto;
                    margin-top: 10px;
                    margin-left: 15px;
                    float: left;
                }
        
                #middle_div textarea{
                    width: 93%;
                    height: 80%;
                    margin: auto;
                    margin-top: 5px;
                    margin-left: 10px;
                    padding: 10px;
                    float: left;
                    border: lightgray solid 1px;
                    border-radius: 10px;
                    text-align:start;
                }
        
                #bottom_div{
                    width: 80%;
                    height: 60px;
                    margin: auto;
                    margin-top: 30px;
                    justify-content: center;
                }
        
                #bottom_div input {
                    width: 100px;
                    height: 60px;
                    margin: auto;
                    background: lightgray;
                    border-radius: 10px;
                    font-size: x-large;
                    border: 0;
                }
        
                #bottom_div input:hover {
                    color: white;
                    box-shadow: #3CB371 0 0px 0px 40px inset;
                }
        
            </style>
        
        </head>
        <body>
            <header>
                <a href="/" id="logo">???? Shary</a>
        
                <nav id="main_nav">
                    <a href="/new">NEW</a>
                    <a href="/group">??? ??????</a>
                    <a href="/community">????????????</a>
                    <a href="/create_group">????????????</a>
                </nav>
        
                <nav id="sub_nav">
                    <a href="/logout">????????????</a>
                    <a href="/mypage">???????????????</a>
                </nav>
            </header>
        
            <body>
                <div id="wrapper">
                    <h2 id="title">?????? ??????</h2>


                    ${update}



                </div>
        
            </body>
        <script>
            let checkedWeather = "sunny";
        
            window.onload = function(){
                checkOn(checkedWeather);
                document.getElementById("weather").value = checkedWeather;
            }
        
            function weatherChange(weather){
                checkOn(weather);
                checkOff(checkedWeather);
                checkedWeather = weather;
                document.getElementById("weather").value = checkedWeather;
            }
        
            function checkOn(weather){
                document.getElementById(weather).style.borderColor="red";
            }
        
            function checkOff(weather){
                document.getElementById(weather).style.borderColor="transparent";
            }
        
        </script>
        
        </body>
        </html>
        
        `
    }
    ,
    MYGROUP:function(title,groupName,body,groupId){
        return `
        <!DOCTYPE html>
        <html lang="kr">
        <head>
            <title>${title}</title>
            <meta charset="utf-8">
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

        

    </style>
</head>
<body>
    <header>
        <a href="/" id="logo">???? Shary</a>

        <nav id="main_nav">
            <a href="/new">NEW</a>
            <a href="/group">??? ??????</a>
            <a href="/community">????????????</a>
            <a href="/create_group">????????????</a>
        </nav>

        <nav id="sub_nav">
            <a href="/logout">????????????</a>
            <a href="/mypage">???????????????</a>
        </nav>
    </header>
    <body>
        <div id="wrapper">
            <div id="title_div">
                <div class="title_div_left">
                    <h2>${groupName}</h2>
                </div>
            <div class="title_div_right">
            </div>
        </div>
    ${body}

    <div id="bottom_div">
        <button onclick="location.href='/create_diary/${groupId}';">
                +
        </button>
    </div>
</div>
    </body>
</body>
</html>`;
}
}