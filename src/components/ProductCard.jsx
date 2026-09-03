import Button from "./Button";
import Badge from "./Badge";

function ProductCard({
  product,
  onAddToCart,
  isInCart = false,
  cartQuantity = 0,
}) {
  const { name, price, image, category, description } = product;

  return (
    <div class="product-card">
      <div class="product-image-container">
        <img src={image} alt={name} class="product-image" loading="lazy" />
        <div class="card-top-badges">
          <Badge text={category} color="neutral" />
          {isInCart && (
            <Badge text={`In Cart (${cartQuantity})`} color="success" />
          )}
        </div>
      </div>

      <div class="product-info">
        <h3 class="product-title">{name}</h3>
        {description && <p class="product-desc">{description}</p>}

        <div class="product-bottom">
          <div class="product-price">
            <span class="currency">₹</span>
            <span class="amount">{price.toLocaleString()}</span>
          </div>

          <Button
            variant={isInCart ? "secondary" : "primary"}
            onClick={() => onAddToCart(product)}
            label={isInCart ? "+ Add More" : "Add to Cart"}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
