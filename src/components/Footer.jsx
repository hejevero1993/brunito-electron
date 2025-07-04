export default function Footer() {
    return (
        <footer className="main-footer">
            <strong>
                Copyright &copy; 2025
                <a className="ml-1" target="_blank" href="https://hejevero.site">
                    Hejevero
                </a>
                .
            </strong>
            Todos los derechos reservados.
            <div className="float-right d-none d-sm-inline-block">
                <div className="w-100 d-flex">
                    <b className="mr-2">Versión</b> <div id="version">0.0.0</div>
                </div>
            </div>
        </footer>
    );
}
