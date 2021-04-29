import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./_loginScreen.scss";
import { IoLogoYoutube } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/auth.action";
import { useHistory } from "react-router";

LoginScreen.propTypes = {};

function LoginScreen(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const accessToken = useSelector((state) => state.auth.accessToken);

    const handleLogin = () => {
        dispatch(login());
    };

    useEffect(() => {
        if (accessToken) {
            history.push("/");
        }
    }, [accessToken, history]);

    return (
        <div className="login">
            <div className="login__container">
                <IoLogoYoutube className="login__logo" />
                <button onClick={handleLogin}>Login With Google</button>
                <p>This Project is made using YOUTUBE DATA API</p>
            </div>
        </div>
    );
}

export default LoginScreen;
