const params = new URLSearchParams(location.search);
const postId = Number(params.get("id"));

// posts 배열에서 사용자가 누른 게시글 찾기
async function loadPost() {
    try {
       const response = await fetch(`http://127.0.0.1:8080/api/board/${postId}`,
        { headers: getAuthHeaders()}
       );
       const result = await response.json();

       if (!response.ok || !result.success) {
        throw new Error(result.message || "게시글 조회 실패")
       }

       renderPost(result.data);
       document.querySelector("#post-message").textContent = "";
    }catch (error) {
        document.querySelector("#post-title").textContent = "게시글 조회 실패";
        document.querySelector("#post-content").textContent = "";
        document.querySelector("#post-message").textContent = error.message;
       
    }
}
document.querySelector("#comments-section").hidden = true;
    


if(requireLogin()){
    if(Number.isSafeInteger(postId) && postId > 0){
    loadPost();

    //let filteredComments = comments.filter(comment => comment.boardId === postId);
    //renderComments(filteredComments);
}else {
    document.querySelector("#post-message").textContent = "잘못된 게시글 번호입니다.";
    document.querySelector("#comments-section").hidden = true;
}
}



// 댓글 작성 폼 submit 시 댓글 추가
//document.querySelector("#comment-form").addEventListener("submit", function (event) {
   // event.preventDefault();
   // const content = document.querySelector("#comment-content").value.trim();

    // 현재 페이지에 해당하는 게시글이 없거나
    // 댓글 내용이 비어있거나 255자를 넘는 경우 예외 처리
   // if (!post || !content || content.length > 255) {
    //    document.querySelector("#comment-message").textContent = "댓글은 1 ~ 255자로 입력하세요.";
    //    return;
   // }

  //  comments.push({
  //      id: getCommentNextId(),
   //     boardId: postId,
   //     content: content,
  //      author: "실습 사용자",
 //   });
 //   saveLocal();

  //  document.querySelector("#comment-content").value = "";
   // renderComments(comments.filter(comment => comment.boardId === postId));
//})