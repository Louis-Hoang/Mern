// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { isLoggedIn } from "../../apis/UserAPI";
import "../../assets/StyleWrapper.css";

export const StyleWrapper = (props) => {
    return <div className="globalStyle">{props.children}</div>;
};
