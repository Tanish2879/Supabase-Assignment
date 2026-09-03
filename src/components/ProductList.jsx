import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";

function ProductList({ products, cartItems, onAddToCart }) {
  if (products.length === 0) {
    return (
      <EmptyState
        message="No products match your search"
        description="Try searching with a different term or clearing your search filters."
        icon="🔍"
      />
    );
  }

  const cartMap = new Map(cartItems.map((item) => [item.id, item.quantity]));

  return (
    <div class="product-grid">
      {products.map((product) => {
        const qty = cartMap.get(product.id) || 0;
        return (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            isInCart={qty > 0}
            cartQuantity={qty}
          />
        );
      })}
    </div>
  );
}


export default ProductList;