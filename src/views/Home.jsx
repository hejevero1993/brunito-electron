import { useEffect, useState } from "react";

export default function Home({ user }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        const preloader = document.querySelector(".preloader");
        preloader.classList.remove("d-none");
    }

    return <h2>Página de inicio {user?.email}</h2>;
}
