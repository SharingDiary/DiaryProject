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
    community: `
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
    #main_nav .community {color: black;}
    .group-container {width:100%; height: 100%;}
    .group-bar { margin: 10px;}
    .group-desc { width: auto; height: auto; background: #FFEC86; border-radius: 5px; align-content: center;}
    .group-title { display: inline-flex; float: left; font-weight: 700; }
    .group-people {float: right;}
    .group-people p {display: inline-flex;}
    .group-how-many { display: inline-flex;}
    .group-number-of-people { display: inline-flex;}
    .group-main-desc {width: auto; height: 50px;  padding: 0 20px; cursor: pointer;}
    .group-more-desc {width: auto; height: auto; padding: 20px; background: white; display: none;}
    .group-writing-wrap {width: 80%; text-align: left; margin: 0 auto;}
    .group-writing {margin: 0;}
    .group-master-profile {height: 50px; }
    .group-profile { height: auto; float: left; display: inline-flex;}
    .profile-photo { width:45px; height: 45px; background: gray; border-radius: 25px;} 
    .profile-nickname {margin: auto 0 auto 0; text-align: left;}
    .profile-nickname p {margin: auto 0 auto 10px;}
    .group-reply-container {height: auto; margin-top: 10px;}
    .group-reply {height: auto; background: lightyellow; padding: 10px 20px; margin-top:20px;}
    .group-reply-inside {margin: 0;}
    .group-reply-profile { height: 50px; }
    .group-reply-wrap { margin-top: 2px;}
    .reply-profile{ cursor: pointer;}
    .profile-name-reply {margin-left: 10px;}
    .reply-content { padding:10px; font-size: 14px; border : none; border-radius: 5px; width: 90%; background: lightyellow;}
    .reply-submit {padding:10px; font-size: 14px; background-color: #FFEE97; color: black; border: none; cursor: pointer;}
    .reply-submit-btn {width: 10%; height: 100%; float: right; text-align: right; margin: auto 0 auto 0;}
    .group-invitation-inbtn {height: 100%; background: #FDD713; padding: 15px; border: none; width: 100%; cursor: pointer; }
    `
}