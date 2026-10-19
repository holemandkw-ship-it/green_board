function renderPosts (posts){
    const list = document.querySelector("#post-list");
    if(posts.length === 0){
        list.textContent = "아직 게시글이 없습니다.";
    }

    for(const post of posts) {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = `detail.html?id=${post.id}`;
        link.textContent = post.title;

        const meta = document.createElement("div");
        meta.className = "meta";
        meta.textContent = `${post.authorNickname} | ${post.createdDatetime}`;

        item.append(link, meta);
        list.append(item);
    }
}

// 글 상세 페이지 만드는 함수
function renderPost(post){
    document.querySelector("#post-title").textContent = post.title;
    document.querySelector("#post-meta").textContent = `${post.author} | ${post.createdDatetime}`;
    document.querySelector("#post-content").textContent = post.content;
}


function renderComments(comments) {
    const list = document.querySelector("#comment-list");

    // 기존 이미 그려진(렌더링된) 댓글 요소들 모두 제거
    list.replaceChildren(); 

    if(comments.length === 0){
        list.textContent = "등록된 댓글이 없습니다";
    }

    for (const comment of comments) {
        const item = document.createElement("li");
        
        const author = document.createElement("strong");
        author.textContent = comment.author;

        const content = document.createElement("p");
        content.textContent = comment.content;

        item.append(author, content);
        list.append(item);
    }
}