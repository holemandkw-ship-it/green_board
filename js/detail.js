
const params = new URLSearchParams(location.search);
const postId = Number(params.get("id"));

// 게시글 찾기
let post = posts.find(item => item.id === postId);;

if (Number.isSafeInteger(postId) && postId > 0) {
    renderPost(post);

    //지금 postId에 해당하는 댓글만 출력하도록 필터링
    let filteredComments = comments.filter(comment =>comment.boardId === postId);
    renderComments(filteredComments);
} 

if(post === undefined) {
    document.querySelector("#post-title").textContent = "게시글 조회 실패";
    document.querySelector("#post-content").textContent = "";
    document.querySelector("#comments-section").hidden = true;
    
}
