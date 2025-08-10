document.addEventListener("DOMContentLoaded", () => {
    const loginTab = document.getElementById("login-tab");
    const registerTab = document.getElementById("register-tab");
    const tabContent = document.getElementById("auth-tab-content");

    function loadForm(file) {
        fetch(file)
            .then(res => res.text())
            .then(html => {
                tabContent.innerHTML = html;
            });
    }

    // Load login form by default
    loadForm("login.html");

    loginTab.addEventListener("click", () => loadForm("login.html"));
    registerTab.addEventListener("click", () => loadForm("register.html"));
});
