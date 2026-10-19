// 현재 로그인 여부 조회
function isLoggedIn() {
    // 로컬 스토리지에 액세스 토큰이 존재하는 경우 true 반환
    // 그렇지 않은 경우 false 반환
    return Boolean(localStorage.getItem("accessToken"));
}

// 로그인 여부 체크 및 로그인 페이지로 리다이렉트 기능
function requireLogin() {
    if (isLoggedIn()) {
        return true;
    }
    location.replace("login.html");
    return false;
}

document.querySelector(".logout-button").addEventListener("click", logout)

async function logout() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/user/logout", {
            method: "POST", 
            headers: {...getAuthHeaders(), "Content-Type": "application/json"}
        });
        
        // HTTP 상태코드가 200이 아니거나, API 성공 여부가 실패인 경우 예외처리
        if (!response.ok) {
            throw new Error("로그아웃에 실패했습니다.");
        }

        // 로컬스토리지 내 토큰 제거
        localStorage.removeItem("accessToken");
        // 로그인 페이지로 이동
        location.replace("login.html");
    } catch(error) {
        // #nav-message.textContent -> alert로 대체
        alert(error.message);
    }
}

// Authorization Header 생성
function getAuthHeaders() {
    const accessToken = localStorage.getItem("accessToken");
    return {
        Authorization: `Bearer ${accessToken}`
    };
}

// 로그인 상태에 따른 navigation UI 설정
function setupNavigation() {
    // 로그인 상태인 경우 -> 로그인 버튼 숨김
    document.querySelector(".login-link").hidden = isLoggedIn();

    // 로그아웃 상태인 경우 -> 로그아웃 버튼 숨김
    document.querySelector(".logout-button").hidden = !isLoggedIn();

    // 로그아웃 상태인 경우 -> 글쓰기 버튼 숨김
    document.querySelector(".write-link").hidden = !isLoggedIn();

    // 로그아웃 상태인 경우 -> 우측 nav의 게시판 버튼 숨김
    document.querySelector('nav > a[href="index.html"]').hidden = !isLoggedIn();
}

setupNavigation();