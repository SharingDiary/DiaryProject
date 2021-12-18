module.exports = {
    HTML: function(nav_style, community_style, script, list){
        return `<!DOCTYPE html>
        <html lang="kr">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <meta name="description" content="Community.html">
            <meta name="author" content="데베플 3팀">

            ${script}
            <title>Community</title>
        
            <style>
                ${nav_style}
                ${community_style}
            </style>
        </head>
        <body>
            <header>
                <h1><a href="Base.html" style="text-decoration:none; color:black;">📝 Daily Share</a></h1>
        
                <nav id="main_nav">
                    <a href="/new">NEW</a>
                    <a href="/group">내 그룹</a>
                    <a class="community" href="Community.html">커뮤니티</a>
                    <a href="/create_group">그룹생성</a>
                </nav>
        
                <nav id="sub_nav">
                    <a href="/signup">회원가입</a>
                    <a href="/signin">로그인</a>
                </nav>
            </header>
            <div id="wrapper">
                <div class="group-container">
                    ${list}
                </div>
            </div>
        </body>
        </html>        
        `
    },
    custom_script: function(alert_script){
        return `
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        ${alert_script}
        <script>
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
            // $(document).on("click", ".reply-profile", function (event) {
            //     let index = event.target.getAttribute('class');
            //     let indexArr = index.split(" ");
            //     console.log(indexArr[2]);
            //     x = event.pageX;
            //     y = event.pageY; 
            //     //    alert('x좌표:' +x + ', y좌표:' + y);
            //     $(".group-reply-popup").css({"top":y, "left":x, "z-index": 100}).show();
            // })
    
            // .group-invitation-exit-btn
            // $(document).on("click", ".group-invitation-exit-btn", function (event) {
            //     x = event.pageX;
            //     y = event.pageY; 
            //     //    alert('x좌표:' +x + ', y좌표:' + y);
            //     $(".group-reply-popup").css({"top":y, "left":x, "z-index": 100}).hide();
            //     })
        </script>
        `
    },
    writing: function(_id, title, now_people, people, master_name, desc, reply){
        let html = `
        <div class="group-bar">
            <div class="group-desc">
                <div class="group-main-desc spread-more">
                    <p class="group-title">${title}</p>
                    <div class="group-people">
                        <p class="group-how-many">그룹 인원: </p>
                        <p class="group-now-people">${now_people}</p>
                        <p> / </p>
                        <p class="group-number-of-people">${people}</p>
                    </div>
                </div>
                <div class="group-more-desc">
                    <div class="group-master-profile">
                        <div class="group-profile">
                            <div class="profile-photo"></div>
                            <div class="profile-nickname"><p>${master_name}</p></div>
                        </div>
                    </div>
                    <div class="group-writing-wrap">
                        <p class="group-writing">${desc}</p>
                    </div>
                    <div class="group-reply-container">
                        <div class="group-reply-writing">
                            <form action="/reply_process" method="post">
                                <input type="hidden" name="post_id" value="${_id}">
                                <input type="text" name="reply" class="reply-content">
                                <input type="submit" class="reply-submit">
                            </form>
                        </div>
                        ${reply}
                    </div>
                </div>
            </div>
        </div>`
        return html;
    },
    reply: function(writer, content, reply_id, post_id, writer_id) {
        let html = `
            <div class="group-reply">
                <div class="group-reply-profile">
                    <div class="group-profile">
                        <div class="profile-photo reply-profile ${reply_id}"></div>
                        <div class="profile-name-reply">
                            <div class="profile-nickname reply-profile ${reply_id}">${writer}</div>
                            <div class="group-reply-wrap">
                                <p class="group-reply-inside">${content}</p>
                            </div>
                        </div>
                    </div>
                    <div class="reply-submit-btn">
                        <form action="/reply_invite_process" method="post" onsubmit="return confirm('초대하시겠습니까?');">
                            <input type="hidden" name="reply_id" value="${reply_id}">
                            <input type="hidden" name="post_id" value="${post_id}">
                            <input type="hidden" name="writer_id" value="${writer_id}">
                            <input type="submit" class="group-invitation-inbtn" value="초대">
                        </form>
                    </div>
                </div>
            </div>`;
        return html;
    }
}