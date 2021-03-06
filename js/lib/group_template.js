module.exports={
    GROUP_LIST:function(userId, groups, count, requestUrl) {
        let list = ``;
        let control = ``;
        let recruitmentState = '';
        for(let i = 0; i < groups.length; i++) {
            let now_people = 0;
            for(let j = 0; j < count.length; j++) {
                if(groups[i].group_id === count[j].group_id) {
                    now_people++;
                }
            }
            if(groups[i].recruitment == 1) {
                recruitmentState = 'π';
            } else {
                recruitmentState = 'π';
            }
            let groupId = groups[i].group_id;
            if(groups[i].is_leader == 1 && groups[i].member_id == userId) { //κ·Έλ£Ή μμ±ν μ¬λλ§ μμ , μ­μ  λ²νΌ λ³΄μ
                control = `
                <a href="/update_group/${groupId}" class="button">ποΈ</a>
                <form action="/delete_group" method="post" onsubmit="return confirm('μ λ§λ‘ μ­μ νμκ² μ΅λκΉ?');">
                    <input type="hidden" name="groupId" value="${groupId}">
                    <input type="submit" value="ποΈ">
                </form>
                `;
            }
            list += `
            <div class="group_div" >
                <div onclick="moveToGroup('${requestUrl}/myGroup/${groups[i].group_id}')">
                    <h3>${groups[i].name}</h3>
                    <h4>${now_people}/${groups[i].headcount}</h4>
                    <h4>${recruitmentState}</h4>
                </div>
            <h5>${control}</h5>
            </div>`;
        }
        return list;
    }
}