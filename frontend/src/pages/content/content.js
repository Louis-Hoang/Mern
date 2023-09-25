import Axios from "axios";
import { useEffect } from "react";
import { useUserState } from "../../contexts/UserContext/UserContext";
// import { useNavigate } from "react-router-dom";
export default function Content() {
    const { userState, setUserState } = useUserState();
    useEffect(() => {
        console.log(userState);
    });
    return (
        <div>
            <h1>Content Page after Login</h1>
        </div>
    );
}
