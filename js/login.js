async function login(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const button = form.querySelector("button[type=submit]");
    const message = document.querySelector("#login-message");

    if (button.disabled) {
        return;
    }
    button.disabled = true;
    message.textContent = "로그인중..."

    const username = form.elements.username.value.trim();
    const password = form.elements.password.value;

    try {
        const tokens = await apiRequest(
            "/user/login",
            "POST",
            { username, password }
        );

        if (!tokens?.accessToken) {
            throw new Error("액세스 토큰이 없습니다.");
        }

        localStorage.setItem("accessToken", tokens.accessToken);
        location.href = "index.html";

    } catch (error) {
        message.textContent = error.message;
    }finally{
        button.disabled = false;
    }
}

document.querySelector("#login-form").addEventListener("submit", login);