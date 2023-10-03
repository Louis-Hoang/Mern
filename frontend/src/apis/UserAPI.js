import Axios from "axios";

async function RegisterAPI(formData) {
    const response = await Axios.post("/register", formData);
    if (response.data.auth) {
        return { status: true, msg: "Register Successfully" };
    }
    console.log(response);
    return response;
}

async function LogoutAPI() {
    const response = await Axios.post("/logout");
    if (response.data.auth) {
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
            return {
                status: true,
                username: response.data.username,
                id: response.data.id,
            };
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
        // console.log(response.data);
        return {
            status: response.data.auth,
            username: response.data.user,
            id: response.data.id,
        };
    }
    return { status: response.data.auth, username: "" };
}

async function fetchUserData(id) {
    const response = await Axios.get(`/user/${id}`);
    if (response) {
        console.log(response.data);
        return {
            status: true,
            username: response.data.user.username,
            id: response.data.user._id,
        };
    }
}
export { LogoutAPI, LoginAPI, isLoggedIn, fetchUserData, RegisterAPI };
