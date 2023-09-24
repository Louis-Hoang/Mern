import Axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Content() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const response = await Axios.post("/logout");
        if (response.data === "Logout success") {
            return navigate("/login");
        }
        console.log(response);
        return response;
    };
    return (
        <div>
            <h1>Content Page after Login</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
