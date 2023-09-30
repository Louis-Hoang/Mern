import Axios from "axios";

async function LogoutAPI() {
    const response = await Axios.post("/logout");
    if (response.data === "Logout success") {
        return response;
    }
    console.log(response);
    return response;
}

async function LoginAPI(credential) {
    const { username, password, email } = credential;
    try {
        const response = await Axios.post("/login", {
            username: username,
            password: password,
            email: email,
        });

        if (response.data.auth) {
            return { status: true, username: username };
        } else {
            console.log(response.data.msg);
            return { status: false };
        }
    } catch (e) {
        console.log("Error");
        console.log(e);
        return false;
    }
}

async function isLoggedIn() {
    const response = await Axios.post("/auth");
    if (response.data.auth) {
        console.log(response.data);
        return { status: response.data.auth, username: response.data.user };
    }
    return { status: response.data.auth, username: "" };
}
export { LogoutAPI, LoginAPI, isLoggedIn };
