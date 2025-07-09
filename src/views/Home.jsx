import { useEffect } from "react";

export default function Home({ auth }) {
    useEffect(() => {
        const preloader = document.querySelector(".preloader");

        const timer = setTimeout(() => {
            if (preloader) {
                preloader.classList.add("d-none");
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return <h2>Página de inicio {auth?.user?.email}</h2>;
}
