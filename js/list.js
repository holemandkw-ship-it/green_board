// 로그인하지 않았다면 로그인 페이지로 이동
if (requireLogin()) {
    loadPosts();
}

async function loadPosts() {
    try {
        const response = await fetch(
            "http://127.0.0.1:8080/api/board?page=0&size=10",
            {headers: getAuthHeaders()}
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || "목록 조회 실패");
        }

        renderPosts(result.data.content);

        document.querySelector("#list-message").textContent =
            `전체 ${result.data.totalElements}개`;

    } catch (error) {
        document.querySelector("#list-message").textContent = error.message;
    }
}