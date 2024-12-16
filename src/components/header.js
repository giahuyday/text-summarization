import logo from '../logo.svg'

export function Header() {
    return (
        <>
            <div className="home">
                <header className="header">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <nav className="menu">
                        <ul>
                            <li>
                                <a href="">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    Summarize File
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    Summarize Text
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className="user">Huy Nguyen</div>
                </header>
            </div>
        </>
    );
};