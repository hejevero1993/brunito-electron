import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Profile({ setTitle }) {
    useEffect(() => {
        setTitle("Perfil");
    }, [setTitle]);

    return <h1>Profile</h1>;
}
