import { useLoaderData } from "react-router-dom";
import "../../assets/UserInfo.css";

export default function UserInfo() {
    const info = useLoaderData();

    if (info) {
        const { username, id, thumbnail } = info;
        console.log(info);
        return (
            <>
                <div>
                    <h1>Welcome {username || ""}</h1>
                    <h1>Your id is {id || ""}</h1>
                </div>
                <img className="image" src={thumbnail} alt="" />
            </>
        );
    }
}
