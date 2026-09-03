function ProductDescription() {
  return (
    <section class="product-description" id="description">
      <div class="description-container">
        <div class="description-content">
          <span class="section-subtitle">Premium Lifestyle & Tech</span>
          <h1 class="description-title">
            Curated Essentials for the Modern Lifestyle
          </h1>
          <p class="description-text">
            Welcome to SUPER SHOP — your destination for precision-crafted electronics, 
            ergonomic workplace gear, and timeless lifestyle essentials. Each product is 
            handpicked for lasting quality, aesthetic elegance, and reliable daily performance.
          </p>
          <div class="store-perks">
            <div class="perk-item">
              <span class="perk-icon">⚡</span>
              <div>
                <strong>Express Delivery</strong>
                <p>Fast doorstep delivery on all orders</p>
              </div>
            </div>
            <div class="perk-item">
              <span class="perk-icon">🛡️</span>
              <div>
                <strong>1-Year Warranty</strong>
                <p>100% genuine guaranteed products</p>
              </div>
            </div>
            <div class="perk-item">
              <span class="perk-icon">💳</span>
              <div>
                <strong>Secure Checkout</strong>
                <p>Easy, safe & transparent transactions</p>
              </div>
            </div>
          </div>
        </div>

        <div class="description-visual">
          <div class="image-card">
            <img
              src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="AuraStore Showcase"
              class="hero-image"
            />
            <div class="floating-badge">
              <span class="star">★</span> 4.9/5 Customer Rating
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDescription;