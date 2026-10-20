// 게시글 작성 화면 JS


// 로그인 안 되어 있을 시 로그인 페이지로 리다이렉트
requireLogin();

const form = document.querySelector("#post-form")

form.addEventListener("submit", savePost);
    
async function savePost(event) {
    event.preventDefault()
    const title = form.elements.title.value.trim();
    const content = form.elements.content.value.trim();

    //# form-message 요소를 필요할 때 마다 생성해 사용하징낳고,
    //미리 변수에 저장해 재사용하는 방식으로 구현
    const formMessage = document.querySelector("#form-message")

    if (title.length < 10 || title.length > 50 || content.length < 10) {
        formMessage.textContent = "제목은 10~50자, 본문은 10자 이상 입력하세요.";
        return;
    }

    try {
        const response = await fetch(
            "http://127.0.0.1:8080/api/board",
            {
                method: "POST",
                headers:{...getAuthHeaders(), "Content-Type": "application/json"},
                body: JSON.stringify({title: title, content: content})
            }
        );
        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || "게시글 등록 실패") 
        }

        // index.html 경로로 이동
        location.href = "index.html";
    }catch (error){
        formMessage.textContent = error.message;

    }

 
}