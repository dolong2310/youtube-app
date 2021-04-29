import React, { useState } from "react";
import PropTypes from "prop-types";
import "./_header.scss";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import { IoLogoYoutube } from "react-icons/io";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

Header.propTypes = { onToggleSidebar: PropTypes.func };

function Header({ onToggleSidebar = null }) {
    const history = useHistory();
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/search/${input}`);
    };

    //TODO if not logged in then assign false and vice versa
    const { photoURL } = useSelector((state) => state.auth?.user) || "";

    return (
        <div className="header">
            <FaBars
                className="header__menu"
                size={26}
                onClick={() => onToggleSidebar()}
            />

            <IoLogoYoutube className="header__logo" />

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit">
                    <AiOutlineSearch size={22} />
                </button>
            </form>

            <div className="header__icons">
                <MdNotifications size={28} />
                <MdApps size={28} />
                <img src={photoURL} alt="avatar" />
            </div>
        </div>
    );
}

export default Header;
