import Axios from "axios";

async function RegisterAPI(formData) {
    const response = await Axios.post("/register", formData);
    if (response.data.auth) {
        return {
            status: true,
            msg: "Register Successfully",
            id: response.data.id,
        };
    } else {
        return {
            //revise to change to dynamic
            status: false,
            msg:
                response.data.err.code === 11000
                    ? "A user with the given email is already registered"
                    : response.data.err.message,
        };
    }
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
            return { status: false, msg: response.data.msg };
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
        return {
            status: response.data.auth,
            username: response.data.user,
            id: response.data.id,
        };
    }
    return { status: response.data.auth, username: "" };
}

async function fetchUserData(id, thumbnailDim) {
    const response = await Axios.get(`/${id}/${thumbnailDim}`);
    if (response) {
        const { username, _id, avatar, thumbnail } = response.data.user;
        // console.log(response.data.user);
        return {
            status: true,
            username: username,
            id: _id,
            avatar: avatar,
            thumbnail: thumbnail,
        };
    }
}
export { LogoutAPI, LoginAPI, isLoggedIn, fetchUserData, RegisterAPI };
