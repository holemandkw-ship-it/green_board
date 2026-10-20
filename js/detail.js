const params = new URLSearchParams(location.search);
const postId = Number(params.get("id"));

// posts 배열에서 사용자가 누른 게시글 찾기
async function loadPost() {
    const message = document.querySelector("#comment-message");
    message.textContent = "게시글을 불러오는중...";
    const reloadButton = document.querySelector("#retry-post")
    try {
       const post = await apiRequest(`/board/${postId}`);
        renderPost(post);
        message.textContent = "";
        reloadButton.hidden = true;
        return true;
    }catch (error) {
        document.querySelector("#post-title").textContent = "게시글 조회 실패";
        document.querySelector("#post-content").textContent = "";
        message.textContent = error.message;
        reloadButton.hidden = false;
        return false;
       
    }
}

async function loadComments() {
    try{
        const comments = await apiRequest(`/board/${postId}/comment`);
        renderComments(comments)
    }catch (error) {
        document.querySelector("#comment-message").textContent = error.message;
    }
}


    
    if(requireLogin()){
        if(Number.isSafeInteger(postId) && postId > 0){
            //비동기 작업을 위한 방법
            //1.async /await
            //2.
            //게시글 상세 정보 조회
            loadPost().then(function (success) {
        if (success) {
        
            loadComments();
            }
    });
      
        //let filteredComments = comments.filter(comment => comment.boardId === postId);
        //renderComments(filteredComments);
    }else {
        document.querySelector("#post-message").textContent = "잘못된 게시글 번호입니다.";
       
    }
}



 //댓글 작성 폼 submit 시 댓글 추가
document.querySelector("#comment-form").addEventListener("submit",async function (event) {
    event.preventDefault();
    const input = document.querySelector("#comment-content");
    const content = input.value.trim();
    const message = document.querySelector("#comment-message")
    
    //현재 페이지에 해당하는 게시글이 없거나
    // 댓글 내용이 비어있거나 255자를 넘는 경우 예외 처리
    if (!content || content.length > 255) {
        message.textContent = "댓글은 1 ~ 255자로 입력하세요.";
        return;
    }

    try{
        await apiRequest(`/board/${postId}/comment`,"Post", {content});
        input.value = "";
        await loadComments();
    }catch(error){
    message.textContent = error.message;
    }
    
})

document.querySelector("#retry-post").addEventListener("click", function () {
    loadPost();
});