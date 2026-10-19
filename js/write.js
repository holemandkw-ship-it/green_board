// 게시글 작성 화면 JS


// 로그인 안 되어 있을 시 로그인 페이지로 리다이렉트
requireLogin();

const form = document.querySelector("#post-form")

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const title = form.elements.title.value.trim();
    const content = form.elements.content.value.trim();

    if (title.length < 10 || title.length > 50 || content.length < 10) {
        document.querySelector("#form-message").textContent =
            "제목은 10~50자, 본문은 10자 이상 입력하세요.";
        return;
    }

    // 신규 게시글 추가
    posts.push({
        id: getPostNextId(),
        title: title,
        content: content,
        author: "실습 사용자",
        createdDatetime: new Date().toString().slice(0, 10),
    });
    saveLocal();

    // index.html 경로로 이동
    location.href = "index.html";
});