import { useParams } from "react-router-dom";

export default function UserInfo() {
    let { username = "Anonymous" } = useParams();
    return (
        <div>
            <h1>Welcome {username}</h1>
        </div>
    );
}
