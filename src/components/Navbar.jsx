import Badge from "./Badge";

function Navbar({ cartCount = 0, user, onLogout }) {
  return <nav className="navbar" id="top"><div className="navbar-container">
    <a href="#top" className="navbar-brand"><span className="brand-icon">✨</span><span className="brand-name">SUPER SHOP</span></a>
    <div className="navbar-links">
      <a href="#description" className="nav-link">Product Description</a>
      <a href="#products" className="nav-link">All Products</a>
      <a href="#cart" className="nav-link cart-link"><span>🛒 Cart</span>{cartCount > 0 && <Badge text={cartCount} color="danger" className="cart-badge-count" />}</a>
      <span className="user-email">{user?.email}</span>
      <button className="logout-btn" onClick={onLogout}>Logout</button>
    </div>
  </div></nav>;
}
export default Navbar;
