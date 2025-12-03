import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <span className="logo-icon">🤖</span>
          <h1 className="logo-text">ContentAI Studio</h1>
        </div>
        <p className="tagline">Transform your content with AI-powered operations</p>
      </div>
    </header>
  );
};

export default Header;
