import "./Header.css";

function Header() {
  return (
    
    <header className="header-container">
    <img
    className="header-bg-image"
    src="/src/assets/images/Paj_1 (pexels-polina-tankilevitch-5419100).jpg"
    alt="Pajbakgrund"
    />

      <div className="header-logo-container">
        
      <h1 class="header-logo">Pajparadiset</h1>  
      </div>

      <nav className="header-nav">
        <button className="nav-btn">Knapp 1</button>
        <button className="nav-btn">Knapp 2</button>
        <button className="nav-btn">Knapp 3</button>
      </nav>
    </header>
  );
}

export default Header;
