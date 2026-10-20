// Spring Board API 응답 규칙
// {success, message, data}

const API_SERVER = "http://127.0.0.1:8080/api";

// API 요청 보내는 코드 분리
async function apiRequest(path, method = "GET", body = null) {
    const headers = {};

    // 로그인 외의 모든 요청은 인증 헤더 설정
    if (path !== "/user/login") {
        Object.assign(headers, getAuthHeaders());
    }

    // Body가 있는 경우 Content-Type 설정
    if (body !== null) {
        headers["Content-Type"] = "application/json";
    }

    let response;

    try {
        response = await fetch(`${API_SERVER}${path}`, {
            method,
            headers,
            body: body === null ? undefined : JSON.stringify(body)
        });
    } catch {
        throw new Error("서버에 연결할 수 없습니다.");
    }

    const result = await response.json().catch((err)=> {
        console.log(err);
        return null;
    });

    // 요청 실패 확인
    if (!response.ok || !result?.success) {

        // Access Token 만료 등으로 401 반환 시
        if (response.status === 401 && path !== "/user/login") {
            localStorage.removeItem("accessToken");
            requireLogin();
        }

        throw new Error(
            result?.message ||
            `요청 실패 (${response.status})`
        );
    }

    return result.data;
}