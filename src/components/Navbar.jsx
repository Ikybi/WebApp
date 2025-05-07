import './Navbar.css'

function Navbar(){
    return (
        <>
        <nav className="navbar">
    <div className="navbar__left">
      <img src="./Sin-uiiug-1200x717-1.png" alt="logo" class="logo" />
    </div>

    <ul className="navbar__center">
      <li><a href="#">Shop</a></li>
      <li><a href="#">About Us</a></li>
    </ul>

    <div className="navbar__right">
      <a href="#" class="login">login</a>
      <a href="#" class="favorites">Preferiti</a>
    </div>
  </nav>
        </>
    )
}

export default Navbar