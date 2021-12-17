module.exports = {
    RECRUITMENT_POST: function(_id, title, people, master_name, desc, reply){
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
    RECRUITMENT_POST_WITH_DELETE_BUTTON: function(_id, title, people, master_name, desc, reply){
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
                        <form action="/delete_recruitment_post" method="post" onsubmit="return confirm('그룹원 모집글을 삭제하시겠습니까?');">
                            <input type="hidden" name="post_id" value="${_id}">
                            <input type="submit" value="삭제" class="recruitment-post-delete-button" >
                        </form>
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