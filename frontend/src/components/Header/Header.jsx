import { Home, PlusSquare, Heart, User } from 'lucide-react';
import './Header.css';

const Header = ({ onCreateClick }) => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <header className="header">
            <div className="header-content">
                <div className="header-brand" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
                    <h1 className="header-title">MiniSocial</h1>
                </div>

                <div className="header-actions">
                    <button className="header-icon-btn" title="Home" onClick={scrollToTop}>
                        <Home strokeWidth={1.5} />
                    </button>
                    <button className="header-icon-btn" title="Create" onClick={onCreateClick}>
                        <PlusSquare strokeWidth={1.5} />
                    </button>
                    <button className="header-icon-btn" title="Activity" onClick={() => { }}>
                        <Heart strokeWidth={1.5} />
                    </button>
                    <button className="header-icon-btn" title="Profile" onClick={() => { }}>
                        <User strokeWidth={1.5} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
