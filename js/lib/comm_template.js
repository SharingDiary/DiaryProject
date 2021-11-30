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
                <div class="search-group">
                    <p>그룹 검색</p>
                </div>
                <div class="group-container">
                    ${list}
                </div>
                <div class="group-reply-popup">
                    <div class="group-reply-popup-wrap">
                        <div class="group-question">
                            <p><span class="group-invitaion-name">redvelvet</span> 님을 그룹으로 초대하시겠습니까?</p>
                        </div>
                        <div class="group-invitation-btn">
                            <p>초대</p>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>        
        `
    },
    custom_script: `
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
    `,
    writing: function(_id, title, people, master_name, desc, reply){
        let html = `
        <div class="group-bar">
            <div class="group-desc">
                <div class="group-main-desc spread-more">
                    <p class="group-title">${title}</p>
                    <div class="group-people">
                        <p class="group-how-many">그룹 인원: </p>
                        <p class="group-number-of-people">${people}</p>
                    </div>
                </div>
                <div class="group-more-desc">
                    <div class="group-master-profile">
                        <div class="group-profile">
                            <div class="profile-photo"></div>
                            <div class="profile-nickname"><p>aespa</p></div>
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
    reply: function(writer, content) {
        let html = `
            <div class="group-reply">
                <div class="group-reply-profile">
                        <div class="group-profile">
                            <div class="profile-photo reply-profile"></div>
                            <div class="profile-name-reply">
                                <div class="profile-nickname reply-profile"><p>${writer}</p></div>
                                <div class="group-reply-wrap">
                                    <p class="group-reply-inside">${content}</p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>`;
        return html;
    }
}