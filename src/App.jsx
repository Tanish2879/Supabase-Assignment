import { useEffect, useState } from "react";
import { products as initialProducts } from "./data/products";
import { supabase } from "./lib/supabase";
import Navbar from "./components/Navbar";
import ProductDescription from "./components/ProductDescription";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Auth from "./components/Auth";
import "./styles/main.scss";

export default function App() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [loadingCart, setLoadingCart] = useState(false);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setUser(session?.user ?? null));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setUser(session?.user ?? null),
    );
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) loadCart();
    else setCartItems([]);
  }, [user]);

  async function loadCart() {
    setLoadingCart(true);
    const { data, error } = await supabase
      .from("cart_items")
      .select("id, product_id, quantity, products (*)")
      .order("created_at");
    if (!error)
      setCartItems(
        (data || [])
          .filter((x) => x.products)
          .map((x) => ({ ...x.products, cartId: x.id, quantity: x.quantity })),
      );
    setLoadingCart(false);
  }

  async function handleAddToCart(product) {
    const existing = cartItems.find((i) => i.id === product.id);
    if (existing) return changeQuantity(existing.id, existing.quantity + 1);
    const { error } = await supabase
      .from("cart_items")
      .insert({ user_id: user.id, product_id: product.id, quantity: 1 });
    if (!error) loadCart();
    else alert(error.message);
  }

  async function changeQuantity(productId, quantity) {
    const item = cartItems.find((i) => i.id === productId);
    if (!item) return;
    if (quantity <= 0) return handleRemove(productId);
    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: Math.min(quantity, 10) })
      .eq("id", item.cartId);
    if (!error) loadCart();
    else alert(error.message);
  }
  const handleIncrease = (id) =>
    changeQuantity(id, (cartItems.find((i) => i.id === id)?.quantity || 0) + 1);
  const handleDecrease = (id) =>
    changeQuantity(id, (cartItems.find((i) => i.id === id)?.quantity || 0) - 1);
  async function handleRemove(id) {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      await supabase.from("cart_items").delete().eq("id", item.cartId);
      loadCart();
    }
  }
  async function handleClearCart() {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id);
    if (error) return alert(error.message);
    await loadCart();
  }

  async function handleCheckout(total) {
    if (!cartItems.length) return;

    const confirmed = window.confirm(
      `Confirm your order for ₹${total.toLocaleString()}?`,
    );
    if (!confirmed) return;

    // Completing checkout clears only the currently logged-in customer's cart.
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      alert(`Checkout failed: ${error.message}`);
      return;
    }

    setCartItems([]);
    alert(
      `Order placed successfully! Total: ₹${total.toLocaleString()}. Your cart is now empty.`,
    );
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (!user) return <Auth />;
  const filteredcProducts = initialProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase().trim()),
  );
  const displayedProducts = [...initialProducts].sort((a, b) =>
    sortOrder === "low-to-high"
      ? a.price - b.price
      : sortOrder === "high-to-low"
        ? b.price - a.price
        : 0,
  );
  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <div className="app-container">
      <Navbar cartCount={totalCartCount} user={user} onLogout={handleLogout} />
      <main className="main-content">
        <ProductDescription />
        <section className="catalog-section" id="products">
          <div className="catalog-header">
            <div className="catalog-title-wrapper">
              <h2 className="catalog-title">All Products</h2>
              <p className="catalog-subtitle">
                Explore our handpicked collection of premium gear and
                accessories.
              </p>
            </div>
            <SearchBar
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sortOrder={sortOrder}
              onSortChange={(e) => setSortOrder(e.target.value)}
            />
          </div>
          <ProductList
            products={displayedProducts}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
          />
        </section>
        {loadingCart ? (
          <p className="cart-loading">Loading your personal cart...</p>
        ) : (
          <Cart
            cartItems={cartItems}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
            onClearCart={handleClearCart}
            onCheckout={handleCheckout}
          />
        )}
      </main>
      <footer className="app-footer">
        <div className="footer-content">
          <p>
            © {new Date().getFullYear()} AuraStore. Supabase Product Cart
            Assignment.
          </p>
          <p className="footer-credits">
            React + Supabase Auth + PostgreSQL + RLS
          </p>
        </div>
      </footer>
    </div>
  );
}
