import { useLoaderData } from "react-router-dom";
import "../../assets/UserInfo.css";

export const UserInfo = () => {
    const info = useLoaderData();

    if (info) {
        const { username, id, thumbnail } = info;
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
};
