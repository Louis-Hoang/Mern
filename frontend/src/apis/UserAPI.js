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

        if (response.data === "Successfully Authenticated") {
            return true; //use JWT when done
        } else {
            // console.log("Not correct");
            return false;
        }
    } catch (e) {
        console.log("Error");
        console.log(e);
        return false;
    }
}
export { LogoutAPI, LoginAPI };
