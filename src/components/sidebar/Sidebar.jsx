import React from "react";
import PropTypes from "prop-types";
import "./_sidebar.scss";
import {
    MdSubscriptions,
    MdExitToApp,
    MdThumbUp,
    MdHistory,
    MdLibraryBooks,
    MdHome,
    MdSentimentDissatisfied,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { log_out } from "../../redux/actions/auth.action";
import { Link } from "react-router-dom";

Sidebar.propTypes = {};

function Sidebar({ sidebar, onToggleSidebar }) {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(log_out());
    };

    return (
        <nav
            className={sidebar ? "sidebar open" : "sidebar"}
            onClick={() => onToggleSidebar(false)}
        >
            <Link to="/" exact>
                <li>
                    <MdHome size={23} />
                    <span>Home</span>
                </li>
            </Link>

            <Link to="/feed/subscriptions">
                <li>
                    <MdSubscriptions size={23} />
                    <span>Subscriptions</span>
                </li>
            </Link>

            <li>
                <MdThumbUp size={23} />
                <span>Liked Video</span>
            </li>

            <li>
                <MdHistory size={23} />
                <span>History</span>
            </li>

            <li>
                <MdLibraryBooks size={23} />
                <span>Library</span>
            </li>

            <li>
                <MdSentimentDissatisfied size={23} />
                <span>I don't know</span>
            </li>

            <hr />

            <li onClick={handleLogout}>
                <MdExitToApp size={23} />
                <span>Log Out</span>
            </li>

            <hr />
        </nav>
    );
}

export default Sidebar;
