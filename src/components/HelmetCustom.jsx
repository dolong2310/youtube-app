import React from "react";
import { Helmet } from "react-helmet";

function HelmetCustom({
    title = "Youtube react app",
    description = "Project made with youtube api and react js",
}) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
        </Helmet>
    );
}

export default HelmetCustom;
